import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SearchScreen from './screens/searchScreen';
import TransactionScreen from './screens/transactionScreen';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{alignSelf:"center", fontSize: 30}}>Wireless Library</Text>
        <ScreenContainer/>
      </View>
    );
  }
}

const screens = createBottomTabNavigator({
  transactionScreen: TransactionScreen,
  searchScreen: SearchScreen,
},
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName;
      if(routeName === "transactionScreen"){
        return(<Image source={require("./assets/book.png")} style={{
          width:40,
          height:40
        }}></Image>);
      }
      if(routeName === "searchScreen"){
        return(<Image source={require("./assets/searchingbook.png")} style={{
          width:40,
          height:40
        }}></Image>);   
      }
    }
  })
});


const ScreenContainer = createAppContainer(screens);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
});
