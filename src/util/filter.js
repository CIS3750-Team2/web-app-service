import {defaultMemoize} from 'reselect';
import _ from 'lodash';

export default defaultMemoize((
    data,
    { provinces, minYear, maxYear, minSalary, maxSalary, textFilters }
) => {
    provinces = _.map(provinces, (province) => province.toLowerCase());

    return _.filter(
        data,
        (entry) => provinces.includes((entry.province || '').toLowerCase())
            && (!minYear || (entry.year && parseInt(entry.year, 10) >= minYear))
            && (!maxYear || (entry.year && parseInt(entry.year, 10) <= maxYear))
            && (!minSalary || (entry.salary && parseInt(entry.salary, 10) >= minSalary))
            && (!maxSalary || (entry.salary && parseInt(entry.salary, 10) <= maxSalary))
            && _.every(textFilters, ({ field, type, text = '' }) => {
                if (entry[field] === undefined || entry[field] === null) return false;
                switch (type) {
                    case 'includes':
                        return entry[field].toString().toLowerCase().includes(text.toLowerCase());
                    case 'not_includes':
                        return !entry[field].toString().toLowerCase().includes(text.toLowerCase());
                    case 'matches':
                        return entry[field].toString().toLowerCase() === text.toLowerCase();
                    case 'not_matches':
                        return entry[field].toString().toLowerCase() !== text.toLowerCase();
                    default: return true;
                }
            })
    )
});
