import { useContext, useState ,useEffect,useRef} from "react";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Platform,Button,Modal,View,Text,StyleSheet,Pressable ,Alert} from "react-native";
import {Picker} from '@react-native-picker/picker';
import { dbTableContext } from "../App";
import * as SQLite from 'expo-sqlite';
export const DeleteFriendModal=(props)=>{
    const [liFriends,setLiFriends,liBorrows,setLiBorrows,liHelpPays,setLiHelpPays]=useContext(dbTableContext);
    const [selectedFdId,setSelectedFdId]=useState("");

    useEffect(()=>{

        (async()=>{
            //populate list
            const db =await SQLite.openDatabaseAsync('example.db');
            result =await  db.getAllAsync('SELECT * FROM friends');
            console.log(result);
            setLiFriends(result);
            //set Selected
            // if(result.length>0){
            //     setSelectedFdId(result[result.length-1].id);
            // }
            
        })();
    },[props.vis]);

    const onSubmitHandler=()=>{
        console.log('deleting',selectedFdId);
        let deletedFdName='';
        for(f of liFriends){
            if (f.id===selectedFdId){
                deletedFdName=f.name
                break;
            }
        }

        Alert.alert('WARNING', `Are You Sure you want to delete ${deletedFdName}?\n\nALL related borrows and helping records would be deleted!\n\n (THIS CANNOT BE UNDONE)
            `, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'YES', onPress: () =>deleteOp() },
          ]);


        const deleteOp=(async()=>{
            try{
                const db =await SQLite.openDatabaseAsync('example.db');
                result =await  db.execAsync(`
                    DELETE FROM borrows WHERE linkedFriendId=${selectedFdId};
                    DELETE FROM helpPays WHERE linkedFriendId=${selectedFdId} ;
                    DELETE FROM friends WHERE id=${selectedFdId}
                    `);
                    
                setLiBorrows(liBorrows.filter((item)=>item.linkedFriendId!=selectedFdId));
                setLiHelpPays(liHelpPays.filter((item)=>item.linkedFriendId!=selectedFdId));
                setLiFriends(liFriends.filter((item)=>item.id!=selectedFdId));

                props.closeModal();
            }
            catch(err){
                alert(err)
            }
            
        });


    }
    useEffect(()=>{
        if(liFriends.length>0){
            setSelectedFdId(liFriends[liFriends.length-1].id);
        }
        else{
            setSelectedFdId("");
        }
     
    },[liFriends])


    // useEffect(()=>{
    //     console.log('newselected',selectedFdId);
    // },[selectedFdId])


    return ( <Modal visible= {props.vis} transparent={true} animationType="slide" > 
             
                <View style={styles.mainContainer}> 
                    
                    <View style={styles.titleContainer}>
                        <Text style={[styles.instructionText,styles.modalTitleText]}>DELETE FRIEND</Text>
                        <Pressable onPress={props.closeModal}>
                            <Text style={styles.closeModalCross}><AntDesign name="closecircle" size={35} color="red" /></Text>
                        </Pressable>
                    </View>
                    
                    
                    
                        <Text style={styles.instructionText}><AntDesign name="deleteuser" size={24} color="black"  />Who do you want to delete? </Text>
                        <Picker
                            selectedValue={selectedFdId}
                            onValueChange={(itemValue, itemIndex) =>{
                                setSelectedFdId(itemValue);
                                console.log('selectedfdid',itemValue)
                            }
                            }
                            style={styles.picker}
                            placeholder="Select A Friend"
                        >
                            {
                                liFriends.map(item=>
                                    <Picker.Item label={item.name} value={item.id} key={item.id}/>
                                )
                            }
                        </Picker>
                    
                     
                        
                    <Button title="DELETE SELECTED FRIEND" color="red" onPress={onSubmitHandler} disabled={selectedFdId===""}/>
                
                </View>       
               
            </Modal>
              
            )
}
const styles = StyleSheet.create({

    mainContainer:{
        height:"auto",
        width:'98%',
        backgroundColor:'#ffffff',
        marginVertical:'auto',
        borderColor:"black",
        borderWidth:4,
        borderRadius:15,
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
        ),
        padding:5,
        
        alignSelf:'center',
        justifyContent:'flex-start',
        
      
    },
     titleContainer:{
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
        margin:10,
  
    

    },
    modalTitleText:{
        textDecorationLine:"underline",
        padding:5,
        color:'red',
   
  
    },
    instructionText:{
        textAlign:"center",
        fontWeight:'bold',
        fontSize:20,

    },
    input:{
        fontWeight:'bold',
        fontSize:20,
        margin:10,
        padding:10,
        borderColor:"black",
        borderWidth:1,
        borderRadius:15,
        textAlign:'center'
    },
    picker:{
        fontSize:20,
        borderColor:"black",
        borderWidth:1,
        borderRadius:15,
        textAlign:'center',
        margin:10,
        
    },
   

    icon:{
        width:'100%',
        height:'100%',
        alignSelf:'center',
        position:'absolute',

        opacity:0.1,
        zIndex:-1
        
    },
    errorText:{
        textAlign:'center',
        color:'red',
        fontSize:15,
        marginBottom:10,
        fontWeight:'bold'
        
    }

})