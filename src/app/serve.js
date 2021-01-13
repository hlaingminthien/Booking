import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopBar from '../Service/common';

export default Serve = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TopBar navigation={navigation}></TopBar>
          <Text>Serve</Text>
        </View>
      );
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1
    }
  });