import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class PhotoDetails extends React.Component {
  render() {
    const title = this.props.photo.title;
    const photoUrl = this.props.photo.url;

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: photoUrl}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    resizeMode: 'contain'
  },
});