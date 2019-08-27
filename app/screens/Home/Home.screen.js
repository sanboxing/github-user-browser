import React, { Component, Fragment } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './Home.style';

class Home extends Component {
  state = {
    searchInput: '',
    data: [
      {
        login: 'minzarddillah',
        id: 39266818,
        node_id: 'MDQ6VXNlcjM5MjY2ODE4',
        avatar_url: 'https://avatars2.githubusercontent.com/u/39266818?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/minzarddillah',
        html_url: 'https://github.com/minzarddillah',
        followers_url: 'https://api.github.com/users/minzarddillah/followers',
        following_url: 'https://api.github.com/users/minzarddillah/following{/other_user}',
        gists_url: 'https://api.github.com/users/minzarddillah/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/minzarddillah/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/minzarddillah/subscriptions',
        organizations_url: 'https://api.github.com/users/minzarddillah/orgs',
        repos_url: 'https://api.github.com/users/minzarddillah/repos',
        events_url: 'https://api.github.com/users/minzarddillah/events{/privacy}',
        received_events_url: 'https://api.github.com/users/minzarddillah/received_events',
        type: 'User',
        site_admin: false,
        score: 93.07312
      },
      {
        login: 'Minzard',
        id: 35060245,
        node_id: 'MDQ6VXNlcjM1MDYwMjQ1',
        avatar_url: 'https://avatars3.githubusercontent.com/u/35060245?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/Minzard',
        html_url: 'https://github.com/Minzard',
        followers_url: 'https://api.github.com/users/Minzard/followers',
        following_url: 'https://api.github.com/users/Minzard/following{/other_user}',
        gists_url: 'https://api.github.com/users/Minzard/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/Minzard/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/Minzard/subscriptions',
        organizations_url: 'https://api.github.com/users/Minzard/orgs',
        repos_url: 'https://api.github.com/users/Minzard/repos',
        events_url: 'https://api.github.com/users/Minzard/events{/privacy}',
        received_events_url: 'https://api.github.com/users/Minzard/received_events',
        type: 'User',
        site_admin: false,
        score: 68.87966
      }
    ]
  };

  onChangeSearchInput = (value) => {
    if (value === ' ') return;
    this.setState({
      searchInput: value
    });
  }

  goToDetail = data => () => {
    this.props.navigation.navigate('DetailProfile', { data });
  }

  _keyExtractor = (item, index) => index.toString();

  _renderHeader = () => {
    const { searchInput } = this.state;

    return (
      <Fragment>
        <View style={styles.containerHeader}>
          <Text style={styles.textHeader}>Github Users</Text>
          <TouchableOpacity>
            <Icon name="md-menu" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            placeholder="Search by username"
            style={styles.textInput}
            onChangeText={this.onChangeSearchInput}
            value={searchInput}
            selectionColor="#BCC6C9"
          />
        </View>
      </Fragment>
    );
  }

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.containerItem} onPress={this.goToDetail(item)}>
        <Icon name="md-person" size={20} color="#FFF" />
        <Text style={styles.textName}>{ item.login }</Text>
        <View style={styles.iconListRight}>
          <Icon name="md-arrow-dropright" size={20} color="#FFF" />
        </View>
      </TouchableOpacity>
    );
  }

  __renderListEmptyComponent = () => {
    return <View />;
  }

  render() {
    const { data } = this.state;
    return (
      <FlatList
        data={data}
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
