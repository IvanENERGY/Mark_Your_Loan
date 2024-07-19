import { useContext, useEffect, useState } from "react";
import { StyleSheet, View,Text,Platform,Button } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { dbTableContext } from "../App";


export const FriendTotalFooter=(props)=>{
    const [borrowAmount,setBorrowAmount]=useState(0);
    const[helpPayAmount,setHelpPayAmount]=useState(0);
    const [liFriends,setLiFriends,liBorrows,setLiBorrows,liHelpPays,setLiHelpPays]=useContext(dbTableContext);
    useEffect(()=>{
        let bTotal=0;
        for (b of liBorrows){
            bTotal+=b.amount;
        }
        setBorrowAmount(bTotal);


        let hTotal=0;
        for (h of liHelpPays){
            hTotal+=h.amount;
        }
        setHelpPayAmount(hTotal);
    },[liBorrows,liHelpPays])


    return(

        <View style={styles.friendFooterContainer}>
            <MaterialIcons name="summarize" size={30} color="black" /> 
            <View style={styles.friendContainerItem}>
            
                 
                <Text style={styles.nameTxt}>TOTAL</Text>
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
};

const styles=StyleSheet.create({

    friendFooterContainer:{
        borderLeftWidth:15,
        borderTopWidth:1,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:20,
       
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
})