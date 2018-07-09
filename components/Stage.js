import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Rect, Text, G, Circle } from 'react-native-svg';
import { forEach } from 'lodash';

const { width } = Dimensions.get('window');

const svgWidth = width - 32;

const getTotalTime = stages => {
  let total = 0;
  forEach(stages, stage => {
    total += stage.duration;
  });
  return total;
};

const stageTypes = ['awake', 'light', 'deep', 'out'];

const getStageColor = stage => {
  switch (stage) {
    case 'awake':
      return '#0000FF';
    case 'light':
      return '#00FF00';
    case 'deep':
      return '#FF0000';
    case 'out':
      return '#FFFF00';
    default:
      return 'black';
  }
};

const timeOffset = (ts, tntTime) => {
  const epochTs = new Date(ts).getTime();
  const epochTnt = new Date(tntTime).getTime();
  return (epochTnt - epochTs) / 1000;
};

const renderStages = stages => {
  const total = getTotalTime(stages);
  let offset = 0;
  const nodes = [];
  for (let i = 0; i < stages.length; i++) {
    const { stage, duration } = stages[i];
    nodes.push(
      <G key={`stage_${i}`}>
        <Rect
          x={offset}
          y={60}
          width={svgWidth * (duration / total)}
          height={50}
          fill={getStageColor(stage)}
        />
        <Text
          x={offset + svgWidth * (duration / total)}
          y={120}
          fontSize={10}
          stroke={getStageColor(stage)}
          textAnchor="start"
        >
          {`${duration}s`}
        </Text>
      </G>
    );
    offset += svgWidth * (stages[i].duration / total);
  }
  return nodes;
};

const renderLegends = () => {
  const nodes = [];
  for (let i = 0; i < stageTypes.length; i += 1) {
    nodes.push(
      <G key={`legends_${stageTypes[i]}`}>
        <Text
          x={(i % 2) * 100}
          y={(1 + parseInt(i / 2)) * 20}
          fontSize={15}
          stroke={getStageColor(stageTypes[i])}
          textAnchor="start"
        >
          {stageTypes[i]}
        </Text>
        <Rect
          x={(i % 2) * 100 + 60}
          y={parseInt(i / 2) * 20 + 8}
          width={15}
          height={15}
          stroke="#cfcfcf"
          strokeWidth="2"
          fill={getStageColor(stageTypes[i])}
        />
      </G>
    );
  }
  nodes.push(
    <G key="legent_tnt">
      <Text x={200} y={20} fontSize={15} stroke="#c87782" textAnchor="start">
        Toss And Turn
      </Text>
      <Circle
        cx={320}
        cy={14}
        r={8}
        stroke="white"
        fill="#c87782"
        strokeWidth="2"
      />
    </G>
  );
  return nodes;
};

const renderTnt = (stages, tnt, ts) => {
  const total = getTotalTime(stages);
  const nodes = [];
  for (let i = 0; i < tnt.length; i += 1) {
    const tntTs = tnt[i][0];
    const offset = timeOffset(ts, tntTs);
    nodes.push(
      <Circle
        key={`tnt${i}`}
        cx={svgWidth * (offset / total)}
        cy={85}
        r={5}
        stroke="white"
        fill="#c87782"
      />
    );
  }
  return nodes;
};

export default ({ stages, tnt, ts }) => {
  return (
    <View>
      <Svg width={svgWidth} height={120}>
        {renderLegends()}
        {renderStages(stages)}
        {renderTnt(stages, tnt, ts)}
      </Svg>
    </View>
  );
};
