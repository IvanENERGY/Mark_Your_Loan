import {View , Text, StyleSheet,Platform} from "react-native"


export const FriendEmptyComponent=()=>{
    return(
            <View style={styles.friendEmptyComponentContainer}>
                <Text style={styles.friendEmptyText}>
                😢Seems you don't have any friends... {"\n"}{"\n"}
                😃Add a new friend to start recording!
                </Text>
                

            </View>
    )
}

const styles=StyleSheet.create({
    friendEmptyComponentContainer:{
        borderColor:"black",
        padding:30,
        borderWidth:2,
        margin:10,
        borderRadius:20,
        backgroundColor:"#ffa7a7",
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
    friendEmptyText:{
        color:'black',
        fontSize:30,
        fontWeight:"bold",
        textAlign:"center"
    }
}
)