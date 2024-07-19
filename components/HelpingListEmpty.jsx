import { Text ,StyleSheet,View} from "react-native"

export const HelpingListEmpty=()=>{
    return(
        <View style={styles.container}>
         <Text style={{textAlign:'center',fontSize:20,marginTop:20}}>No helping records are found,{'\n\n'} You can add one by pressing button above</Text>
        </View>
    )
}
const styles=StyleSheet.create({
    borrowRecordEmptyTxt:{
        textAlign:'center',
        fontSize:10
    },
    container:{
        justifyContent:'center',
        alignItems:'center'
    }

    
})