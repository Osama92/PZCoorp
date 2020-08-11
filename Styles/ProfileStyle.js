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
    
})