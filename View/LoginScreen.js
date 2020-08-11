import React, { Component } from 'react';
import { View, Text,SafeAreaView, Keyboard, KeyboardAvoidingView, Platform, TextInput, Image, TouchableWithoutFeedback, TouchableOpacity, Alert, StatusBar } from 'react-native';
import LoginStyle from '../Styles/LoginStyle'
import * as Font from 'expo-font'
import Spinner from 'react-native-loading-spinner-overlay'
import {AppLoading} from 'expo'
import {firebase} from '../firebase/config'

let customFonts = {
    'InterBlack': require('../Fonts/InterBlack.ttf'),
    'InterMedium': require('../Fonts/InterMedium.ttf')
}

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fontLoaded: false,
        clockNumber: '',
        password: '',
        userName: '',
        isLoading: false
    };
  }


  // Fonts Loaded Async
  async _loadFontsAsync() {
      await Font.loadAsync(customFonts)
      this.setState({fontLoaded: true})
  }


 // Handle Clock Number 
 handleClockNumber = (text) => {
    this.setState({clockNumber:text})
  }

  // Handle Password
  handlePassword = (text) => {
    this.setState({password:text})
  }

  //handleLogin 
  handleLogin = () => {
    
    if (this.state.clockNumber != '' && this.state.password != '') {
      this.setState({isLoading: true})
      firebase.auth().signInWithEmailAndPassword(this.state.clockNumber + '@pzcoorp.com', this.state.password)
      .then(
        ()=> {
          this.setState({isLoading: false})
          this.props.navigation.navigate('Home')
        }
    ).catch((error)=>{
      switch (error.code) {
        case 'auth/invalid-email':
          Alert.alert(
            'WRONG CLOCK NUMBER',
            'Oops! Please ensure "Clock Number field" are correct.Thank you!',
            [{
              text: 'ok',
              onPress: ()=> this.setState({isLoading: false})
              
            }],
            {cancelable: false}
          )
        case 'auth/wrong-password':
          Alert.alert(
            'WRONG PASSWORD',
            'Oops! Please ensure "password field" are correct.Thank you!',
            [{
              text: 'ok',
              onPress: ()=> this.setState({isLoading: false})
              
            }],
            {cancelable: false}
          )
        case 'auth/user-not-found':
          Alert.alert(
            'USER NOT FOUND',
            (error.message),
            [{
              text: 'ok',
              onPress: ()=> this.setState({isLoading: false})
              
            }],
            {cancelable: false}
          )
        
      }
      
    })
    } else {
      this.setState({isLoading: false})
      Alert.alert(
        'MISSING FIELDS',
        'Oops! Please ensure "Clock Number field and Password field" are correct.Thank you!',
        [{
          text: 'ok',
          
        }],
        {cancelable: false}
      )
    }
  }


  

  componentDidMount(){
      this._loadFontsAsync()
  }

  render() {
      if (this.state.fontLoaded) {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}
                                  style={{flex: 1}}
                                  keyboardVerticalOffset= {Platform.select({ios: 0, android: 500})}
                                  >
                
                <SafeAreaView style={LoginStyle.androidSafeArea}>
                 <Spinner visible = {this.state.isLoading}
                          textContent = {'Please wait..'}
                          color = {'#6D2775'}
                          textStyle={LoginStyle.spinnerStyle} />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
             
                <View style={LoginStyle.logoView}>
                    <Image source={require('../assets/pzc.png')}
                            style={{width: 200, height: 200}}/>
                    <Text style={{fontFamily:'InterMedium', marginTop:10, fontSize:15, color: '#F47621'}}>Each for all, All for each</Text>
                    <Text style={{fontFamily:'InterBlack', marginTop:10, fontSize:23, color: '#6D2775'}}>Mini Mart</Text>
                    <View style={LoginStyle.LoginRow}>
                      <Text style={{paddingLeft: 20, fontFamily:'InterBlack', color: '#6D2775', fontSize: 30 }}>Login</Text>
                      <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignUpScreen')}>
                      <Text style={{paddingRight: 20,fontFamily:'InterMedium', color: '#6D2775', fontSize: 15, marginTop: 10}}>Create an account here</Text>
                      </TouchableOpacity>
                    </View>
                    <TextInput style={LoginStyle.textInput}
                               placeholder = 'Enter Clock Number'
                               placeholderTextColor = '#6D2775'
                               onChangeText={this.handleClockNumber}
                               />
                    <TextInput style={LoginStyle.textInput}
                               placeholder = 'Enter Password'
                               placeholderTextColor = '#6D2775'
                               secureTextEntry = {true}
                               onChangeText={this.handlePassword}
                               />
                    <TouchableOpacity onPress={this.handleLogin}>
                      <View style={LoginStyle.loginBtn}>
                        <Text style={LoginStyle.loginText}>Login</Text>
                      </View>
                    </TouchableOpacity>
                    <Text style={LoginStyle.passwordWarning}>Your password is yours and yours alone. If you feel your password has been compromised, please visit the coorporative admin.</Text>
                    
                </View>
               
                    
               
                </TouchableWithoutFeedback>
            </SafeAreaView>
            <StatusBar backgroundColor='black'/>
            </KeyboardAvoidingView>
          );
      } else {
          return <AppLoading/>
      }
    
  }
}


export default LoginScreen;
