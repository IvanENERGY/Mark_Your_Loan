import { DarkTheme, NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Entypo from '@expo/vector-icons/Entypo'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { BorrowScreen } from './screens/BorrowScreen'
import { FriendsScreen } from './screens/FriendsScreen'
import { HelpPayScreen } from './screens/HelpPayScreen'
import { createContext, useEffect, useState } from 'react';
import { FriendNavStack } from './FriendNavStack';
import { Pressable,  Text, View } from 'react-native';
import { Switch } from 'react-native-switch';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab= createBottomTabNavigator()
export const dbTableContext=createContext();
export const appContext=createContext();
import './translation'
import 'react-native-reanimated'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import { AppSettingModal } from './components/AppSettingModal';

export default  function App(){


const [liFriends,setLiFriends]=useState([]);
const [liBorrows,setLiBorrows]=useState([]);
const [liHelpPays,setLiHelpPays]=useState([]);

const [isEn,setIsEn]=useState(true);
const {t}=useTranslation();
const [isAppSettingVis,setIsAppSettingVis]=useState(false);
useEffect(()=>{
  (async()=>{
    try{
      const value=await AsyncStorage.getItem("isEn");
      if(value!==null){
        //isEn stored before
        if(value==='0'){
          console.log("lang record is0")
          setIsEn(false);
          i18n.changeLanguage("cn");
        }
        else if (value==='1'){
          console.log("lang record is1")
          setIsEn(true);
          i18n.changeLanguage("en");
        }
      }
      else{
        console.log("lang record not found")
        setIsEn(true);
        i18n.changeLanguage("en");
      }

    }catch(err){
      console.log(err)
    }
  })();
},[])


return(
  <dbTableContext.Provider value={[liFriends,setLiFriends,liBorrows,setLiBorrows,liHelpPays,setLiHelpPays]}>
  <appContext.Provider value={[isEn,setIsEn]}>

  <View style={{flex:1}}>
  <AppSettingModal vis={isAppSettingVis} closeModal={()=>setIsAppSettingVis(false)}/> 
  <NavigationContainer >
 
  <Tab.Navigator 
      screenOptions={
      {
      tabBarLabelPosition:"below-icon", //beside icon usually for tablets
      tabBarShowLabel:true, //show text of not
      tabBarActiveTintColor:"yellow",
      tabBarInactiveTintColor:"lightblue",
      tabBarActiveBackgroundColor:"black",
      tabBarInactiveBackgroundColor:"black",
      headerTitleAlign:"center",
      headerStyle:{
        backgroundColor:"black"
      },
      headerTitleStyle:{
        fontSize:25
      },
      headerTintColor:"white",
      headerRight:()=>
        (
          <View style={{marginRight:10}}>
          <Ionicons name="settings" size={25} color="white" onPress={()=>setIsAppSettingVis(true)} />

          </View>
        )
      
      }
       
    }
    // sceneContainerStyle={{backgroundColor:'#D4E7FF'}}
    initialRouteName='Friends'
    >
      
      <Tab.Screen name="Borrow" component={BorrowScreen}  options={{
        tabBarLabel:t('BorrowFromFriends'),
        tabBarIcon:({color})=><Entypo name="arrow-bold-down" size={24} color={color}/>,
        headerTitle:`⬇️${t('BorrowFromFriends')}`,
        headerTitleStyle:{
          fontSize:20
        },
        tabBarActiveTintColor:"red"

      }}/>
      <Tab.Screen name="Friends" component={FriendNavStack} options={{
        tabBarLabel:(t("MyFriends")),
        tabBarIcon:({color})=><FontAwesome5 name="user-friends" size={24} color={color} />

        ,
        headerTitle:"👥 My Friends",
        headerShown:false

      }}/>
      <Tab.Screen name="HelpPay" component={HelpPayScreen} options={{
        tabBarLabel:t('HelpFriendsPay'),
        tabBarIcon:({color})=><Entypo name="arrow-bold-up" size={24} color={color}/>,
        headerTitle:`⬆️${t('HelpFriendsPay')}`,
        headerTitleStyle:{
          fontSize:20
        },
        tabBarActiveTintColor:"green",
       
      }}/> 
      
    </Tab.Navigator>
    
  </NavigationContainer>
 
  </View>
  </appContext.Provider>
  </dbTableContext.Provider>
)
}
