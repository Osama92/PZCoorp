import React, { Component} from 'react';
import { View, Text,TouchableOpacity,Image, StyleSheet, FlatList} from 'react-native';



class Products extends Component {

   

  
  renderProducts = ({item}) => (
   
    
    <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%', alignItems:'center', marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#6D2775'}}>
    <View style={{padding: 10, width: '50%'}}>
    <Image source={item.image}
           style={{width: 70, height: 70, resizeMode: 'cover', justifyContent:'center'}}/>
           
     <Text style={{ fontWeight:'700',textAlign:'left', fontSize: 15}}>{item.name}</Text>
     <Text style={{ fontWeight:'700',textAlign:'left', fontSize: 15, color: '#6D2775'}}>₦{item.price * item.qty}.00</Text>
     <TouchableOpacity onPress={()=>this.props.onPress(item)}>
        <Text style={styles.buttonText}>Remove from cart</Text>
      </TouchableOpacity>
    </View>
    <View style={{flexDirection: 'column', width: '50%',justifyContent:'center', alignItems:'center'}}>
      <Text style={{fontWeight:'600', color: '#6D2775', fontSize:10}}>Quantity</Text>
    <View style={{flexDirection: 'row', justifyContent:'space-around', width: '100%', alignItems:'center'}}>
    <TouchableOpacity onPress={()=>this.props.onInc(item)}>
        <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor:'#b2bec3', alignItems:'center', justifyContent:'center'}}>
          <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold'}}>+</Text>
        </View>
    </TouchableOpacity>
      <Text style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>{item.qty}</Text>
    <TouchableOpacity onPress={()=>this.props.onDec(item)}>
    <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor:'#b2bec3', alignItems:'center', justifyContent:'center'}}>
          <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold'}}>-</Text>
        </View>
    </TouchableOpacity>
    </View>
    </View>
    
  </View>
        
      )
 

  


  render() {
    
    return (
      
      <View>
        <FlatList
                keyExtractor={(item)=>item.id.toString()}
                data={this.props.products}
                renderItem={this.renderProducts}
                ListEmptyComponent={()=>
                    <View style={{flex:1, alignItems:'center',justifyContent:'center', marginTop: 50}}>
                        <Text style={{color: 'blue'}}>Cannot find your item</Text>
                        </View>}
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



export default Products;
