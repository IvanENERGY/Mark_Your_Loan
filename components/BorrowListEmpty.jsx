import { Text ,StyleSheet,View} from "react-native"
import { useTranslation } from 'react-i18next';
export const BorrowListEmpty=()=>{
    const {t}=useTranslation();
    return(
        <View style={styles.container}>
         <Text style={{textAlign:'center',fontSize:20,marginTop:20}}>{t('Noborrowrecordsarefound')},{'\n\n'} {t('Youcanaddonebypressingbuttonabove')}</Text>
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