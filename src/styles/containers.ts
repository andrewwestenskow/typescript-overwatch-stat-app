import {StyleSheet, Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const primaryBg = '#2d3356';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 175,
    alignItems: 'center',
    minHeight: windowHeight,
    width: windowWidth,
    backgroundColor: primaryBg,
  },
});
