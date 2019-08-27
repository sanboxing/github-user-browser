import React, { Component } from 'react';
import { Text, View, Image, ActivityIndicator, Linking, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './DetailProfile.style';
import axios from '../../utils/axios';

class DetailProfile extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('data', { login: 'Username not found' }).login,
      headerStyle: {
        backgroundColor: '#8D9DA5'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    };
  };

  state = {
    loading: true,
    data: {},
    organizations: []
  }

  componentDidMount() {
    this.request();
  }

  onPressWebsite = () => {
    const { data } = this.state;
    Linking.openURL(data.blog);
  }

  onPressOrganization = item => () => {
    Linking.openURL(`https://github.com/${item.login}`);
  }

  request = async () => {
    const { login } = this.props.navigation.getParam('data', {});
    try {
      const fetch = [
        axios.get(`/users/${login}`),
        axios.get(`/users/${login}/orgs`)
      ];
      const [{ data }, { data: organizations }] = await Promise.all(fetch);

      this.setState({
        data,
        loading: false,
        organizations
      });
    } catch ({ response }) {
      this.setState({
        loading: false
      });
    }
  }

  _renderOrganization = (item) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.containerOrganization}
        onPress={this.onPressOrganization(item)}
      >
        <Image
          source={{ uri: item.avatar_url }}
          style={styles.imageOrganization}
        />
        <View style={styles.containerContentOrganization}>
          <Text style={styles.textNameOrganization}>{ item.login }</Text>
          <Text style={styles.text}>{ item.description || 'No description' }</Text>
        </View>

      </TouchableOpacity>
    );
  }

  render() {
    const { loading, data, organizations } = this.state;
    if (loading) {
      return (
        <View style={styles.containerLoading}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.containerProfileImage}>
            <Image
              source={{ uri: data.avatar_url }}
              style={styles.profileImage}
            />
            <View style={styles.containerProfileName}>
              <Text style={styles.textTitle}>{ data.name }</Text>
              <Text style={styles.text}>{ data.login }</Text>
              <Text style={styles.text}>Followers: {data.followers}</Text>
              <Text style={styles.text}>Following: {data.following}</Text>
              <Text style={styles.textWebsite} onPress={this.onPressWebsite}>{ data.blog }</Text>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.textTitle}>Organizations</Text>
            {
              organizations.length > 0
              ? organizations.map(item => this._renderOrganization(item))
              : <Text>No Ogranization</Text>
            }
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default DetailProfile;

DetailProfile.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func
  }).isRequired
};
