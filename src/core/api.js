import LRUCache from 'lru-cache';
import _ from 'lodash';
import {serialize} from 'util/filter';

export const errorHandler = (response) =>
    response.ok ?
        Promise.resolve(response) :
        Promise.reject(Error(`${response.status}: ${response.statusText}`));
export const jsonHandler = (response) => response.json();
export const textHandler = (response) => response.text();

const listHandler = (list) => list.map((entry) => {
    delete entry.original;
    if (entry.salary) {
        entry.salary = `$${entry.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    if (entry.taxableBenefits) {
        entry.taxableBenefits = `$${entry.taxableBenefits}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
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
    plotCache = new LRUCache({
        max: 100000,
        length: (points) => points ? points.length : 1
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

    serializePlotUrl = ({ yField, xField, yMethod, filter}) => {
        let url = `api/plot/${yField}/${yMethod}/vs/${xField}`;
        if (filter) {
            url += `?filter=${serialize(filter)}`;
        }
        return url;
    };

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

    fetchPlot = async (plotData) => {
        const { yField, xField, yMethod } = plotData;
        if (!yField || !yField.length || !xField || !xField.length || !yMethod || !yMethod.length) {
            return [];
        }

        const url = this.serializePlotUrl(plotData);
        const plots = await fetch(url).then(errorHandler).then(jsonHandler);

        if (plots) {
            this.plotCache.set(url, plots);
        }

        return plots;
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

    loadFields = async () => {
        if (this.fieldCache) {
            return this.fieldCache;
        } else {
            this.fieldCache = await fetch('api/fields')
                .then(errorHandler).then(jsonHandler);
            return this.fieldCache;
        }
    };

    loadPlot = async (plotData) => {
        const url = this.serializePlotUrl(plotData);

        if (this.plotCache.has(url)) {
            return this.plotCache.get(url);
        } else {
            return this.fetchPlot(plotData);
        }
    };

    getExportUrl = (query) => {
        if (query) {
            const queryKey = this.serializeQuery(
                _.omit(query, ['start', 'limit', 'sortField', 'sortOrder'])
            );
            return `api/export?${queryKey}`;
        } else {
            return `api/export`;
        }
    };
}

const instance = new API();

export default instance;
