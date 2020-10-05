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

const v = [{
  id: 'P1510006',
  userName: 'Usama'
}, {
  id: 'P1610007',
  userName: 'Atobiloye'
}]
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fontLoaded: false,
        clockNumber: '',
        password: '',
        isLoading: false,
        confirmPassword: '',
        displayName:'',
        userNames: '',
        v: 'Your Display Name'
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

  //Handle Confirm Password
  handleConfirmPassword = (text) => {
    this.setState({confirmPassword:text})
  }

  //Handle DisplayName
  handleDisplayName = (text) => {
    this.setState({displayName:"Hello"})
  }

  // Read Data

  handleReadUsers = () => {
    this.setState({isLoading: true})
    firebase.database().ref().child('PZCS').once('value').then((snapShot)=> {
      var userLists = []
      
      snapShot.forEach((childSnapShot)=> {
        userLists.push(childSnapShot.val())
      })
      var user2 = userLists.map(function (user) {
        return {id: user.ID,
                name: user.Name
              }
      })
      
       
      
      this.setState({userNames: user2})
      


    }).then (()=> {
      
      this.setState({isLoading: false})
      console.log(this.state.userNames)
      
      
    })
  }

  ccheck = () => {
      return this.state.userNames.some(function (el) {
        return el.id === id, console.log(el.name)
        console.log('ddd')
      })
    
  }

  //handleSignUp
  handleSignUp = () => {
    
     if (this.state.clockNumber != '' && this.state.confirmPassword != '') {
      this.setState({isLoading: true})
      firebase.auth().createUserWithEmailAndPassword(this.state.clockNumber + '@pzcoorp.com', this.state.password)
              .then(()=>{
                 firebase.database().ref('Users/details').push({
                    ClockNumber: this.state.clockNumber + '@pzcoorp.com',
                    DisplayName: this.state.v,
                    Password: this.state.password,

                
                }).then(()=>{
                    this.setState({isLoading: false})
                    this.props.navigation.navigate('Home')
                    
                })
              }).catch((error)=> {
                  switch(error.code) {
                      case 'auth/email-already-in-use':
                        Alert.alert(
                            'CLOCK NUMBER ALREADY EXISTS',
                            'Clock Number has already been registered.',
                            [{
                              text: 'Ok',
                              onPress: ()=>this.setState({isLoading: false})
                              
                            }],
                            {cancelable: false}
                          )
                  }
                
              })
            } else if (this.state.password != this.state.confirmPassword){
              this.setState({isLoading: false})
              Alert.alert(
                'PASSWORD MISMATCH',
                'Oops! Please ensure "Choose password field" corresponds with "Re-Enter Password field".Thank you!',
                [{
                  text: 'Ok',
                  
                }],
                {cancelable: false}
              ) 
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

  searchUser =(value)=> {
    const filteredUsers = this.state.userNames.filter(
      user => {
        let userLowerCase = (user.id)
        let inputUser = value.toUpperCase()
        return userLowerCase.indexOf(inputUser) > -1 
        
      }
    
    )
    if (value.length == 0) {
      this.setState({v: 'Your Display Name'})
    } else if (filteredUsers[0] == null){
      alert('Hello, That Clock Number is not valid.')
    } else {
      this.setState({v: filteredUsers[0].name})
      this.setState({clockNumber:filteredUsers[0].id.toLowerCase()})
    }
    
  }

  

  componentDidMount(){
      this._loadFontsAsync()
      this.handleReadUsers()
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
                          textContent = {'Please wait...'}
                          color = {'#6D2775'}
                          textStyle={LoginStyle.spinnerStyle} />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
             
                <View style={LoginStyle.logoView}>
                    <Image source={require('../assets/pzc.png')}
                            style={{width: 180, height: 180}}/>
                    <Text style={{fontFamily:'InterMedium', marginTop:10, fontSize:15, color: '#F47621'}}>Each for all, All for each</Text>
                    <Text style={{fontFamily:'InterBlack', marginTop:10, fontSize:23, color: '#6D2775'}}>Mini Mart</Text>

                    <TextInput style={LoginStyle.textInput}
                               placeholder = 'Enter Clock Number'
                               placeholderTextColor = '#6D2775'
                               onChangeText = {(value)=>this.searchUser(value)}
                               />
                    <TextInput style={LoginStyle.textInput}
                               placeholder = {this.state.v}
                               placeholderTextColor = '#6D2775'
                               onChangeText={this.handleDisplayName}
                               editable = {false}
                               />
                    <TextInput style={LoginStyle.textInput}
                               placeholder = 'Choose Password'
                               placeholderTextColor = '#6D2775'
                               secureTextEntry = {true}
                               onChangeText={this.handlePassword}
                               />
                    <TextInput style={LoginStyle.textInput}
                               placeholder = 'Re-Enter Password'
                               placeholderTextColor = '#6D2775'
                               secureTextEntry = {true}
                               onChangeText={this.handleConfirmPassword}
                               />
                    <TouchableOpacity onPress={this.handleSignUp}>
                      <View style={LoginStyle.loginBtn}>
                        <Text style={LoginStyle.loginText}>Sign Up</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('LoginScreen')}>
                    <Text style={LoginStyle.passwordWarning}>Already have a login? Tap here</Text>
                    </TouchableOpacity>
                    
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
