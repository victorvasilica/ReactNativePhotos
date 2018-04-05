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

  _renderItem = ({item, index}) => {
    return (
      <Text>{item.title}</Text>
    );
  };

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator color='#0000ff'/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop: 20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}