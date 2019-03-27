import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import API from 'core/api';

import {
    FlexibleXYPlot,
    LineSeries,
    VerticalBarSeries,
    HeatmapSeries,
    MarkSeries,
    HorizontalGridLines,
    XAxis,
    YAxis,
    ArcSeries,
    Borders,
    GradientDefs
} from 'react-vis';
import {Modal} from 'antd';

import './Graph.scss';

const SeriesForType = {
  'line': LineSeries,
  'bar': VerticalBarSeries,
  'heatmap': HeatmapSeries,
  'pie': ArcSeries,
  'scatter': MarkSeries
};

const Graph = (data) => {
    const [loading, setLoading] = useState(false);
    const [plotData, setPlotData] = useState([]);
    const [fieldData, setFieldData] = useState([]);

    useEffect(() => {
        setLoading(true);
        API.loadPlot(data)
            .then((plots) => {
                let i = 0;
                const fieldData = [];
                const fields = _.reduce(plots, (acc, { x }) => {
                    fieldData[i] = (x || '').toString();
                    acc[(x || '').toString()] = i++;
                    return acc;
                }, {});
                setPlotData(_.map(plots, (point) => ({
                    ...point,
                    x: fields[(point.x || '').toString()]
                })));
                setFieldData(fieldData);
            })
            .catch((err) => {
                console.warn(err);
                Modal.error({
                  content: 'Error while loading, please retry!'
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [data]);

    const Series = SeriesForType[data.type];
    const xAxisProps = { title: data.xField };
    const yAxisProps = { title: data.yField };
    let extra;

    if (data.type === 'line') {
        xAxisProps.tickFormat = (v) => fieldData[v];
        xAxisProps.position = 'middle';
        yAxisProps.orientation = 'left';
        extra = (
            <>
                <GradientDefs>
                    <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="white" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="blue" stopOpacity={0.3} />
                    </linearGradient>
                </GradientDefs>
                <Borders style={{
                    bottom: { fill: 'url(#CoolGradient)', opacity: 0.3 },
                    left: { fill: '#fff', opacity: 0.3 },
                    right: { fill: '#fff', opacity: 0.3 },
                    top: { fill: '#fff' }
                }}/>
            </>
        );
    } else if (data.type === 'bar') {
        xAxisProps.position = 'middle';
        extra = (
            <>
                <GradientDefs>
                    <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="white" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="blue" stopOpacity={0.3} />
                    </linearGradient>
                </GradientDefs>
                <Borders style={{
                    bottom: { fill: 'url(#CoolGradient)', opacity: 0.3 },
                    left: { fill: '#fff', opacity: 0.3 },
                    right: { fill: '#fff', opacity: 0.3 },
                    top: { fill: '#fff' }
                }}/>
            </>
        );
    }

    return (
        <div className='graph'>
            <FlexibleXYPlot>
                <Series data={plotData}/>
                {extra}
                <XAxis {...xAxisProps}/>
                <YAxis {...yAxisProps}/>
                <HorizontalGridLines/>
            </FlexibleXYPlot>
        </div>
    );
};

export default Graph;
