import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';



class ShoppingCartIcon extends Component {


ShoppingCartIcon = () => (
    
    <View style={{padding: 5}}>
<View style={{position: 'absolute', height: 30, width: 30, borderRadius: 15, backgroundColor: '#6D2775', right: 15, bottom: 15, alignItems: 'center',justifyContent: 'center', zIndex: 2000,}}>
   
<Text style={{color: 'white', fontWeight: 'bold'}} count={this.props.count}>{this.props.count}</Text>
   
</View>

   <Image source={require('../assets/cart.png')} style={styles.image}/>


</View>



)
  

  render() {
    return (
      this.ShoppingCartIcon()
    );
  }
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'

  },
  image: {
      height: 25,
      width: 25
  }
})





export default ShoppingCartIcon



