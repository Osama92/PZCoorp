import React, { Component} from 'react';
import { View, Text,TouchableOpacity,Image, StyleSheet, FlatList} from 'react-native';
import {firebase} from '../firebase/config'
import {connect} from 'react-redux';

// var h = 0
// var y = 0
// var iid  = 0
class Products extends Component {

_isMounted = false
  

  constructor(props) {
    super(props);
    this.state = {
      AvailableQty:  0,
      getId: 0,
      balanceStock: 1

    }
  }
    

  readAvailableQty = () => {
    this._isMounted = true
    firebase.database().ref('Products' + '/' + this.props.itemID + '/').on('value', snapShot => {
      var productData = []
      snapShot.forEach((childSnapShot)=> {
        productData.push(childSnapShot.val())
      })
      if (snapShot.exists() && this._isMounted) {
        this.setState({AvailableQty: productData[0]})
        console.log(this.state.AvailableQty)
      }
      
    })
    
  }

  updateDatabaseQty = (id,availabilty,order) => {
    //firebase.database().ref('Products/' + id + '/').child('AvailableQty').set(ah)
    firebase.database().ref('Products/').child(id).child('AvailableQty').set(availabilty - order).then(()=>{console.log('up')})
  }

  balanceStock = (id, qty) => {
    if (qty !== 0) {
      firebase.database().ref('Products/').child(id).child('AvailableQty').set(firebase.database.ServerValue.increment(+ this.state.balanceStock))
    } else {
      null
    }
    
  }


componentDidMount() {
  
  
  this.readAvailableQty()
  //this.updateDatabaseQty(iid, h)
}
 
componentWillUnmount() {
  this._isMounted = false
}

  
  renderProducts = ({item, hh}) => {

      var hh = null 
      

      if (item.id === 1) {
        hh = require('../assets/images/maggi1.jpeg')
      } else if (item.id === 2) {
        hh = require('../assets/images/Kings2.png')
      }else if (item.id === 3) {
        hh = require('../assets/images/Kings1.png')
      } else if (item.id == 4) {
        hh = require('../assets/images/cube.png')
      }
    // console.log(h, y, iid)
      

      // switch (item.id) {
      //   case 1:
      //        alert(item.id)
      //   case 2:
      //       hh = require('../assets/images/cube.png')
      //   case 3:
      //       hh = require('../assets/images/Kings2.png')
      //   case 4:
      //         hh = require('../assets/images/Kings1.png')
      //     break;
      
      //   default:
      //     break;
      // }
      //h = item.AvailableQty - item.qty, y = 0, iid = item.id
      //y = item.AvailableQty - item.qty, h = y, iid = item.id
    return (
      
    
      <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%', alignItems:'center', marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#6D2775'}}>
      <View style={{padding: 10, width: '50%'}}>
      <Image source={hh}
             style={{width: 70, height: 70, resizeMode: 'cover', justifyContent:'center'}}/>
             
       <Text style={{ fontWeight:'700',textAlign:'left', fontSize: 15}}>{item.name}</Text>
       <Text style={{ fontWeight:'700',textAlign:'left', fontSize: 15, color: '#6D2775'}}>₦{item.price * item.qty}.00</Text>
       <TouchableOpacity onPress={()=>{this.props.onPress(item), this.balanceStock(item.id, item.qty)}}>
          <Text style={styles.buttonText}>Remove from cart</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'column', width: '50%',justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontWeight:'600', color: '#6D2775', fontSize:10}}>Choose Quantity</Text>
      <View style={{flexDirection: 'row', justifyContent:'space-around', width: '100%', alignItems:'center'}}>
      <TouchableOpacity onPress={()=>{this.props.onInc(item), this.updateDatabaseQty(item.id,item.AvailableQty,item.qty)}}>
          <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor:'#b2bec3', alignItems:'center', justifyContent:'center'}}>
            <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold'}}>+</Text>
          </View>
      </TouchableOpacity>
        <Text style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>{item.qty}</Text>
      <TouchableOpacity onPress={()=>{this.props.onDec(item),this.updateDatabaseQty(item.id,item.AvailableQty,item.qty) }}>
      <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor:'#b2bec3', alignItems:'center', justifyContent:'center'}}>
            <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold'}}>-</Text>
          </View>
      </TouchableOpacity>
      
      </View>
      </View>
      
    </View>
          
        )
        
  }
 

  


  render() {
    
    return (
      
      <View>
        <FlatList
        
                keyExtractor={(item)=>item.id.toString()}
                data={this.props.products}
                renderItem={this.renderProducts}
                numColumns={1}/>

      </View>
      
     
    );
  }
}

const styles = StyleSheet.create({
  buttonText:{
    color:'#6D2775',
    fontSize: 15,
    fontWeight:'400'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
    
},
Text: {
    fontSize: 13,
    color:'white'

},
columnView: {
    flexDirection: 'column',
    justifyContent:'space-around',
    alignItems:'center'
}
})


const mapStateToProps = (state) => {
  return {
    cartItems: state,
    total: state.reduce((prev, next)=> prev + next.price * next.qty,0),
    itemID: state.reduce((prev,item)=> item.id, 0),
    itemQty: state.reduce((prev, item)=> item.AvailableQty, 0)

  }
}



export default connect (mapStateToProps)(Products);
