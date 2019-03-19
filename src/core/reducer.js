import React from 'react';
import _ from 'lodash';

import {provinces} from 'util/constants';

const initialState = {
    tableSearch: '',
    tableFilter: {
        provinces,
        textFilters: []
    },
    graphs: []
};

// selectors
export const getState = (state) => state;
export const getTableSearch = (state) => getState(state).tableSearch;
export const getTableFilter = (state) => getState(state).tableFilter;
export const getGraphs = (state) => getState(state).graphs;
export const getGraphByIndex = (state, row, col) =>
    _.get(getGraphs(state), `[${row}][${col}]`);

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

        default: return {
            ...state
        };
    }
};
