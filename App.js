import React from 'react';
import { StyleSheet, NavigatorIOS } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
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
};

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(fetcher)}>
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: '',
            component: Albums
          }}/>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
