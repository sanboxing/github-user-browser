import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    padding: 20
  },
  containerProfileImage: {
    flexDirection: 'row'
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 3
  },
  containerProfileName: {
    marginLeft: 20
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  text: {
    color: '#6B6B6B'
  },
  textWebsite: {
    color: '#0066D6',
    marginTop: 10
  },
  containerOrganization: {
    marginVertical: 10,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
    padding: 10,
    flexDirection: 'row'
  },
  imageOrganization: {
    width: 50,
    height: 50,
    borderRadius: 3
  },
  containerContentOrganization: {
    marginLeft: 10
  },
  textNameOrganization: {
    fontWeight: 'bold'
  }
});

export default styles;
