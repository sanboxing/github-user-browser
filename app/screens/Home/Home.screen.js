import React, { Component, Fragment } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './Home.style';

class Home extends Component {
  state = {};

  goToDetail = () => this.props.navigation.navigate('DetailProfile')

  _keyExtractor = (item, index) => index.toString();

  _renderHeader = () => {
    return (
      <Fragment>
        <View style={styles.containerHeader}>
          <Text style={styles.textHeader}>Github Users</Text>
          <TouchableOpacity>
            <Icon name="md-menu" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
      </Fragment>
    );
  }

  _renderItem = () => {
    return <View />;
  }

  __renderListEmptyComponent = () => {
    return <View />;
  }

  render() {
    return (
      <FlatList
        data={[]}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ListHeaderComponent={this._renderHeader}
        // extraData={this.props}
        ListEmptyComponent={this._renderListEmptyComponent}
      />
    );
  }
}

export default Home;

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired
};
