import React, { Component } from 'react';
import { View, Text,Keyboard,KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, Image, Button } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay'
import * as Font from 'expo-font'
import {AppLoading} from 'expo'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants'
import {firebase} from '../firebase/config'



class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        displayName: '',
        photoUrl: null
    };
  }


  // Handle user Update
  
  handleUpdateProfile = () => {
      var user = firebase.auth().currentUser
      user.updateProfile({
          displayName: this.state.displayName,
          photoURL: this.state.photoUrl
      }).then(()=> {
          // Update Successful
          console.log('Done')
          console.log(user.photoURL)
      }).catch((error)=> {
          // Error Handler
          console.log(error)
      })
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ photoUrl: result.uri });
        
      }

      console.log(result);
      
    } catch (E) {
      console.log(E);
    }
  };
  

  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={this._pickImage} />
        {this.state.photoUrl && <Image source={{ uri: this.state.photoUrl }} style={{ width: 200, height: 200 }} />}
        <Button onPress={this.handleUpdateProfile}
                title='Save'/>
      </View>
    );
  }
}

export default Profile;
