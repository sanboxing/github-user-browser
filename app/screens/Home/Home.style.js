import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width,
    height: 56,
    padding: 10,
    backgroundColor: '#8D9DA5'
  },
  textHeader: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default styles;
