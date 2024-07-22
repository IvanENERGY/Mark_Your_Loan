import { StyleSheet ,Modal,View,Text, Pressable,TextInput,Button,KeyboardAvoidingView, ScrollView,Platform} from "react-native"
import { AntDesign } from '@expo/vector-icons';

import { useState } from "react";
import * as SQLite from 'expo-sqlite';
import { useTranslation } from 'react-i18next';


export const AddNewFriendModal=(props)=>{
    const [friendName, setFriendName]=useState("");

    const [errors,setErrors]=useState({});
    const {t}=useTranslation();
    
    


    const validateForm=()=>{
        let err={};
        if(friendName===""){
            
            err.name=t('ErrorPleaseenterafriendname');
            setErrors(err);
        }
        return Object.keys(err).length===0;
    }


    const addFriendHandler=()=>{
        if(validateForm()){
             console.log('adding'+friendName);
            //add
            (async()=>{
                try{
                    const db =await SQLite.openDatabaseAsync('example.db');
                    result= await db.runAsync('INSERT INTO friends (name) VALUES (?)',  friendName);  
                    console.log(result.changes===1?"Success":"Some error happened (adding friend)");
                }
                catch(err){
                    console.log("Some error happened (adding friend)",err);
                }
                
            })()

            setFriendName("")
            props.closeModal();
        }
        
    }

    return(
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} >
            <ScrollView>
            <Modal visible= {props.vis} transparent={true} animationType="slide" >
                <View style={styles.mainContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.instructionText}>{t("Addanewfriend")}</Text>
                        <Pressable onPress={props.closeModal}>
                            <Text style={styles.closeModalCross}><AntDesign name="closecircle" size={35} color="red" /></Text>
                        </Pressable>
                    </View>           
                    <TextInput style={styles.nameInput} placeholder={t("EnterNameHere")} placeholderTextColor="#bbbbbb"  autoCapitalize="characters" autoCorrect={false} value={friendName} onChangeText={setFriendName}/>
                    {errors.name?<Text style={styles.errTxt}> {errors.name}  </Text>:null}
                    <Button title={t("ADDHIMORHER")+"!"} onPress={addFriendHandler}/>

                </View>
            </Modal>
            </ScrollView>
        </KeyboardAvoidingView>

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
        padding:10,
        alignSelf:'center',
        justifyContent:'flex-start'
      
    },
     titleContainer:{
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
        margin:10

    },
    instructionText:{
        textAlign:"center",
        fontWeight:'bold',
        fontSize:25,

    },
    nameInput:{
        fontWeight:'bold',
        fontSize:25,
        margin:10,
        padding:10,
        borderColor:"black",
        borderWidth:1,
        borderRadius:15,
        textAlign:'center'
    },
    errTxt:{
        color:'red',
        textAlign:'center',
        fontSize:15,
        fontWeight:'bold',
        margin:5,
        padding:5
    }

})