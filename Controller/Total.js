import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


class Total extends Component {
 
    state={
        Total: 0
    }

    renderProducts = (products) => {
        return products.map((item, index) => {
            const price = item
            const total = products.reduce((prev, next)=> prev + next.price,0)
            this.state.Total = total
            console.log(total)
            
        })
    }
           
        
      

  render() {
      
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.TotalText}>Total:</Text>
        </View>
        <View style={styles.amount}>
        {this.props.products.length > 0 ? 
            
            <Text style={styles.amountText}>₦:{this.props.total}.00</Text>
           
          : <Text style={styles.emptyCart}>₦:0.00</Text>}
        </View>
       
      
        
       
          
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    height:60, 
    //backgroundColor:'green', 
    width:'100%', 
    flexDirection:'row', 
    justifyContent:'space-around', 
    alignItems:'center'
  },
  TotalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6D2775'
  },
  amountText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  emptyCart: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'grey'
  },
  amount: {
    //backgroundColor: '#1b9cfc',
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems:'center'
  }
})






export default Total;
