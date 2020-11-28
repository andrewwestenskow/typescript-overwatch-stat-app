import React from 'react';
import {EmptyProps} from 'types/Utility';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const TabNav: React.FC<EmptyProps> = (props) => {
  return (
    <View style={styles.tabNav}>
      <TouchableOpacity
        // onPress={() => navigateDrawer('Results')}
        style={{...styles.navSection, ...styles.leftSection}}>
        <Text style={styles.navText}>Results</Text>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => navigateDrawer('Add Match')}
        style={styles.middle}>
        <Text style={styles.navText}>Add Match</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{...styles.navSection, ...styles.rightSection}}>
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};
export default TabNav;

const styles = StyleSheet.create({
  tabNav: {
    height: 50,
    backgroundColor: '#000',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  navSection: {
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    color: '#fff',
    width: '100%',
    fontSize: 18,
    textAlign: 'center',
  },
  leftSection: {
    borderRightColor: '#fff',
    borderRightWidth: 1,
  },
  rightSection: {
    borderLeftColor: '#fff',
    borderLeftWidth: 1,
  },
});
