import { Text, View, StyleSheet,Platform, Pressable } from "react-native"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import Entypo from '@expo/vector-icons/Entypo';
import { useContext,useEffect, useState } from "react";
import * as SQLite from 'expo-sqlite';
import { dbTableContext } from "../App";
import { FriendTotalFooter } from "./FriendTotalFooter";
export const Friend=(props)=>{
    const [borrowAmount,setBorrowAmount]=useState(0);
    const[helpPayAmount,setHelpPayAmount]=useState(0);
    const [liFriends,setLiFriends,liBorrows,setLiBorrows,liHelpPays,setLiHelpPays]=useContext(dbTableContext);
    useEffect(()=>{
        (async()=>{
            try{
                const db =await SQLite.openDatabaseAsync('example.db');
                const resLiBorrows =await db.getAllAsync('SELECT * FROM borrows WHERE linkedFriendId=?',props.friend.id);
                let bTotal=0;
                for (b of resLiBorrows){
                    bTotal+=b.amount;
                }
                setBorrowAmount(bTotal);

                const resLiHelpPays =await db.getAllAsync('SELECT * FROM helpPays WHERE linkedFriendId=?',props.friend.id);
                let hTotal=0;
                for (h of resLiHelpPays){
                    hTotal+=h.amount;
                }
                setHelpPayAmount(hTotal);
           }
           catch(err){
                alert(err)
           }
       })();
    },[liBorrows,liHelpPays])



    return(
        
        <View style={[styles.friendContainer,{borderLeftColor:borrowAmount>helpPayAmount?"red":"green"}]}>
                {borrowAmount>helpPayAmount?<FontAwesome5 name="angry" size={25} color="red" />:<Entypo name="emoji-happy" size={25} color="green" />}
                <View style={styles.friendContainerItem}>
                    <Text style={styles.nameTxt}>{props.friend.name}</Text>
                </View>
                <View style={styles.friendContainerItem}>
                   <Text style={styles.borrowAmountTxt}>{borrowAmount}</Text>
                </View>
                <View style={styles.friendContainerItem}>
                    <Text style={styles.helpPayAmountTxt} >{helpPayAmount}</Text>
                </View>
                <View style={styles.friendContainerItem}>
                   <Text style={[styles.balanceTxt,{color:borrowAmount>helpPayAmount?'red':'green'}]}>{helpPayAmount-borrowAmount}</Text>
                </View>
                
               
                
        </View>
       
    )

}
const styles=StyleSheet.create(
    {
        friendContainer:{
            backgroundColor:'#dddddd',
            borderLeftWidth:15,
            borderRadius:10,
            marginVertical:5,
            flexDirection:'row',
            justifyContent:'space-between',
            padding:20
            
            
        },
        friendContainerItem:{
            width:'20%'
        },
  
        nameTxt:{
            fontSize:20,
            
        },
        borrowAmountTxt:{
            fontSize:20,
            color:'red',
            textAlign:'center',
        },
        helpPayAmountTxt:{
            fontSize:20,
            color:'green',
            textAlign:'center',
        },
        balanceTxt:{
            fontSize:20,
            textAlign:'center',
        
        }
    }
)