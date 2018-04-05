import React from 'react';
import { Text, View, ActivityIndicator, FlatList } from 'react-native';

export default class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true}
  }

  componentDidMount() {
    this._getPhotos(this.props.album.id)
  }

  _getPhotos(albumId) {
    const url = 'https://jsonplaceholder.typicode.com/albums/' + albumId + '/photos';

    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
        <View></View>
    );
  }
}