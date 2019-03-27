import React, {useState, useEffect} from 'react';
import './Graph.scss';
import {FlexibleXYPlot, 
  FlexibleWidthXYPlot, 
  FlexibleHeightXYPlot, 
  LineSeries, 
  VerticalBarSeries, 
  HeatmapSeries, 
  MarkSeries, 
  HorizontalGridLines, 
  VerticalGridLines, 
  XAxis, 
  YAxis, 
  ArcSeries, 
  Borders, 
  GradientDefs} 
from 'react-vis';

var plotData = [
    {x: 2015, y: 1080000},
    {x: 2016, y: 1980000},
    {x: 2017, y: 1620000}
  ];

var fields = [];

for (var i = 0; i < plotData.length; ++i) {
  fields[i] = plotData[i].x.toString();
  plotData[i].x = i;
}


const Graph = (data) => {

  /*const [loading, setLoading] = useState(false);
  const [plotData, setPlotData] = useState([]);
  
  useEffect(() => {

  }, [data]);*/

  switch(data.type) {
    case 'line': return (
    <div className='graph'>
    <FlexibleXYPlot>
    <LineSeries data = {plotData}/>
    <GradientDefs>
        <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity={0.4} />
        <stop offset="100%" stopColor="blue" stopOpacity={0.3} />
      </linearGradient>
    </GradientDefs>
    <Borders style={{
    bottom: {fill: 'url(#CoolGradient)', opacity: 0.3},
    left: {fill: '#fff', opacity: 0.3},
    right: {fill: '#fff', opacity: 0.3},
    top: {fill: '#fff'}
    }}/>
    <XAxis title = {data.xField} position = 'middle' tickFormat={v => fields[v]}/>
    <YAxis title = {data.yField} orientation = 'left'/>
    <HorizontalGridLines/>
    </FlexibleXYPlot>
  </div>);

    case 'bar': return (
    <div className='graph'>
    <FlexibleXYPlot>
    <VerticalBarSeries data = {plotData}/>
    <GradientDefs>
      <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity={0.4} />
        <stop offset="100%" stopColor="blue" stopOpacity={0.3} />
      </linearGradient>
    </GradientDefs>
    <Borders style={{
    bottom: {fill: 'url(#CoolGradient)', opacity: 0.3},
    left: {fill: '#fff', opacity: 0.3},
    right: {fill: '#fff', opacity: 0.3},
    top: {fill: '#fff'}
    }}/>
    <XAxis title = {data.xField} position = 'middle'/>
    <YAxis title = {data.yField}/>
    <HorizontalGridLines/>
    </FlexibleXYPlot>
  </div>);

  case 'heatmap' : return (
    <div className='graph'>
    <FlexibleXYPlot>
    <HeatmapSeries data = {plotData}/>
    <XAxis title = {data.xField}/>
    <YAxis title = {data.yField}/>
    <HorizontalGridLines/>
    </FlexibleXYPlot>
  </div>);

  case 'pie' : return (
    <div className='graph'>
    <FlexibleXYPlot>
    <ArcSeries data = {plotData}/>
    <XAxis title = {data.xField}/>
    <YAxis title = {data.yField}/>
    <HorizontalGridLines/>
    </FlexibleXYPlot>
  </div>);

  case 'scatter': return (
    <div className='graph'>
    <FlexibleXYPlot>
    <MarkSeries data = {plotData}/>
    <XAxis title = {data.xField}/>
    <YAxis title = {data.yField}/>
    <HorizontalGridLines/>
    </FlexibleXYPlot>
  </div>);

  }
  
};

export default Graph;
