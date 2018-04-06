import React from 'react';
import { Text, View, ActivityIndicator, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Photos from './Photos';

class AlbumItem extends React.PureComponent {
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
            <View style={styles.textContainer}>
              <Text>{title}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>  
    );
  }
}

export default class Albums extends React.Component {
  componentDidMount() {
    const { store } = this.context;

    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
    
    this._getAlbums(store);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _getAlbums(store) {
    store.dispatch({
      type: 'FETCH_ALBUMS'
    })

    return fetch('https://jsonplaceholder.typicode.com/albums')
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

  _onPressItem = (index, item) => {
    this.props.navigator.push({
        title: 'Album',
        backButtonTitle: '',
        component: Photos,
        passProps: {album: item}
      });
   }

  _renderItem = ({item, index}) => {
    return (
      <AlbumItem
        item={item}
        index={index}
        onPressItem={this._onPressItem}
      />
    );
  };

  render() {
    const { store } = this.context;
    const state = store.getState();

    if(state.albums.isLoading) {
      return(
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator color='#0000ff'/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop: 20}}>
        <FlatList
          data={state.albums.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

Albums.contextTypes = {
  store: PropTypes.object
};

const styles = StyleSheet.create({
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