import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FriendsScreen } from "./screens/FriendsScreen";
import { FriendDetailScreen } from "./screens/FriendDetailScreen";
import { Pressable, View } from "react-native";
import Entypo from '@expo/vector-icons/Entypo'
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { AppSettingModal } from "./components/AppSettingModal";
import { useTranslation } from 'react-i18next';


const Stack = createNativeStackNavigator()



export const FriendNavStack=()=>{

    const [isAppSettingVis,setIsAppSettingVis]=useState(false);
    const {t}=useTranslation();
    
    return(
      <>
    <AppSettingModal vis={isAppSettingVis} closeModal={()=>setIsAppSettingVis(false)}/>
        <Stack.Navigator initialRouteName="FriendScreen"screenOptions={
            {
              headerTitleAlign:'center',
              headerStyle:{
                  backgroundColor:'black',
              },
              headerTintColor:'white',
              headerTitleStyle:{
                fontSize:20
              },
              // headerRight:()=>
              //   (
              //   <Pressable style={{padding:10,margin:5}} >
              //     <Entypo name="info-with-circle" size={30} color="white" />
              //   </Pressable>
              //   )
          
            }
        }>
        

        <Stack.Screen name="FriendScreen" component={FriendsScreen} options={
          {
             headerTitle:`👥 ${t('MyFriends')}`,
             headerRight:()=>
              (
                <View style={{marginRight:10}}>
                <Ionicons name="settings" size={25} color="white" onPress={()=>setIsAppSettingVis(true)} />

                </View>
              )
          }
        }
        />
        <Stack.Screen name="FriendDetailScreen" component={FriendDetailScreen} options={
          {
             headerTitle:`👤${t('Details')}`
          }
        }
        />
          
        
        </Stack.Navigator>
        </>
    )
}