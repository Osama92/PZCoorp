import {StyleSheet, Platform, StatusBar, Dimensions} from 'react-native'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height


export default StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        alignItems: 'center'
    },
    FontBlack: {
        fontFamily: 'InterMedium',
        fontSize: 40
    },
    logoView: {
        width: '100%',
        height: '100%',
        alignItems:'center',
        justifyContent:'center',
    },
   
    textInput: {
        width: width/1.2,
        borderRadius:30,
        height: 60,
        backgroundColor: '#f1f1f1',
        paddingLeft: 20,
        marginTop: 10,
        fontSize: 18,
        color:'#6D2775',
        fontFamily: 'InterMedium'
    },
    passwordWarning: {
        fontSize: 13,
        color:'#6D2775',
        fontFamily: 'InterMedium',
        textAlign:'center',
        marginTop: 10,
        padding:10
    },
    loginBtn: {
        width: 300,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#6D2775',
        marginTop: 10,
        alignItems:'center',
        justifyContent:'center'
    },
    loginText: {
        fontFamily:'InterBlack',
        color: '#F47621',
        fontSize: 18
    },
    spinnerStyle: {
        color: '#6D2775'
    },
    LoginRow: {
        flexDirection: 'row',
        width:'100%',
        //height: 30,
        justifyContent:'space-between'
    }
})