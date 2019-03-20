import LRUCache from 'lru-cache';
import {serialize} from 'util/filter';

export const errorHandler = (response) =>
    response.ok ?
        Promise.resolve(response) :
        Promise.reject(Error(`${response.status}: ${response.statusText}`));

export const jsonHandler = (response) => response.json();

const listHandler = (list) => list.map((entry) => {
    delete entry.original;
    return entry;
});

const defaultQuery = {
    start: 0,
    limit: 10,
    search: '',
    sortField: 'year',
    sortOrder: 'descending'
};

class API {
    cache = new LRUCache({
        max: 5000,
        length: (items) => items ? items.length : 1
    });

    serializeQuery = ({
        start = defaultQuery.start,
        limit = defaultQuery.limit,
        search = defaultQuery.search,
        sortOrder = defaultQuery.sortOrder,
        sortField = defaultQuery.sortField,
        filter = defaultQuery.filter
    }) => `start=${start}&limit=${limit}&search=${search}&sortField=${sortField}&sortOrder=${sortOrder}&filter=${serialize(filter)}`;

    fetchList = async (query = defaultQuery) => {
        query = { ...defaultQuery, ...query };

        const queryKey = this.serializeQuery(query);
        const data = await fetch(`api/list?${queryKey}`)
            .then(errorHandler).then(jsonHandler).then(listHandler);

        if (data) {
            this.cache.set(queryKey, data);
        }

        return data;
    };

    loadData = async (query = defaultQuery) => {
        query = { ...defaultQuery, ...query };
        const queryKey = this.serializeQuery(query);

        if (this.cache.has(queryKey)) {
            return this.cache.get(queryKey);
        } else {
            return this.fetchList(query);
        }
    };
}

const instance = new API();

export default instance;
