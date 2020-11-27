import React from 'react';

import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function safeView<P>(WrappedComponent: React.FC<P>) {
  return (props: P) => {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            style={styles.scrollView}
            contentInsetAdjustmentBehavior="automatic">
            <WrappedComponent {...props} />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  };
}

export default safeView;

const styles = StyleSheet.create({
  scrollView: {
    minHeight: windowHeight,
    width: windowWidth,
    backgroundColor: '#2d3356',
  },
});
