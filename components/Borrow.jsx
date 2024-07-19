import { useEffect, useState } from "react"
import { StyleSheet,View,Text, Pressable } from "react-native"
import * as SQLite from 'expo-sqlite';
import { AntDesign } from '@expo/vector-icons';
export const Borrow=(props)=>{

    const [friend,setFriend]=useState({});
    useEffect(()=>{
        (async()=>{
            const db =await SQLite.openDatabaseAsync('example.db');
            result =await  db.getFirstAsync('SELECT * FROM friends WHERE id=?',props.borrow.linkedFriendId);
            setFriend(result);
            
        })();
    });



    return(
        <View style={styles.borrowContainer}>
        
            <View style={{flex:3}}>
                <Text style={styles.attributeTxt} >{result?.name}</Text>
            </View>

            <View style={{flex:3}}>
            <Text style={styles.attributeTxt} >${props.borrow.amount}</Text>
            </View>

            <View style={{flex:4}}>
                <Text style={styles.attributeTxt} >{props.borrow.comment}</Text>
            </View>

            <Pressable onPress={props.deleteBorrowHandler}>
                <View style={{flex:1}} >
                    <AntDesign name="closecircle" size={25} color="red" />
                </View> 
            </Pressable>

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