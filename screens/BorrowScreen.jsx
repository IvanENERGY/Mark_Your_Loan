import { useContext,useEffect, useState } from "react"
import {View , Text,StyleSheet,Button,Platform,FlatList,Alert} from "react-native"
import { AddBorrowRecordModal } from "../components/AddBorrowRecordModal";
import * as SQLite from 'expo-sqlite';
import { Borrow } from "../components/Borrow";
import { BorrowTotalFooter } from "../components/BorrowTotalFooter";
import { BorrowListEmpty } from "../components/BorrowListEmpty";
import { dbTableContext } from "../App";



export const BorrowScreen=()=>{
    const [isAddBorrowRecordModalVisible,setIsAddBorrowRecordModalVisible]=useState(false);
    // const [liBorrows,setLiBorrows]=useState([]);
    const [totalAmount,setTotalAmount]=useState(0);
    const [liFriends,setLiFriends,liBorrows,setLiBorrows,liHelpPays,setLiHelpPays]=useContext(dbTableContext);

    useEffect(()=>{
        (async()=>{
            try{
                const db =await SQLite.openDatabaseAsync('example.db');
                result =await db.getAllAsync('SELECT * FROM borrows');
                console.log('readborrows',result);
                setLiBorrows(result.reverse());
                
           }
           catch(err){
                alert(err)
           }
       })();
    },[isAddBorrowRecordModalVisible])

    useEffect(()=>{
        //cal total
        let total=0;
        for (b of liBorrows){
            total+=b.amount;
        }
        setTotalAmount(total);
    },[liBorrows])
  
    const deleteBorrowHandler=(delItem)=>{
        const deleteOp=   (async()=>{
            try{
                const db =await SQLite.openDatabaseAsync('example.db');
                result =await  db.runAsync('DELETE FROM borrows WHERE id=?',delItem.id);
                setLiBorrows(liBorrows.filter((item)=>item.id!=delItem.id));
                console.log(liBorrows)
            }
            catch(err){
                alert(err)
            }
            
        });
        
        const db = SQLite.openDatabaseSync('example.db');
        delItemRelatedFdObj =db.getFirstSync('SELECT * FROM friends WHERE id=?',delItem.linkedFriendId);

        Alert.alert('Are You Sure you want to delete the following record?', `
            \n Name: ${delItemRelatedFdObj.name}
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
    const deleteAllBorrowHandler=()=>{
        const deleteOp=   (async()=>{
            try{
                const db =await SQLite.openDatabaseAsync('example.db');
                result =await  db.runAsync('DELETE FROM borrows');
                setLiBorrows([]);
            }
            catch(err){
                alert(err)
            }
            
        });
        Alert.alert('WARNING', `Are You Sure you want to delete ALL Borrow record?\n\n (THIS CANNOT BE UNDONE)
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
                    This is Borrow Screen
                </Text> */}

                <View style={styles.btnContainer}>
                    <Button title=">ADD BORROW RECORDS<" color={Platform.OS==="ios"?"#ffffff":"#000000"}   onPress={()=>setIsAddBorrowRecordModalVisible(true)}/>
                </View>
                
                
                {liBorrows.length!==0?<Text style={styles.listGuideTxt}>
                    Your borrow history are shown below:
                </Text>:
                <BorrowListEmpty/>}
                <FlatList
                    data={liBorrows}
                    renderItem={(itemData)=>{
          
                            return <Borrow borrow={itemData.item} deleteBorrowHandler={()=>deleteBorrowHandler(itemData.item)}/>
                               
                    }}
                 
                    
                    // ListFooterComponent={ }
         
                />
               {liBorrows.length===0?null:<BorrowTotalFooter amount={totalAmount} deleteAllBorrowHandler={deleteAllBorrowHandler}/>} 
                <AddBorrowRecordModal vis={isAddBorrowRecordModalVisible} closeModal={()=>setIsAddBorrowRecordModalVisible(false)}/>
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
        borderColor:"red",
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