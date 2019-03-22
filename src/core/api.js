import LRUCache from 'lru-cache';
import _ from 'lodash';
import { serialize } from 'util/filter';

export const errorHandler = (response) =>
    response.ok ?
        Promise.resolve(response) :
        Promise.reject(Error(`${response.status}: ${response.statusText}`));
export const jsonHandler = (response) => response.json();
export const textHandler = (response) => response.text();

const listHandler = (list) => list.map((entry) => {
    delete entry.original;
    return entry;
});
const countHandler = (count) => parseInt(count) || 0;

const defaultQuery = {
    start: 0,
    limit: 10,
    search: '',
    sortField: 'year',
    sortOrder: 'descending'
};

class API {
    listCache = new LRUCache({
        max: 5000,
        length: (items) => items ? items.length : 1
    });
    countCache = new LRUCache({
        max: 500
    });
    fieldCache = undefined;

    serializeQuery = ({
        start = defaultQuery.start,
        limit = defaultQuery.limit,
        search = defaultQuery.search,
        sortOrder = defaultQuery.sortOrder,
        sortField = defaultQuery.sortField,
        filter = defaultQuery.filter
    } = defaultQuery) =>
        `start=${start}&limit=${limit}&search=${search}&sortField=${sortField}&sortOrder=${sortOrder}&filter=${serialize(filter)}`;

    fetchList = async (query = defaultQuery) => {
        const queryKey = this.serializeQuery(query);
        const data = await fetch(`api/list?${queryKey}`)
            .then(errorHandler).then(jsonHandler).then(listHandler);

        if (data) {
            this.listCache.set(queryKey, data);
        }

        return data;
    };

    fetchCount = async (query = defaultQuery) => {
        const queryKey = this.serializeQuery(
            _.omit(query, ['start', 'limit', 'sortField', 'sortOrder'])
        );
        const count = await fetch(`api/count?${queryKey}`)
            .then(errorHandler).then(textHandler).then(countHandler);

        this.countCache.set(queryKey, count);
        return count;
    };

    loadData = async (query = defaultQuery) => {
        const queryKey = this.serializeQuery(query);

        if (this.listCache.has(queryKey)) {
            return this.listCache.get(queryKey);
        } else {
            return this.fetchList(query);
        }
    };

    loadCount = async (query = defaultQuery) => {
        const queryKey = this.serializeQuery(
            _.omit(query, ['start', 'limit', 'sortField', 'sortOrder'])
        );

        if (this.countCache.has(queryKey)) {
            return this.countCache.get(queryKey);
        } else {
            return this.fetchCount(query);
        }
    };

    exportFilteredCSV = async (query = defaultQuery) => {
        const queryKey = this.serializeQuery(
            _.omit(query, ['start', 'limit', 'sortField', 'sortOrder'])
        );
        return `api/export?${queryKey}`;
    };

    exportAllCSV = async () => {
        return `api/export`;
    };

    loadFields = async () => {
        if (this.fieldCache) {
            return this.fieldCache;
        } else {
            this.fieldCache = await fetch('api/fields')
                .then(errorHandler).then(jsonHandler);
            return this.fieldCache;
        }
    };

}

const instance = new API();

export default instance;
