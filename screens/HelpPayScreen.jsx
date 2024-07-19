import {View , Text,StyleSheet,Button,Platform,FlatList,Alert} from "react-native"
import { AddHelpPayRecordModal } from "../components/AddHelpPayRecordModal";
import { useContext, useEffect, useState } from "react";
import { HelpingListEmpty } from "../components/HelpingListEmpty";
import * as SQLite from 'expo-sqlite';
import { HelpPayTotalFooter } from "../components/HelpPayTotalFooter";
import { HelpPay } from "../components/HelpPay";
import { dbTableContext } from "../App";

export const HelpPayScreen=()=>{
    const [isHelpPayRecordModalVisible,setIsHelpPayRecordModalVisible]=useState(false);
    // const [liHelpPays,setLiHelpPays]=useState([]);
    const [totalAmount,setTotalAmount]=useState(0);
    const [liFriends,setLiFriends,liBorrows,setLiBorrows,liHelpPays,setLiHelpPays]=useContext(dbTableContext);
    useEffect(()=>{
        (async()=>{
            try{
                const db =await SQLite.openDatabaseAsync('example.db');
                result =await db.getAllAsync('SELECT * FROM helpPays');
                console.log('readhelps',result);
                setLiHelpPays(result.reverse());
                
           }
           catch(err){
                alert(err)
           }
       })();
    },[isHelpPayRecordModalVisible])

    useEffect(()=>{
        //cal total
        let total=0;
        for (h of liHelpPays){
            total+=h.amount;
        }
        setTotalAmount(total);
    },[liHelpPays])
  
    const deleteHelpPayHandler=(delItem)=>{
        const deleteOp=   (async()=>{
            try{
                const db =await SQLite.openDatabaseAsync('example.db');
                result =await  db.runAsync('DELETE FROM helpPays WHERE id=?',delItem.id);
                setLiHelpPays(liHelpPays.filter((item)=>item.id!=delItem.id));
                console.log(liHelpPays)
            }
            catch(err){
                alert(err)
            }
            
        });
        
        const db = SQLite.openDatabaseSync('example.db');
        delItemRelatedFdObj =db.getFirstSync('SELECT * FROM friends WHERE id=?',delItem.linkedFriendId);

        Alert.alert('Are You Sure you want to delete the following record?', `
            \n Friend Name: ${delItemRelatedFdObj.name}
            \n Amount: ${delItem.amount}
            \n Comment:${delItem.comment?delItem.comment:"N/A"}
            `, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'YES', onPress: () =>deleteOp() },
          ]);


     
    }
    const deleteAllHelpPayHandler=()=>{
        const deleteOp=   (async()=>{
            try{
                const db =await SQLite.openDatabaseAsync('example.db');
                result =await  db.runAsync('DELETE FROM helpPays');
                setLiHelpPays([]);
            }
            catch(err){
                alert(err)
            }
            
        });
        Alert.alert('WARNING', `Are You Sure you want to delete ALL Helping records?\n\n (THIS CANNOT BE UNDONE)
            `, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'YES', onPress: () =>deleteOp() },
          ]);

    }

    return(
            <View style={styles.screenContainer}>
                {/* <Text>
                    This is HelpPay Screen
                </Text> */}

                <View style={styles.btnContainer}>
                    <Button title=">ADD HELPING RECORDS<" color={Platform.OS==="ios"?"#ffffff":"#000000"}   onPress={()=>setIsHelpPayRecordModalVisible(true)}/>
                </View>
                {liHelpPays.length!==0?<Text style={styles.listGuideTxt}>
                    Your Helping history are shown below:
                </Text>:
                <HelpingListEmpty />}
                <FlatList
                    data={liHelpPays}
                    renderItem={(itemData)=>{
          
                            return <HelpPay helpPay={itemData.item} deleteHelpPayHandler={()=>deleteHelpPayHandler(itemData.item)}/>
                               
                    }}         
                />
               {liHelpPays.length===0?null:<HelpPayTotalFooter amount={totalAmount} deleteAllHelpPayHandler={deleteAllHelpPayHandler}/>} 
                <AddHelpPayRecordModal vis={isHelpPayRecordModalVisible} closeModal={()=>setIsHelpPayRecordModalVisible(false)}/>
            </View>
    )
}
const styles=StyleSheet.create({
    screenContainer:{
        flex:1
        
    },
    btnContainer:{
        marginVertical:5,
        width:'90%',
        borderRadius:14,
        backgroundColor:"#000000",
        borderColor:"green",
        borderWidth:5,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        height:'10%',
        ...Platform.select(
            {
                "android":{
                    elevation:10
                },
                "ios":{
                    shadowOffset:{width:2,height:2},
                    shadowColor:"#000000",
                    shadowOpacity:0.4,
                    shadowRadius:5
                }
            }
        )
    },
    listGuideTxt:{
        textAlign:'center',fontSize:20,marginTop:20
    }


})