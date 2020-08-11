import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from '../View/LoginScreen';
import SignUpScreen from '../View/SignUpScreen';
import HomeScreen from '../View/HomeScreen'
import Profile from '../View/Profile'
import CartScreen from '../View/CartScreen'
import CheckOut from '../View/CheckOut'



const Stack = createStackNavigator()

class Index extends Component {
 

  

  render() {
    return (
        <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='LoginScreen' component={LoginScreen}/> 
          <Stack.Screen name='SignUpScreen' component={SignUpScreen}/>
          <Stack.Screen name='Home' component={HomeScreen}/> 
          <Stack.Screen name='Profile' component={Profile}/> 
          <Stack.Screen name='CartScreen' component={CartScreen}/> 
          <Stack.Screen name='CheckOut' component={CheckOut}/> 
        </Stack.Navigator>
    </NavigationContainer>
    
    );
  }
}

export default Index;