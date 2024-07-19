import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FriendsScreen } from "./screens/FriendsScreen";
import { FriendDetailScreen } from "./screens/FriendDetailScreen";
import { Pressable } from "react-native";
import Entypo from '@expo/vector-icons/Entypo'
const Stack = createNativeStackNavigator()

export const FriendNavStack=()=>{

    return(
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
             headerTitle:"👥 My Friends"
          }
        }
        />
        <Stack.Screen name="FriendDetailScreen" component={FriendDetailScreen} options={
          {
             headerTitle:"👤Details"
          }
        }
        />
          
        
        </Stack.Navigator>
    )
}