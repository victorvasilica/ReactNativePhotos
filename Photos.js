import React from 'react';
import { Text, View, ActivityIndicator, FlatList, StyleSheet, TouchableHighlight, Image } from 'react-native';
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
            <Image style={styles.thumb} source={{ uri: item.url }} />
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
        passProps: {photo: item}
      });
   }

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