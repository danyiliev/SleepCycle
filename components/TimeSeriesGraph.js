import React from 'react';
import { View, Dimensions } from 'react-native';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { AreaChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import moment from 'moment';

const { width } = Dimensions.get('window');

const svgWidth = width - 32;

const parseData = data =>
  data.map(val => ({
    time: new Date(val[0]),
    value: val[1]
  }));

export default ({ data, color }) => {
  const parsedData = parseData(data);
  const Gradient = ({ index }) => (
    <Defs key={index}>
      <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
        <Stop offset={'0%'} stopColor={color} stopOpacity={0.8} />
        <Stop offset={'100%'} stopColor={color} stopOpacity={0.2} />
      </LinearGradient>
    </Defs>
  );
  return (
    <View>
      <AreaChart
        xAccessor={({ item }) => item.time}
        yAccessor={({ item }) => item.value}
        xScale={scale.scaleTime}
        data={parsedData}
        svg={{ fill: 'url(#gradient)' }}
        curve={shape.curveNatural}
        style={{
          width: svgWidth,
          height: 100
        }}
        contentInset={{ top: 10, bottom: 10 }}
      >
        <Grid />
        <Gradient />
      </AreaChart>
      <XAxis
        data={parsedData}
        svg={{
          fill: 'black',
          fontSize: 8,
          fontWeight: 'bold',
          rotation: 20,
          originY: 30,
          y: 5
        }}
        style={{ height: 30, width: svgWidth }}
        xAccessor={({ item }) => item.time}
        scale={scale.scaleTime}
        numberOfTicks={6}
        formatLabel={value => moment(value).format('LTS')}
      />
    </View>
  );
};
