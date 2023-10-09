import { StyleSheet } from "react-native";




const scale = [{scaleX: 1.3}, {scaleY: 1.3}];




export default StyleSheet.create({
    scrollView: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent:'space-evenly',
    },
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent:'space-evenly',
        padding: 10,
    },
    textInput: {
        padding: 5,
        borderWidth:2,
        marginBottom: 10,
        fontSize: 25
    },
    header: {
        textAlign:'center',
        fontSize: 45,
        fontWeight: 'bold',
        color: '#637A8F',
        fontFamily: 'Exo2'
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: -20,
/*         color:'#637A8F' */
    },
    result:{
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        width: '20%',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#637A8F'
    },
    themeSwitcher: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        padding: 5,
        transform: scale
    },
    radioStyle: {
        flexDirection: 'row',
    },
    numeric: {
        borderRadius: 45,
    },
});


