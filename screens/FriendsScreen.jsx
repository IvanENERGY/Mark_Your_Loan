import {View , Text, TextInput,StyleSheet,Button, Platform, FlatList,Pressable} from "react-native"
import { FriendEmptyComponent } from "../components/FriendEmptyComponent"
import { AddNewFriendModal } from "../components/AddNewFriendModal"
import { useContext, useEffect, useRef, useState } from "react"
import * as SQLite from 'expo-sqlite';
import { Friend } from "../components/Friend";
import { dbTableContext } from "../App";
import { FriendTotalFooter } from "../components/FriendTotalFooter";
import { DeleteFriendModal } from "../components/DeleteFriendModal";
import { FriendListHeader } from "../components/FriendListHeader";


export const  FriendsScreen=({navigation})=>{
    const [isAddNewFriendModalVisible,setIsAddNewFriendModalVisible]= useState(false);
    const [liFriends,setLiFriends,liBorrows,setLiBorrows,liHelpPays,setLiHelpPays]= useContext(dbTableContext);
    const [isDeleteFriendModalVisible,setIsDeleteFriendModalVisible]=useState(false);

    useEffect(()=>{
  
        (async()=>{  
    console.log(`--------${Platform.OS}------------`);
         try{
            const db =await SQLite.openDatabaseAsync('example.db');
            console.log('db',db);

            let result= await db.execAsync(`
                DROP TABLE IF EXISTS friends;
                DROP TABLE IF EXISTS borrows;
                DROP TABLE IF EXISTS helpPays;
                `);
            console.log('Dropped Table Friend',result);  

            result= await db.execAsync(`
                            CREATE TABLE IF NOT EXISTS friends (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT NOT NULL);
                            CREATE TABLE IF NOT EXISTS borrows (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, amount REAL NOT NULL,comment TEXT, linkedFriendId INTEGER, FOREIGN KEY(linkedFriendId)REFERENCES friends(id));
                            CREATE TABLE IF NOT EXISTS helpPays (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, amount REAL NOT NULL,comment TEXT, linkedFriendId INTEGER, FOREIGN KEY(linkedFriendId)REFERENCES friends(id));
                            `);
            console.log('Create Table Friends,Borrows,helpPays',result);  

            // result= await db.runAsync('INSERT INTO friends (name) VALUES (?)',  'ivan');  
            // console.log('C**',result);

            // result= await db.runAsync('UPDATE friends SET name = ? WHERE name = ?',  'aaa','ivan');    
            // console.log('U**',result);  
                        
            // result= await db.runAsync('DELETE From friends  WHERE name = ?',  'aaa');    
            // console.log('D**',result);  


            // result =await  db.getAllAsync('SELECT * FROM friends');
            // console.log('R**',result);  
        }
        catch(err){
            alert(err)
        }
console.log("-----------------------\n\n")     
        })();
       
        
    },[])
   
    useEffect(()=>{
        (async()=>{
             try{
            const db =await SQLite.openDatabaseAsync('example.db');
                let table_existed=await db.getFirstAsync(`SELECT count(*) AS count FROM sqlite_master WHERE type='table' AND name='friends';`);
                console.log('tableexist',table_existed.count);
                if(table_existed.count===1){
                    result =await db.getAllAsync('SELECT * FROM friends');
                    console.log('R--',result);
                    setLiFriends(result);
                }
                else{
                    console.log('table not yet initalized')
                }
            }
            catch(err){
               alert(err)
            }
        })();
    },[isAddNewFriendModalVisible,isDeleteFriendModalVisible])



    return(
            
            <View style={styles.screenContainer}>
                {liFriends.length===0?<FriendEmptyComponent/>:null}
                {/* <Text>
                    This is Friends Screen
                </Text> */}
                <View style={styles.btnContainer}>
                    <Button title=">ADD NEW FRIENDS<" color={Platform.OS==="ios"?"#ffffff":"#000000"}   onPress={()=>setIsAddNewFriendModalVisible(true)}/>
                </View>
                {liFriends.length!==0?
                <View>
                    <View style={[styles.btnContainer,{height:50}]}>
                        <Button title=">DELETE FRIEND<" color={Platform.OS==="ios"?"#ffffff":"#000000"}   onPress={()=>setIsDeleteFriendModalVisible(true)}/>
                    </View>
                    <Text style={styles.listGuideTxt}>
                        Your friends are shown below:
                    </Text>
                    <Text style={{fontSize:15,textAlign:'center'}}>[You can press each one to see the borrowing and helping details]</Text>
                </View>
                
                :null}
                 {liFriends.length!==0?
                <FriendListHeader/>
                :null}
                <FlatList
                    data={liFriends}
                    renderItem={(itemData)=>{
                        return (
                        <Pressable onPress={()=>navigation.navigate("FriendDetailScreen",itemData.item)}>
                            <Friend friend={itemData.item} />
                        </Pressable>
                        )
                    }}
                  
                />
                {liFriends.length!==0?
                <FriendTotalFooter/>
                :null}
                <AddNewFriendModal vis={isAddNewFriendModalVisible} closeModal={()=>setIsAddNewFriendModalVisible(false)}/>
                <DeleteFriendModal vis={isDeleteFriendModalVisible} closeModal={()=>setIsDeleteFriendModalVisible(false)}/>
            </View>
       
    )
}
const styles=StyleSheet.create({
    screenContainer:{
        flex:1
    },
    btnContainer:{
        width:'60%',
        borderRadius:14,
        backgroundColor:"#000000",
        borderColor:"yellow",
        borderWidth:5,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        height:50,
        marginVertical:5,
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