import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import _, { get } from 'lodash';

import styles from './Home.style';
import axios from '../../utils/axios';

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => {
        const searchInput = navigation.getParam('searchInput', '');
        const onTypeText = navigation.getParam('onTypeText', () => {});

        return (
          <View>
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
                onChangeText={onTypeText}
                value={searchInput}
                selectionColor="#BCC6C9"
                autoFocus
              />
            </View>
          </View>
        );
      }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      data: [],
      loading: false,
      totalCount: 0,
      page: 1
    };
    this.onFetchDebounced = _.debounce(this.requestSearch, 1000);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onTypeText: this.onTypeText,
      searchInput: this.state.searchInput
    });
  }

  onEndReached = async () => {
    const {
      data,
      totalCount,
      loading,
      searchInput,
      page
    } = this.state;

    if (!loading && data.length < totalCount) {
      const url = `/search/users?q=${searchInput}&per_page=15&page=${page}`;

      this.setState({
        loading: true
      });

      try {
        const { data: dataResponse } = await axios.get(url);
        this.setState({
          data: data.concat(dataResponse.items || []),
          totalCount: dataResponse.total_count,
          loading: false,
          page: page + 1
        });
      } catch (error) {
        console.log(error.response);
        Alert.alert('Error when get data');
      }
    }
  }

  onTypeText = (value = '') => {
    const { navigation } = this.props;
    const { loading } = this.state;
    this.setState({
      searchInput: value.trim()
    });

    navigation.setParams({ searchInput: value.trim() });

    this.setState({
      data: [],
      totalCount: 0
    });


    if (value.trim().length < 3) this.setState({ loading: false });
    else if (!loading && value.trim().length >= 3) {
      this.setState({
        loading: true
      }, () => {
        this.onFetchDebounced();
      });
    }
  }

  requestSearch = async () => {
    const { searchInput } = this.state;
    const url = `/search/users?q=${searchInput}&per_page=15&page=1`;
    if (searchInput.length === 0) {
      return this.setState({
        data: [],
        totalCount: 0,
        loading: false
      });
    }

    try {
      const { data } = await axios.get(url);

      return this.setState({
        data: data.items,
        totalCount: data.total_count,
        loading: false,
        page: 2
      });
    } catch (error) {
      Alert.alert(get(error, 'response.data.message', 'unexpected error'));
      return this.setState({
        data: [],
        totalCount: 0,
        loading: false
      });
    }
  }

  goToDetail = data => () => {
    this.props.navigation.navigate('DetailProfile', { data });
  }

  _keyExtractor = (item, index) => index.toString();

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

  _renderListEmptyComponent = () => {
    const { loading, searchInput } = this.state;
    if (loading) return <View />;
    else if (searchInput.length >= 3) {
      return (
        <View style={styles.containerEmpty}>
          <Text>Sorry, we cant find your query</Text>
        </View>
      );
    }

    return (
      <View style={styles.containerEmpty}>
        <Text>Please input text for search Github user</Text>
      </View>
    );
  }

  _renderFooter = () => {
    const { loading } = this.state;
    if (loading) {
      return (
        <View style={styles.containerLoading}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return <View />;
  }

  render() {
    const { data } = this.state;
    return (
      <FlatList
        data={data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        extraData={this.state}
        ListEmptyComponent={this._renderListEmptyComponent}
        ListFooterComponent={this._renderFooter}
        onEndReachedThreshold={0.2}
        onEndReached={this.onEndReached}
      />
    );
  }
}

export default Home;

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    getParam: PropTypes.func
  }).isRequired
};
