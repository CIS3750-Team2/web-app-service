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
import {Modal, Spin} from 'antd';

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
                const fields = _.reduce(plots, (acc, { x }) => {
                    acc[(x || '').toString()] = i++;
                    return acc;
                }, {});
                const fieldData = _.map(fields, (idx, str) => str);
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
    let extra;
    const xAxisProps = {
        title: data.xField,
        tickFormat: (v) => fieldData[v],
        position: 'middle',
        tickLabelAngle: data.large ? -90 : 0
    };
    const yAxisProps = {
      title: data.yField,
      position: 'middle',
      orientation: 'left',
    };

    return (
        <div className='graph'>
          {loading
              ? <Spin/>
              : (
                  <FlexibleXYPlot
                      margin={{ left: 75, bottom: data.large ? 120 : 30, right: 20, top: 10 }}
                  >
                      <Series data={plotData}/>
                      {extra}
                      <XAxis {...xAxisProps}/>
                      <YAxis {...yAxisProps}/>
                      <HorizontalGridLines/>
                  </FlexibleXYPlot>
              )
          }
        </div>
    );
};

export default Graph;
