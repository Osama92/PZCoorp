import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Dimensions, Image, TouchableWithoutFeedback} from 'react-native';
import Products from '../Controller/Products'
import {connect} from 'react-redux';
import Total from '../Controller/Total'
import {firebase} from '../firebase/config'
import * as Font from 'expo-font'
import {AppLoading} from 'expo'

let customFonts = {
  'Medium': require('../Fonts/Roboto-Medium.ttf'),
  'Bold': require('../Fonts/Roboto-Bold.ttf'),
  'Black': require('../Fonts/Roboto-Black.ttf'),
  'Light': require('../Fonts/Roboto-Light.ttf'),
  'Regular': require('../Fonts/Roboto-Regular.ttf')
}

const screenWidth = Dimensions.get('window').width

var id = 0
var itemId = 0


class CartScreen extends Component {

  state = {
    fontLoaded: false,
    displayName: '',
    creditLimit: this.props.route.params.Limit,
    AvailableQty: 0,
    id: 0
  }



  deconstructItem =()=> {
    var item = this.props.cartItems
    var keys = Object(item).values
    //id = keys
    console.log(this.props.itemID)
    
  }

  readProduct =()=> {
     firebase.database().ref('Products' + '/' + this.props.itemID + '/').on('value', snapshot => {
       
      var productData = []
        snapshot.forEach((childSnapShot)=>{
          productData.push(childSnapShot.val())
          
        })
        //console.log(this.props.cartItems[1])
        
          this.setState({AvailableQty: productData[0]})
          
        
        
        
    })

    }


  renderEmptyCart = () => (
    <View style={{flexDirection:'column', alignItems:'center'}}>
      <Image source={require('../assets/cart.png')}
             style={styles.image}/>
      <Text style={{color:'#6D2775', fontSize: 16, fontWeight:'500', fontFamily:'Medium'}}>No items in your cart, Go back to shop.</Text>
    </View>
  )

  proceedToCart = ()=> (
    <TouchableOpacity
                            style={{width:screenWidth/1.3, height: 40, backgroundColor: '#6D2775', alignItems:'center', justifyContent:'center', borderRadius:4, marginBottom: 10}}>
            {this.props.cartItems.length > 0 && this.state.creditLimit >= this.props.total ? (<TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('CheckOut')}
                  ><Text style={styles.footerText}>Proceed to checkout</Text></TouchableWithoutFeedback>) : (<TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('Home')}><Text style={styles.footerText}>Insufficient Funds</Text></TouchableWithoutFeedback>) }
            
          </TouchableOpacity>
  )

  insufficientFund = ()=> (
    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}
                            style={{width:screenWidth/1.3, height: 40, backgroundColor: 'grey', alignItems:'center', justifyContent:'center', borderRadius:4, marginBottom: 10}}>
            <Text style={styles.footerText}>Insufficient Funds</Text>
            
          </TouchableOpacity>
  )
  
  
  
 
  // Fonts Loaded Async
async _loadFontsAsync() {
  await Font.loadAsync(customFonts)
  this.setState({fontLoaded: true})
}


componentDidMount() {
  this._loadFontsAsync()
  this.readProduct()
  this.deconstructItem()
}
  

  render() {
    
    if (this.state.fontLoaded) {
    return (
      <View style={styles.container}>
       
       <View  
                          style={{width: '100%', height: 140, justifyContent:'center', alignItems:'center', backgroundColor:'#6D2775'}}>
                     <TouchableOpacity style={styles.backView} onPress={()=> this.props.navigation.goBack(null)}>
                        <Image source={require('../assets/smallback.png')} style={{width: 30, height:'100%', tintColor:'#fff'}}/>
                        <Text style={{fontSize: 16, color: '#fff', fontWeight:'600', fontFamily:'Black'}}>Back to Shopping</Text>
                     </TouchableOpacity>
                    <View style={{width: '100%',flexDirection: 'row', justifyContent:'space-around', alignItems: 'center'}}>
                    <Text style={styles.headerText}>Shopping Cart</Text>
                    <Text style={{ color: '#fff', fontWeight:'600', fontFamily:'Medium', fontSize:13}}>{this.props.cartItems.length} items in cart</Text>
                    </View>
            

        </View>
          
     

          <View style={{width:'100%', flex:1, alignItems:'center', justifyContent:'center'}}>
          {this.props.cartItems.length > 0 ? 
            
            <Products onPress={this.props.removeItem}
                      products={this.props.cartItems}
                      onInc={this.props.increaseCounter} 
                      onDec={this.props.decreaseCounter}
                      AvailableQty = {this.state.AvailableQty}/>
           
          : this.renderEmptyCart()}
          </View>
          
          
          <Total products={this.props.cartItems} total={this.props.total}/>

          {this.props.cartItems.length > 0 ? this.proceedToCart(): null}
          

          

          
            
          
      </View>
    );
  } else {
    return <AppLoading/>
  }
}
}

const mapStateToProps = (state) => {
    return {
      cartItems: state,
      total: state.reduce((prev, next)=> prev + next.price * next.qty,0),
      itemID: state.reduce((prev,item)=> item.id, 0)
    }
  }
 
 
const mapDispatchToProps = (dispatch)=> {
  return {
    removeItem: (product)=>dispatch({type: 'REMOVE_FROM_CART', payload: product}),
    increaseCounter: (products)=> dispatch({type: 'INCREASE', payload: products}),
    decreaseCounter: (products)=> dispatch({type: 'DECREASE', payload: products})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fff'
  },
  headerText:{
    fontFamily:'Black',
    fontSize: 30,
    fontWeight: '800',
    color:'white'
},
footerText:{
  fontSize: 17,
  fontWeight: 'bold',
  color: '#fff'
},
footerText1:{
  fontSize: 14,
  fontWeight: '500',
  color: '#6D2775'
},
image:{
  width: 130,
  height: 130,
  tintColor:'#6D2775'
},
cartItem: {
  backgroundColor: 'black',
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems:'center'
  
},
backView: {
  flexDirection: 'row',
  width: '100%',
  height: '30%',
  marginTop: 40,
  padding: 10
},
})

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
