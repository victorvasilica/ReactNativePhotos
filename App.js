import React from 'react';
import { StyleSheet, NavigatorIOS } from 'react-native';
import Albums from './Albums';

export default class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: '',
          component: Albums
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
