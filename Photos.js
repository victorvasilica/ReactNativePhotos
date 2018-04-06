import React from 'react';
import { Text, View, ActivityIndicator, FlatList, StyleSheet, TouchableHighlight, Image } from 'react-native';
import PropTypes from 'prop-types';
import PhotoDetails from './PhotoDetails';

class PhotoItem extends React.PureComponent {
  _onPress = () => {
    const item = this.props.item;
    const index = this.props.index;

    this.props.onPressItem(index, item);
  }

  render() {
    const item = this.props.item;
    const title = item.title;

    return (
      <TouchableHighlight onPress={this._onPress}>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: item.thumbnailUrl }} />
            <View style={styles.textContainer}>
              <Text>{title}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }
}

export default class Photos extends React.Component {
  componentDidMount() {
    const { store } = this.context;

    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });

    this._getPhotos(this.props.album.id, store);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _getPhotos(albumId, store) {
    store.dispatch({
      type: 'FETCH_PHOTOS'
    })

    const url = 'https://jsonplaceholder.typicode.com/albums/' + albumId + '/photos';

    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        store.dispatch({
          type: 'UPDATE_PHOTOS',
          photos: responseJson
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _renderItem = ({ item, index }) => {
    return (
      <PhotoItem
        item={item}
        index={index}
        onPressItem={this._onPressItem}
      />
    );
  };

  _onPressItem = (index, item) => {
    this.props.navigator.push({
      title: item.title,
      backButtonTitle: '',
      component: PhotoDetails,
      passProps: { photo: item }
    });
  }

  render() {
    const { store } = this.context;
    const state = store.getState();

    if (state.photos.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator color='#0000ff' />
        </View>
      )
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={state.photos.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

Photos.contextTypes = {
  store: PropTypes.object
};

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});