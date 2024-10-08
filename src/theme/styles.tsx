import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        gap: 10
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    rootHome: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 20,        
    },
    header: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    container: {
        flex: 1,        
    },
    modal:{
        padding:20,
        marginHorizontal:20,
        backgroundColor:'#fff',
        borderRadius:10,
        gap:10
    },
    icon:{
        alignItems:'flex-end',
        flex:1
    },  
})