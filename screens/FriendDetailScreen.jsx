import {View , Text, FlatList, StyleSheet} from "react-native"
import { dbTableContext } from "../App";
import { useContext, useState ,useEffect} from "react";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import Entypo from '@expo/vector-icons/Entypo';
import { useTranslation } from 'react-i18next';
import * as SQLite from 'expo-sqlite';
import { Borrow2 } from "../components/Borrow2";
import { HelpPay2 } from "../components/HelpPay2";

export const FriendDetailScreen=({route})=>{
    const [borrowAmount,setBorrowAmount]=useState(0);
    const[helpPayAmount,setHelpPayAmount]=useState(0);
    const friend=route.params;
    const [liFriends,setLiFriends,liBorrows,setLiBorrows,liHelpPays,setLiHelpPays]=useContext(dbTableContext);

    const [filteredLiBorrows,setFilteredLiBorrows]=useState([]);
    const [filteredLiHelpPays,setFilteredLiHelpPays]=useState([]);
    const {t}=useTranslation();

    useEffect(()=>{
        (async()=>{
            try{
                const db =await SQLite.openDatabaseAsync('example.db');
                const resLiBorrows =await db.getAllAsync('SELECT * FROM borrows WHERE linkedFriendId=?',friend.id);
                setFilteredLiBorrows(resLiBorrows.reverse());

                const resLiHelpPays =await db.getAllAsync('SELECT * FROM helpPays WHERE linkedFriendId=?',friend.id);
                setFilteredLiHelpPays(resLiHelpPays.reverse());
           }
           catch(err){
                alert(err)
           }
       })();
    },[liBorrows,liHelpPays])

    useEffect(()=>{
        let bTotal=0;
        for (b of filteredLiBorrows){
            bTotal+=b.amount;
        }
        setBorrowAmount(bTotal);
        let hTotal=0;
        for (h of filteredLiHelpPays){
            hTotal+=h.amount;
        }
        setHelpPayAmount(hTotal);

    },[filteredLiBorrows,filteredLiHelpPays])



    return(
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    
                    <Text style={styles.nameTxt}>{friend.name.toUpperCase()} {t("wantstotellyou")}💬 </Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.amtTxt}>{borrowAmount>helpPayAmount?<FontAwesome5 name="angry" size={25} color="red" />:<Entypo name="emoji-happy" size={25} color="green" />}</Text> 
                        <Text style={styles.amtTxt}>{borrowAmount>helpPayAmount?t("YouOweme"):t("HeOrSheOwesYou")}</Text>
                        <Text style={styles.amtTxt}>$ {Math.abs(helpPayAmount-borrowAmount)}</Text>
                    </View>
                </View>
                <View style={{borderBottomColor:'black',borderWidth:1,width:'100%'}}></View>
                <View style={styles.borrowsContainer}>
                    <Text>
                        {t("Borrowrecordsareshownbelow")}
                    </Text>
                    <FlatList
                    data={filteredLiBorrows}
                    renderItem={(itemData)=>{
                        return <Borrow2 borrow={itemData.item}/>
                        
                    }}
                    ListHeaderComponent={<Text style={styles.flatListHeaderFooterTxt}>-------------{t('StartOfList')}-------------</Text>}
                    ListFooterComponent={<Text style={styles.flatListHeaderFooterTxt}>-------------{t('EndOfList')}-------------</Text>}
                    ListEmptyComponent={<Text style={[styles.flatListHeaderFooterTxt,{margin:10}]}>{t('NoRecordsFound')}</Text>}
                    />
                    <View style={styles.totalBox}>
                        <Entypo name="arrow-bold-down" size={25} color="red"/>
                        <Text style={styles.amtTxt}> {t('Total')} </Text>
                        <Text style={styles.amtTxt}> ${borrowAmount}</Text>
                        
                    </View>
                </View>
                <View style={{borderBottomColor:'black',borderWidth:1,width:'100%'}}></View>
                <View style={styles.helpsContainer}>
                <Text>
                {t("Helpingrecordsareshownbelow")}
                </Text>
                <FlatList
                data={filteredLiHelpPays}
                renderItem={(itemData)=>{
                    return <HelpPay2 helpPay={itemData.item}/> 
                }}
                ListHeaderComponent={<Text style={styles.flatListHeaderFooterTxt}>-------------{t('StartOfList')}-------------</Text>}
                ListFooterComponent={<Text style={styles.flatListHeaderFooterTxt}>-------------{t('EndOfList')}-------------</Text>}
                ListEmptyComponent={<Text style={[styles.flatListHeaderFooterTxt,{margin:10}]}>{t('NoRecordsFound')}</Text>}
                />
                    <View style={styles.totalBox}>
                        <Entypo name="arrow-bold-up" size={25} color="green"/>
                        <Text style={styles.amtTxt}>{t('Total')}</Text>
                        <Text style={styles.amtTxt}>${helpPayAmount}</Text>
                    </View>

                </View>


            </View>
    )
}
const styles=StyleSheet.create(
    {

        container:{
            flex:1,
            alignItems:'center'    
        },
        infoContainer:{
            flex:1,
            borderColor:'black',
            borderWidth:1,
            width:'80%',
            marginHorizontal:10,
            marginVertical:5,
            paddingHorizontal:10,
            paddingVertical:5
        },
        borrowsContainer:{
            flex:5,
        },
        helpsContainer:{
            flex:5,
        },
        totalBox:{
            flexDirection:'row',justifyContent:'space-between',width:'80%',borderWidth:1
        },
        nameTxt:{
            fontSize:20,
            textAlign:'center',
            fontWeight:'bold'
        },
        amtTxt:{
             fontSize:20,
            textAlign:'center'
        },
        flatListHeaderFooterTxt:{
            fontWeight:'bold',
            textAlign:'center'
        }
    }
)