import { useEffect, useState } from "react"
import { StyleSheet,View,Text, Pressable } from "react-native"
import * as SQLite from 'expo-sqlite';
import { AntDesign } from '@expo/vector-icons';
export const HelpPay=(props)=>{

    const [friend,setFriend]=useState({});
    useEffect(()=>{
        (async()=>{
            const db =await SQLite.openDatabaseAsync('example.db');
            result =await  db.getFirstAsync('SELECT * FROM friends WHERE id=?',props.helpPay.linkedFriendId);
            setFriend(result);
            
        })();
    });



    return(
        <View style={styles.helpPayContainer}>
        
            <View style={{flex:3}}>
                <Text style={styles.attributeTxt} >{result?.name}</Text>
            </View>

            <View style={{flex:3}}>
            <Text style={styles.attributeTxt} >${props.helpPay.amount}</Text>
            </View>

            <View style={{flex:4}}>
                <Text style={styles.attributeTxt} >{props.helpPay.comment}</Text>
            </View>

            <Pressable onPress={props.deleteHelpPayHandler}>
                <View style={{flex:1}} >
                    <AntDesign name="closecircle" size={25} color="red" />
                </View> 
            </Pressable>

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