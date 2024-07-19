import { useContext, useEffect, useState } from "react";
import { StyleSheet, View,Text,Platform,Button } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { dbTableContext } from "../App";
import { FontAwesome5 } from '@expo/vector-icons';

export const FriendListHeader=(props)=>{

    return(

        <View style={styles.friendFooterContainer}>
            <FontAwesome5 name="user-friends" size={30} color="black" />
            <View style={styles.friendContainerItem}>
            
                 
                <Text style={styles.nameTxt}>Friend Name</Text>
            </View>
            <View style={styles.friendContainerItem}>
                   <Text style={styles.borrowAmountTxt}>You Owes Him/Her</Text>
            </View>
            <View style={styles.friendContainerItem}>
                    <Text style={styles.helpPayAmountTxt} >He/She Owes You</Text>
            </View>
            <View style={styles.friendContainerItem}>
                   <Text style={[styles.balanceTxt]}>Balance</Text>
            </View>
        </View>
    )
};

const styles=StyleSheet.create({

    friendFooterContainer:{
        borderLeftWidth:15,
        borderTopWidth:1,
        borderBottomWidth:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20,
       
    },  
    friendContainerItem:{
        width:'20%',
   
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
})