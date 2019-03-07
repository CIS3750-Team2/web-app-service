import React from 'react';
import {createSelector} from 'reselect';

const mockData = [
    { id: 1, firstName: 'John', lastName: 'Doe', salary: 100050, industry: 'Education' },
    { id: 2, firstName: 'Bill', lastName: 'Smith', salary: 200150, industry: 'Emergency Services' },
    { id: 3, firstName: 'Jenny', lastName: 'Doe', salary: 150050, industry: 'Emergency Services' },
    { id: 4, firstName: 'Phill', lastName: 'Newman', salary: 171050, industry: 'Education' },
    { id: 5, firstName: 'John', lastName: 'Smith', salary: 122070, industry: 'Education' },
    { id: 6, firstName: 'John', lastName: 'Doe', salary: 100050, industry: 'Education' },
    { id: 20, firstName: 'John', lastName: 'Smith', salary: 122070, industry: 'Education' },
    { id: 21, firstName: 'John', lastName: 'Doe', salary: 100050, industry: 'Education' },
    { id: 10, firstName: 'John', lastName: 'Smith', salary: 122070, industry: 'Education' },
    { id: 11, firstName: 'John', lastName: 'Doe', salary: 100050, industry: 'Education' },
    { id: 12, firstName: 'Bill', lastName: 'Smith', salary: 200150, industry: 'Emergency Services' },
    { id: 13, firstName: 'Jenny', lastName: 'Doe', salary: 150050, industry: 'Emergency Services' },
    { id: 14, firstName: 'Phill', lastName: 'Newman', salary: 171050, industry: 'Education' },
    { id: 15, firstName: 'John', lastName: 'Smith', salary: 122070, industry: 'Education' },
    { id: 16, firstName: 'John', lastName: 'Doe', salary: 100050, industry: 'Education' },
    { id: 7, firstName: 'Bill', lastName: 'Smith', salary: 200150, industry: 'Emergency Services' },
    { id: 8, firstName: 'Jenny', lastName: 'Doe', salary: 150050, industry: 'Emergency Services' },
    { id: 9, firstName: 'Phill', lastName: 'Newman', salary: 171050, industry: 'Education' },
    { id: 19, firstName: 'Phill', lastName: 'Newman', salary: 171050, industry: 'Education' },
    { id: 17, firstName: 'Bill', lastName: 'Smith', salary: 200150, industry: 'Emergency Services' },
    { id: 18, firstName: 'Jenny', lastName: 'Doe', salary: 150050, industry: 'Emergency Services' },
    { id: 22, firstName: 'Bill', lastName: 'Smith', salary: 200150, industry: 'Emergency Services' },
    { id: 23, firstName: 'Jenny', lastName: 'Doe', salary: 150050, industry: 'Emergency Services' },
    { id: 24, firstName: 'Phill', lastName: 'Newman', salary: 171050, industry: 'Education' },
    { id: 25, firstName: 'John', lastName: 'Smith', salary: 122070, industry: 'Education' },
    { id: 26, firstName: 'John', lastName: 'Doe', salary: 100050, industry: 'Education' },
    { id: 27, firstName: 'Bill', lastName: 'Smith', salary: 200150, industry: 'Emergency Services' },
    { id: 28, firstName: 'Jenny', lastName: 'Doe', salary: 150050, industry: 'Emergency Services' },
    { id: 29, firstName: 'Phill', lastName: 'Newman', salary: 171050, industry: 'Education' },
    { id: 30, firstName: 'John', lastName: 'Smith', salary: 122070, industry: 'Education' },
    { id: 31, firstName: 'John', lastName: 'Doe', salary: 100050, industry: 'Education' },
    { id: 32, firstName: 'Bill', lastName: 'Smith', salary: 200150, industry: 'Emergency Services' },
    { id: 33, firstName: 'Jenny', lastName: 'Doe', salary: 150050, industry: 'Emergency Services' },
    { id: 34, firstName: 'Phill', lastName: 'Newman', salary: 171050, industry: 'Education' },
    { id: 35, firstName: 'John', lastName: 'Smith', salary: 122070, industry: 'Education' },
    { id: 36, firstName: 'John', lastName: 'Doe', salary: 100050, industry: 'Education' },
    { id: 37, firstName: 'Bill', lastName: 'Smith', salary: 200150, industry: 'Emergency Services' },
    { id: 38, firstName: 'Jenny', lastName: 'Doe', salary: 150050, industry: 'Emergency Services' },
    { id: 39, firstName: 'Phill', lastName: 'Newman', salary: 171050, industry: 'Education' },
    { id: 40, firstName: 'John', lastName: 'Smith', salary: 122070, industry: 'Education' },
];

const initialState = {
    rawData: mockData,
    tableSearch: '',
    tableFilter: {},
};

// selectors
export const getState = (state) => state;
export const getRawData = (state) => getState(state).rawData;
export const getTableSearch = (state) => getState(state).tableSearch;
export const getTableFilter = (state) => getState(state).tableFilter;
export const getTableData = createSelector(
    [getRawData, getTableSearch, getTableFilter],
    (data, search, filter) => {
        const tokens = _.filter(
            search.toLowerCase().split(/\s+/),
            (token) => token.length > 0
        );

        return tokens.length > 0
            ? data.filter((entry) => _.every(
                tokens,
                (token) => _.some(_.values(entry),
                    (val) => val.toString().toLowerCase().includes(token)
                )
            ))
            : data;
    }
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

        default: return {
            ...state
        };
    }
};
