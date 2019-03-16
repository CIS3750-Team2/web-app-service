import React from 'react';
import {createSelector} from 'reselect';
import _ from 'lodash';

import API from 'core/api';
import filterData from 'util/filter';
import {getTableColumns} from 'util/columns';
import {provinces} from 'util/constants';

const mockData = _.map(_.range(100), (id) => ({
    id,
    firstName: ['Bill', 'Ted', 'Bob', 'Jenny', 'Sara', 'Anni'][_.random(0, 5)],
    lastName: ['Smith', 'Doe', 'Newman'][_.random(0, 2)],
    salary: _.random(100000, 1000000),
    industry: ['Emergency', 'Education', 'Municipal'][_.random(0, 2)],
    province: ['Ontario', 'Alberta', 'Quebec'][_.random(0, 2)],
    year: _.random(2000, 2020)
}));

const initialState = {
    rawData: [],
    tableSearch: '',
    tableFilter: {
        provinces,
        textFilters: []
    },
    graphs: []
};

// selectors
export const getState = (state) => state;
export const getRawData = (state) => getState(state).rawData;
export const getTableSearch = (state) => getState(state).tableSearch;
export const getTableFilter = (state) => getState(state).tableFilter;
export const getGraphs = (state) => getState(state).graphs;
export const getGraphByIndex = (state, row, col) =>
    _.get(getGraphs(state), `[${row}][${col}]`);
export const getTableData = createSelector(
    [getRawData, getTableSearch, getTableFilter],
    (data, search, filter) => {
        data = filterData(data, filter);

        const tokens = _.filter(
            search.toLowerCase().split(/\s+/),
            (token) => token.length > 0
        );
        if (tokens.length > 0) {
            data = data.filter((entry) => _.every(
                tokens,
                (token) => _.some(_.values(entry),
                    (val) => val.toString().toLowerCase().includes(token)
                )
            ));
        }

        return data;
    }
);
export const getAllFields = createSelector(
    [getRawData],
    getTableColumns
);

// action-creators
export const setTableSearch = (search) => ({
    type: 'SET_TABLE_SEARCH',
    search
});

export const setTableFilter = (filter) => ({
    type: 'SET_TABLE_FILTER',
    filter
});

export const addGraph = (graph, row) => ({
    type: 'ADD_GRAPH',
    graph,
    row
});

export const setRawData = (data) => ({
    type: 'SET_RAW_DATA',
    data
});

export const loadData = (year, province) => async (dispatch) => {
    const data = await API.getData(year, province);
    dispatch(setRawData(data));
    return data;
};

// reducer
export default (state = initialState, { type, ...action }) => {
    switch (type) {
        case 'SET_TABLE_SEARCH': return {
            ...state,
            tableSearch: action.search
        };

        case 'SET_TABLE_FILTER': return {
            ...state,
            tableFilter: action.filter
        };

        case 'ADD_GRAPH': return {
            ...state,
            graphs: (
                action.row == null
                || state.graphs.length === 0
                || (action.row || -1) >= state.graphs.length
            )
                ? [...state.graphs, [action.graph]]
                : _.map(state.graphs, (graphRow, idx) =>
                    (action.row == null && idx === (state.graphs.length - 1)) || action.row === idx
                        ? [...graphRow, action.graph]
                        : graphRow
                )
        };

        case 'SET_RAW_DATA': return {
            ...state,
            rawData: action.data.length > 0 ? action.data : state.rawData
        };

        default: return {
            ...state
        };
    }
};
