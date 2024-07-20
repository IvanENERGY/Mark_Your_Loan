import { NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Entypo from '@expo/vector-icons/Entypo'
import { FontAwesome5 } from '@expo/vector-icons';
import { BorrowScreen } from './screens/BorrowScreen'
import { FriendsScreen } from './screens/FriendsScreen'
import { HelpPayScreen } from './screens/HelpPayScreen'
import { createContext, useState } from 'react';
import { FriendNavStack } from './FriendNavStack';
import { Pressable, Text, View } from 'react-native';


const Tab= createBottomTabNavigator()
export const dbTableContext=createContext();

import 'react-native-reanimated'
export default  function App(){


const [liFriends,setLiFriends]=useState([]);
const [liBorrows,setLiBorrows]=useState([]);
const [liHelpPays,setLiHelpPays]=useState([]);


return(
  <dbTableContext.Provider value={[liFriends,setLiFriends,liBorrows,setLiBorrows,liHelpPays,setLiHelpPays]}>
  <View style={{flex:1}}>
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
      // headerRight:()=>
      //   (
      //   <Pressable style={{padding:10,margin:5}} >
      //     <Entypo name="info-with-circle" size={30} color="white" />
      //   </Pressable>
      //   )
      
      }
       
    }
    // sceneContainerStyle={{backgroundColor:'#D4E7FF'}}
    initialRouteName='Friends'
    >
      
      <Tab.Screen name="Borrow" component={BorrowScreen}  options={{
        tabBarLabel:"Borrow From Friends",
        tabBarIcon:({color})=><Entypo name="arrow-bold-down" size={24} color={color}/>,
        headerTitle:"⬇️ Borrow From Friends",
        tabBarActiveTintColor:"red"

      }}/>
      <Tab.Screen name="Friends" component={FriendNavStack} options={{
        tabBarLabel:"My Friends",
        tabBarIcon:({color})=><FontAwesome5 name="user-friends" size={24} color={color} />,
        headerTitle:"👥 My Friends",
        headerShown:false

      }}/>
      <Tab.Screen name="HelpPay" component={HelpPayScreen} options={{
        tabBarLabel:"Help Friends Pay",
        tabBarIcon:({color})=><Entypo name="arrow-bold-up" size={24} color={color}/>,
        headerTitle:"⬆️ Help Friends Pay",
        tabBarActiveTintColor:"green",
       
      }}/> 
      
    </Tab.Navigator>
    
  </NavigationContainer>
 
  </View>
  </dbTableContext.Provider>
)
}
