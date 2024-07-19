import { useEffect, useState } from "react"
import { StyleSheet,View,Text, Pressable } from "react-native"
import * as SQLite from 'expo-sqlite';
import { AntDesign } from '@expo/vector-icons';
export const HelpPay2=(props)=>{




    return(
        <View style={styles.helpPayContainer}>
        
       

            <View style={{flex:1}}>
            <Text style={styles.attributeTxt} >${props.helpPay.amount}</Text>
            </View>

            <View style={{flex:1}}>
                <Text style={styles.attributeTxt} >{props.helpPay.comment}</Text>
            </View>

          

        </View>
    )
}
const styles=StyleSheet.create({
    helpPayContainer:{
        backgroundColor:'#dddddd',
        borderColor:'green',
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