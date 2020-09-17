import React, { Component } from 'react';
import { View, Text, StatusBar, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image, TouchableOpacity,FlatList, Alert, SectionList, Dimensions} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay'
import * as Font from 'expo-font'
import {AppLoading} from 'expo'
import {firebase} from '../firebase/config'
import HomeStyle from '../Styles/HomeStyle'
import Cart from '../Controller/Cart'
import {connect} from 'react-redux'
import SearchableDropdown from 'react-native-searchable-dropdown' 
import {products} from '../Data'


let customFonts = {
  'Medium': require('../Fonts/Roboto-Medium.ttf'),
  'Bold': require('../Fonts/Roboto-Bold.ttf'),
  'Black': require('../Fonts/Roboto-Black.ttf'),
  'Light': require('../Fonts/Roboto-Light.ttf'),
  'Regular': require('../Fonts/Roboto-Regular.ttf')
}


const width = Dimensions.get('screen').width



class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      clockNumber: '',
      isLoading: false,
      displayPhoto: null,
      creditLimit: '',
      displayName: '',
      products: [],
      productss: '',
      inMemoryProducts:[],
      balance: 0
    };
  }

  readProduct =()=> {
  this.setState({isLoading: true})
   firebase.database().ref().child('Products/').on('value', snapshot => {
    var productData = []
      snapshot.forEach((childSnapShot)=>{
        productData.push(childSnapShot.val())
      })

       var char = productData.map(function (item) {
        return {id: item.id,
                name: item.name,
                price: item.price,
                qty: item.qty,
                AvailableQty: item.AvailableQty
              }
      })
      this.setState({productss:char})
      this.setState({isLoading: false})
      // setTimeout(() => {
        console.log(this.state.productss, 'Na me noni')
        
      // }, 2000);
  })

   
  }



  loadProducts = ()=> {
    this.setState({products:products, inMemoryProducts:products, isLoading: false })
  }

  searchProducts = (value)=> {
    const filteredProducts = this.state.inMemoryProducts.filter(
        products => {
            let productsLowercase = (products.name).toLowerCase()

            let searchTermLowercase = value.toLowerCase()

            return productsLowercase.indexOf(searchTermLowercase) > -1
        }
    )
    this.setState({products: filteredProducts})
}
  

// set SpinnerTimeout
spinnerTimeOut = ()=> {
  
  Alert.alert(
    'COULD NOT CONNECT TO STORE',
    'Dear Member, Kindly ensure that you are connected to the internet.',
    [{
      text: 'Ok',
      onPress: ()=>{this.setState({isLoading: false}); this.props.navigation.navigate('LoginScreen')}
      
    }],
    {cancelable: true}
  )
}


// Fonts Loaded Async
async _loadFontsAsync() {
  await Font.loadAsync(customFonts)
  this.setState({fontLoaded: true})
}


// Read Data from Firebase method:
readFromFirebase = ()=> {
  //New1
  this.setState({isLoading: true})
  firebase.database().ref().child("Users/details").orderByChild("ClockNumber").equalTo(firebase.auth().currentUser.email).on('value', snapshot=> {
    if (snapshot.exists()) {
      //new2
      this.setState({isLoading: false})
      var usersDetail = snapshot.val()
      var keys = Object.keys(usersDetail)
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i]
        var displayName = usersDetail[k].DisplayName
        var creditLimit = usersDetail[k].CreditLimit
        
      }
        this.setState({displayName:displayName})
        this.setState({creditLimit: creditLimit})
      
    
    
    } else {
      this.setState({isLoading: true})
    setTimeout(() => {
      this.spinnerTimeOut()
    }, 9000);
    }
    })
    }

    checkProductAvailability = (item, itemAvail) => {
      if (itemAvail <= 0) {
        alert('Out of Stock')
      } else {
        this.props.addItemToCart(item)
      }
    }



    renderItem = ({item})=> {

      
      
      var hh = null 
      if (item.id === 1) {
        hh = require('../assets/images/maggi1.jpeg')
      } else if (item.id === 2) {
        hh = require('../assets/images/Kings2.png')
      }else if (item.id === 3) {
        hh = require('../assets/images/Kings1.png')
      }else if (item.id == 4) {
        hh = require('../assets/images/cube.png')
      }

      return (
      <View style={{minHeight: 100,margin:9, width:width/3.5, alignItems:'center', backgroundColor: '#fff', borderRadius: 7, padding:5}}>
          <TouchableOpacity onPress={()=>this.checkProductAvailability(item, item.AvailableQty)}>
          <Image source={hh}
                 style={{width: 90, height: 90, resizeMode: 'cover', justifyContent:'center'}}/>
                 <Text style={{width:'100%', fontWeight:'700',textAlign:'left', color:'black', width:60, fontSize: 11}}>{item.name}</Text>
                 <Text style={{width:'100%', fontWeight:'700',textAlign:'left',color:'#6D2775', fontSize:11}}>₦{item.price}.00</Text>
                 
          </TouchableOpacity>

      </View>
  )}

  _renderList = ({section, index}) => {
    if (index !==0) return null
    return (
        <FlatList numColumns={3}
        data={section.data}
        renderItem={this.renderItem}
        
        />
    )
}

isEmptyRender(sections) {
     if (sections.data.length == 0) {
         return(
             <View style={{flex:1, alignItems:'center',justifyContent:'center', height: 60}}>
             <Text style={{color: 'grey', fontWeight:'500', fontSize: 18}}>Unfortunately no match was found</Text>
             </View>
         )
     } 
     
}



componentDidMount() {
  this._loadFontsAsync()
  this.readFromFirebase()
  this.readProduct()
   
}







  render() {
    const section = [
      {title:'Food Cupboard', data: this.state.productss},
      {title:'Showcase', data: this.state.productss}
           ]
            
    if (this.state.fontLoaded) {
      
    return (

         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}
                                  style={{flex: 1}}
                                  keyboardVerticalOffset= {Platform.select({ios: 0, android: 500})}
                                  >
        <SafeAreaView style={HomeStyle.androidSafeArea}>
        <Spinner visible = {this.state.isLoading}
                          textContent = {'Please wait..'}
                          color = {'#6D2775'}
                          textStyle={HomeStyle.spinnerStyle} />
                          
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          
        <View style={HomeStyle.headerView}>
          <View style={{flexDirection:'row', width: '100%'}}>
          <Text style={{fontFamily:'Black', fontSize:40,marginLeft: 20}}>Hello</Text>
          <Text style={{fontFamily:'Medium', fontSize:40}}> there!</Text>
          <TouchableOpacity style={{width: 50, height: 50, borderRadius: 25, backgroundColor:'#F2F2F2', marginLeft: 120, justifyContent:'center', alignItems:'center'}}
                            onPress={()=>this.props.navigation.navigate('CartScreen', {Limit: this.state.creditLimit})}>
          <Cart count={this.props.cartItems.length}/>
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={{flexDirection: 'row'}}
                            onPress={()=>this.props.navigation.navigate('Profile')}>
           <Image style={{width: 30, height: 30, resizeMode: 'contain', marginLeft:20, tintColor:'#6D2775'}}
                  source={require('../assets/customer.png')}/>
           <Text style={{fontFamily:'Medium', fontSize:22,marginLeft: 10}}>{this.state.displayName}</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', marginLeft: 20}}>
            <Text style={{fontFamily:'Medium', fontSize: 16, color:'silver'}}>Available Monthly credit limit:</Text>
            <Text style={{fontFamily:'Black', fontSize: 16, color:'silver'}}> N{this.state.creditLimit}.00</Text>
            
          </View>
         
          
        </View>
        
        <SearchableDropdown  onTextChange={(value)=>this.searchProducts(value)}
                             onItemSelect={(item)=>{this.props.addItemToCart(item); Keyboard.dismiss()}}
                             itemStyle={{padding: 10, marginTop: 2, backgroundColor:'#f1f1f1'}}
                             itemsContainerStyle={{maxHeight: 200,}}
                             items = {this.state.productss}
                             itemTextStyle={{fontFamily: 'Medium', fontSize: 13}}
                             defaultIndex={0}
                             placeholder='What are you looking for?'
                             placeholderTextColor = '#6D2775'
                             resetValue={true}
                             textInputStyle={HomeStyle.searchTab}
                             listProps={
                                          {
                                            ListEmptyComponent: ()=>(
                                                        
                                              <View style={{justifyContent: 'center', alignItems: 'center', height:200, fontFamily:'Medium'}}>
                                                  <Text style={{fontSize:20, color:'#6D2775'}}>Unfortunately, we could not find your item.</Text>
                                              </View>
                                                    )
                                        

                                                }
                                                
                                                
                                              
                                                
                                            }
                                            
                                            /> 
         <SectionList 
                ListHeaderComponent={this.headerComponentRender}
                renderItem={this._renderList}
                sections={section}
                renderSectionHeader={({section})=>(
                        <View style={{ width:'100%', justifyContent:'space-around', alignItems:'flex-start', backgroundColor:'#6D2775', height:40, marginTop:10}}>
                           <Text style={HomeStyle.sectionText}>{section.title}</Text>
                            
                        </View>
                          )}
                showsVerticalScrollIndicator={false}
                />
                

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



const mapStateToProps = (state) => {
  return {
    cartItems: state
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    addItemToCart: (product) => dispatch({type: 'ADD_TO_CART', payload: product}),

   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
