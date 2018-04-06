import React from 'react';
import { StyleSheet, NavigatorIOS, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Albums from './Albums';

const defaultState = {
  albums: {
    data: [],
    isLoading: false
  },
  photos: {
    data: [],
    isLoading: false
  }
}

const photosApp = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_ALBUMS':
      return {
        ...state,
        albums: {
          ...state.albums,
          isLoading: true
        }
      };
    case 'UPDATE_ALBUMS':
      return {
        ...state,
        albums: {
          data: action.albums,
          isLoading: false
        }
      };
    case 'FETCH_PHOTOS':
      return {
        ...state,
        photos: {
          ...state.photos,
          isLoading: true
        }
      };
    case 'UPDATE_PHOTOS':
      return {
        ...state,
        photos: {
          data: action.photos,
          isLoading: false
        }
      };
    default:
      return state;
  }
};

export default class App extends React.Component {
  render() {
    StatusBar.setBarStyle('light-content', true);

    return (
      <Provider store={createStore(photosApp)}>
        <NavigatorIOS
          style={styles.container}
          translucent={false}
          barTintColor='#03A9F4'
          titleTextColor='#ffffff'
          initialRoute={{
            title: 'Albums',
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
