import { StyleSheet ,Modal,View,Text, Pressable,TextInput,Button,KeyboardAvoidingView, ScrollView,Platform,Image} from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import * as SQLite from 'expo-sqlite';
export const AddBorrowRecordModal=(props)=>{
    const [selectedFdId, setSelectedFdId] = useState('');
    const [LiFriends,setLiFriends]=useState([]);
    const [amount,setAmount]=useState('');
    const [comments,setComments]=useState('');


    const[errors,setErrors]=useState({});
    useEffect(()=>{
        setErrors({});
        (async()=>{
            //populate list
            const db =await SQLite.openDatabaseAsync('example.db');
            result =await  db.getAllAsync('SELECT * FROM friends');
            console.log(result);
            setLiFriends(result);
            //set Selected
            if(result.length>0){
                setSelectedFdId(result[result.length-1].id);
            }
            
        })();
    },[props.vis]);

    const validateForm=()=>{    
        let err={};
        if(amount===''){
            err.amount='Error: Amount cannot be empty.';
        }
        if(selectedFdId===''){
            err.selectedFdId='Error: Add a friend from the main page First.';
        }
        setErrors(err);

        return Object.keys(err).length===0;
  
    }
    const onSubmitHandler=()=>{
        if(validateForm()){
            (async()=>{
                try{
                    const db =await SQLite.openDatabaseAsync('example.db');
                    result= await db.runAsync('INSERT INTO borrows (amount,comment,linkedFriendId) VALUES (?,?,?)',amount,comments,selectedFdId);  
                    console.log('insert borrows',result);


                    //reset
                    setAmount('');
                    setComments('');
                    props.closeModal();
                }
                catch(err){
                    alert(err)
                }
       
            // console.log('C**',result);
            })();
        }
    }

    return(
 
            
            <Modal visible= {props.vis} transparent={true} animationType="slide" > 
             
                <View style={styles.mainContainer}> 
                    <KeyboardAvoidingView behavior="padding" >
                    <ScrollView>
                    
                    <View style={styles.titleContainer}>
                        <Text style={[styles.instructionText,styles.modalTitleText]}>ADD BORROWING RECORD</Text>
                        <Pressable onPress={props.closeModal}>
                            <Text style={styles.closeModalCross}><AntDesign name="closecircle" size={35} color="red" /></Text>
                        </Pressable>
                    </View>
                    <Image source={require("../assets/img/borrow.png")} style={styles.icon} resizeMode="contain"/>
                    
                        <Text style={styles.instructionText}><FontAwesome6 name="user-large" size={20} color="black" />Borrow From: </Text>
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
                                LiFriends.map(item=>
                                    <Picker.Item label={item.name} value={item.id} key={item.id}/>
                                )
                            }
                            
                            {/* <Picker.Item label="Jessie" value="Jessie" />
                            <Picker.Item label="Tom" value="Tom" />
                            <Picker.Item label="David" value="David" /> */}


                        </Picker>
                        {errors.selectedFdId?<Text style={styles.errorText}>{errors.selectedFdId}</Text>:null}
                        <Text style={styles.instructionText}><FontAwesome6 name="sack-dollar" size={20} color="black" />Amount: </Text>
                        <TextInput style={styles.input} placeholder="Enter Amount Here..." keyboardType="decimal-pad"  value={amount} onChangeText={setAmount}/>

                        {errors.amount?<Text style={styles.errorText}>{errors.amount}</Text>:null}
                   
                    <View style={{opacity:0.6}}> 
                        <Text style={styles.instructionText}>Comments: (optional) </Text>
                        <TextInput style={[styles.input,{height:100,verticalAlign:"top"}]} placeholder={'(eg. Rent in July)'}  autoCapitalize="sentences" autoCorrect={false} maxLength={50} value={comments} onChangeText={setComments}/>
                    </View>
                    <Button title="ADD THIS BORROW RECORD!" color="red" onPress={onSubmitHandler}/>
                   </ScrollView>
                   </KeyboardAvoidingView>
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