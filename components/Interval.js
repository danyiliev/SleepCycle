import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

import Stage from './Stage';
import TimeSeriesGraph from './TimeSeriesGraph';

export default class Interval extends React.Component {
  render() {
    const {
      interval: {
        ts,
        stages,
        score,
        timeseries: { tnt, tempRoomC, tempBedC, respiratoryRate, heartRate }
      }
    } = this.props;
    const startTime = moment(ts);
    return (
      <View style={{ padding: 16 }}>
        <Text>Score: {score}</Text>
        <Text>Start: {startTime.format('LLL')}</Text>
        <Stage stages={stages} tnt={tnt} ts={ts} />
        <Text> Room Temperature </Text>
        <TimeSeriesGraph data={tempRoomC} color="#FF0000" />
        <Text> Bed Temperature </Text>
        <TimeSeriesGraph data={tempBedC} color="#00FF00" />
        <Text> Respository Rate </Text>
        <TimeSeriesGraph data={respiratoryRate} color="#0000FF" />
        <Text> Heart Rate </Text>
        <TimeSeriesGraph data={heartRate} color="#FF00FF" />
      </View>
    );
  }
}
