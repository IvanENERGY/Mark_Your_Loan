import { useEffect, useState } from "react"
import { StyleSheet,View,Text, Pressable } from "react-native"
import * as SQLite from 'expo-sqlite';
import { AntDesign } from '@expo/vector-icons';
export const Borrow2=(props)=>{

    return(
        <View style={styles.borrowContainer}>
        
            <View style={{flex:1}}>
            <Text style={styles.attributeTxt} >${props.borrow.amount}</Text>
            </View>

            <View style={{flex:1}}>
                <Text style={styles.attributeTxt} >{props.borrow.comment}</Text>
            </View>



        </View>
    )
}
const styles=StyleSheet.create({
    borrowContainer:{
       
        backgroundColor:'#dddddd',
        borderColor:'red',
        borderLeftWidth:15,
        borderRadius:10,
        marginVertical:5,
        flexDirection:'row',
        flex:1,
        justifyContent:'space-between',
        padding:20
    },
  
    attributeTxt:{
        textAlign:"center",
        fontSize:20
    }
})