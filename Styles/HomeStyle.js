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
    spinnerStyle: {
        color: '#6D2775',
    },
    headerView: {
        width: width,
        height: height/7,
        //backgroundColor: 'grey',

    },
    userProfileView: {
       backgroundColor:'yellow',
        width: '25%',
        height: '100%'
    },
    logoView: {
        backgroundColor:'orange',
        width: '25%',
        height: '100%',
        alignItems:'center'
    },
    cartView: {
        backgroundColor:'black',
        width: '25%',
        height: '100%',
    },
    logo: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain'
    },
    sectionText: {
        fontFamily: 'Black',
        color:'#fff',
        fontSize:15,
        marginLeft: 10
    },
    profile: {
        width: '50%',
        height:'50%',
        resizeMode: 'contain',
        tintColor:'#6D2775'
    },
    profileView: {
        height: 50,
        width: 50,
        backgroundColor: '#f2f2f2',
        borderRadius: 25,
        justifyContent:'center',
        alignItems:'center',
        marginLeft: 10
    },
    cartViews: {
        height: 50,
        width: 50,
        backgroundColor: '#f2f2f2',
        borderRadius: 25,
        marginHorizontal:40,
        justifyContent:'center',
        alignItems:'center',

    },
    greeting: {
        fontFamily: 'Black',
        fontSize: 20,
        color:'#6D2775',
        marginLeft: 20
    },
    searchTab: {
        width: '90%',
        height: 80,
        backgroundColor: '#f1f1f1',
        borderRadius: 30,
        alignSelf: 'center',
        paddingLeft: 30,
        fontSize: 18,
        marginTop:10
        
    }

})