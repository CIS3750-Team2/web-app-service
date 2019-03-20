import API from 'core/api';
import _ from "lodash";

export const columns = {
    'firstName': 'First Name',
    'lastName': 'Last Name',
    'salary': 'Salary',
    'industry': 'Industry',
    'employer': 'Employer',
    'taxableBenefits': 'Benefits',
    'title': 'Job Title',
    'year': 'Year',
    'province': 'Province',
    'sector': 'Sector'
};
export const columnKeys = _.keys(columns);

export const getTableColumns = async () => (
    _.chain(await API.loadFields())
        .uniq()
        .without('_id')
        .sortBy()
        .sortBy((id) => columns[id]
            ? columnKeys.indexOf(id)
            : columnKeys.length
        )
        .map((id) => ({
            label: columns[id] || id,
            id
        }))
        .value()
);
