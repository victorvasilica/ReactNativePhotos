import React from 'react';
import { Text, View, ActivityIndicator, FlatList } from 'react-native';

export default class Albums extends React.Component {
  constructor(props){
    super(props);
    this.state = { isLoading: true}
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
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}