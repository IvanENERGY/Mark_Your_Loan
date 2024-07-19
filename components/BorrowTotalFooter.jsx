import { StyleSheet, View,Text,Platform,Button } from "react-native";

export const BorrowTotalFooter=(props)=>{
    return(

        <View style={styles.borrowFooterContainer}>
            <View style={{flex:3}}>
                <Text style={styles.txt}>BORROW TOTAL:</Text>
            </View>
            <View style={{flex:3}}>
                <Text style={styles.txt}>${props.amount}</Text>
            </View>
    
            <View style={styles.btnContainer}>
                    <Button title="DELETE ALL" color={Platform.OS==='ios'?'white':'red'}  onPress={props.deleteAllBorrowHandler}/>
            </View>
        </View>
    )
};

const styles=StyleSheet.create({

    borrowFooterContainer:{
        borderTopWidth:1,
        borderColor:'black',
        flexDirection:'row',
        borderLeftWidth:15,
        alignItems:'center',
        paddingHorizontal:20,
        paddingVertical:10
  
    },  

    txt:{
        fontSize:20,
        textAlign:'center',
     
    },
    btnContainer:{
   
        borderRadius:14,
        backgroundColor:"red",
        
        flex:5,
        alignSelf:"center",
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
       
    }
})