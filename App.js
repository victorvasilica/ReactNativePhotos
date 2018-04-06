import React from 'react';
import { StyleSheet, NavigatorIOS } from 'react-native';
import { createStore } from 'redux';
import Albums from './Albums';

const fetcher = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ALBUMS':
      return action.albums;
    case 'FETCH_PHOTOS':
      return action.photos;
    default:
      return state;
  }
}

const store = createStore(fetcher);

export default class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: '',
          component: Albums,
          passProps: {store: store}
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
