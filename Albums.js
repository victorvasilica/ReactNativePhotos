import React from 'react';
import { Text, View, ActivityIndicator, FlatList, StyleSheet, TouchableHighlight } from 'react-native';

class AlbumItem extends React.PureComponent {
    _onPress = () => {
      this.props.onPressItem(this.props.index);
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
  constructor(props){
    super(props);
    this.state = {isLoading: true}
  }

  _getAlbums() {
    return fetch('https://jsonplaceholder.typicode.com/albums')
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

  componentDidMount() {
    this._getAlbums();
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