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

export const updateGraph = (graph, row, idx) => ({
    type: 'UPDATE_GRAPH',
    graph,
    row,
    idx
});

export const removeGraph = (row, idx) => ({
    type: 'REMOVE_GRAPH',
    row,
    idx
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

        case 'UPDATE_GRAPH': return {
            ...state,
            graphs: (
                action.row < state.graphs.length
                && action.idx < state.graphs[action.row].length
            )
                ? _.set(
                    _.clone(state.graphs),
                    [action.row, action.idx],
                    {
                        ...state.graphs[action.row][action.idx],
                        ...action.graph
                    }
                )
                : state.graphs
        };

        case 'REMOVE_GRAPH': return {
            ...state,
            graphs: _(state.graphs)
                .map((graphRow, rowIdx) => {
                    if (rowIdx !== action.row) return graphRow;

                    if (graphRow.length > 1) {
                        return _.filter(graphRow,
                            (graph, graphIdx) => graphIdx !== action.idx
                        );
                    } else {
                        return null;
                    }
                })
                .filter()
                .value()
        };

        default: return {
            ...state
        };
    }
};
