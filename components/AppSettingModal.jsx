import { StyleSheet ,Modal,View,Text, Pressable,TextInput,Button,KeyboardAvoidingView, ScrollView,Platform, Linking} from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from "react";
import * as SQLite from 'expo-sqlite';
import { Switch } from "react-native-switch";
import { appContext } from "../App";
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from "i18next";

export const AppSettingModal=(props)=>{
    const [isEn,setIsEn]=useContext(appContext);
    const {t}=useTranslation();
    const languageChangeHandler=()=>{
        
        (async()=>{
            try {
            
                if(isEn===true){//previous is true 
                    //store 0
                    console.log('setting isEn to 0')
                    await AsyncStorage.setItem('isEn', '0');
                    i18n.changeLanguage("cn");
                }
                else{//previous is false
                    //store 1
                    console.log('setting isEn to 1')
                    await AsyncStorage.setItem('isEn', '1');
                    i18n.changeLanguage("en")
                }
                //set opposite
                setIsEn(prev=>!prev);
            } 
            catch (e) {
                console.log(e);
            }
        })();
    }



    return(


            <Modal visible= {props.vis} transparent={true} animationType="slide" >
                <View style={styles.mainContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.instructionText}>{t("AppSettings")}</Text>
                        <Pressable onPress={props.closeModal}>
                            <Text style={styles.closeModalCross}><AntDesign name="closecircle" size={35} color="red" /></Text>
                        </Pressable>
                    </View>           
                    <View style={styles.itemContainer}>
                        <Text style={styles.instructionText}>{t("LanguageSettings")} </Text>
                        <Switch
                            value={isEn}
                            onValueChange={languageChangeHandler}
                            activeText="ENG"
                            inActiveText="中文"
                            activeTextStyle={{fontSize:20,fontWeight:'bold'}}
                            inactiveTextStyle={{fontSize:20,fontWeight:'bold'}}
                            backgroundActive="green"
                            backgroundInactive="green"
                            borderColor='black'
                            
                            barHeight={35}
                            switchWidthMultiplier={3}
                            switchRightPx={5}
                            switchLeftPx={5}
                        />

                    </View>
                     <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>{t('copyright')} </Text>
                        <Text style={styles.footerText} onPress={()=>Linking.openURL('http://ivanenergy.github.io')}>{t('Findmeat')}: http://ivanenergy.github.io </Text>

                    </View>
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
        padding:10,
        alignSelf:'center',
        justifyContent:'space-between'
      
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
    itemContainer:{
        flexDirection:'row',
        justifyContent:"space-between",
        marginHorizontal:10,
        alignItems:'center',
        marginVertical:50,
     
     
    },
    footerContainer:{
        
        margin:0,
        padding:0,
        alignItems:'flex-end'
    },
    footerText:{
        fontSize:10
    }



})