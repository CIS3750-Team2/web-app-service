import React, {PureComponent} from 'react';

import {DatePicker} from 'antd';

class YearPicker extends PureComponent {
    state = { open: false };

    handlePanelChange = (value, ...rest) => {
        this.setState({ open: false });
        this.props.onPanelChange && this.props.onPanelChange(value, ...rest);
        this.props.onChange && this.props.onChange(value);
    };

    handleOpenChange = (open) => {
        this.setState({ open });
        this.props.onOpenChange && this.props.onOpenChange(open);
    };

    render() {
        return (
            <DatePicker
                {...this.props}
                mode='year'
                open={this.state.open}
                onPanelChange={this.handlePanelChange}
                onOpenChange={this.handleOpenChange}
            />
        );
    }
}

export default YearPicker;
