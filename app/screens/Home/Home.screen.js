import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class Home extends Component {
  state = {};

  goToDetail = () => this.props.navigation.navigate('DetailProfile')

  render() {
    return (
      <TouchableOpacity onPress={this.goToDetail}>
        <Text> textInComponent </Text>
      </TouchableOpacity>
    );
  }
}

export default Home;

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired
};
