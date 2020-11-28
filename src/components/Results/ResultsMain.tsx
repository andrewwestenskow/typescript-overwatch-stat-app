import React from 'react';
import {View, Text} from 'react-native';
import safeView from 'components/safeView';

const ResultsMain: React.FC = (props) => {
  return (
    <View>
      <Text>RESULTS</Text>
    </View>
  );
};

export default safeView(ResultsMain);
