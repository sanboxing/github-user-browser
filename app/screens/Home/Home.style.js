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
  },
  textInput: {
    color: '#BCC6C9',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 10
  },
  containerItem: {
    backgroundColor: '#CDD8DC',
    padding: 10,
    marginBottom: 3,
    flexDirection: 'row'
  },
  textName: {
    color: '#616E75',
    marginLeft: 10
  },
  iconListRight: {
    flex: 1,
    alignItems: 'flex-end'
  }
});

export default styles;
