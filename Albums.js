import React from 'react';
import { Text, View, ActivityIndicator, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Photos from './Photos';

class AlbumItem extends React.PureComponent {
  render() {
    const item = this.props.item;
    const title = item.title;

    return (
      <TouchableHighlight underlayColor='#E1F5FE' onPress={this._onPress}>
        <View>
          <View style={styles.rowContainer}>
            <View style={styles.bullet} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{title}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  _onPress = () => {
    const item = this.props.item;
    const index = this.props.index;

    this.props.onPressItem(index, item);
  }
}

export default class Albums extends React.Component {
  componentDidMount() {
    const store = this.context.store;

    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });

    this._getAlbums(store);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const store = this.context.store;
    const state = store.getState();

    if (state.albums.isLoading) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size='large' color='#03A9F4' />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={state.albums.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  _getAlbums(store) {
    store.dispatch({
      type: 'FETCH_ALBUMS'
    })

    const url = 'https://jsonplaceholder.typicode.com/albums';

    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        store.dispatch({
          type: 'UPDATE_ALBUMS',
          albums: responseJson
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _renderItem = ({ item, index }) => {
    return (
      <AlbumItem
        item={item}
        index={index}
        onPressItem={this._onPressItem}
      />
    );
  };

  _onPressItem = (index, item) => {
    this.props.navigator.push({
      title: 'Album',
      backButtonTitle: ' ',
      component: Photos,
      passProps: { album: item }
    });
  }
}

Albums.contextTypes = {
  store: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0
  },
  bullet: {
    width: 8,
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: '#E1F5FE'
  },
  textContainer: {
    flex: 1,
    padding: 8
  },
  text: {
    fontFamily: 'Avenir Next',
    fontSize: 16
  },
  separator: {
    height: 1,
    backgroundColor: '#E1F5FE'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center'
  }
});