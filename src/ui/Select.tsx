import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker, PickerProps} from '@react-native-community/picker';

const Option = Picker.Item;

const Select: React.FC<PickerProps> = (props) => (
  <View style={style.picker}>
    <Picker {...props} itemStyle={style.option} />
  </View>
);

export default Select;
export {Option};

const style = StyleSheet.create({
  picker: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    margin: 10,
    width: '100%',
  },
  option: {
    fontFamily: 'BigNoodleTooOblique',
    color: '#fff',
  },
});
