import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import { COLORS ,FONTS,} from '../../constants/theme'
import { GlobalStyleSheet } from '../../constants/StyleSheet'
import { useTheme } from '@react-navigation/native'
import Button from '../../components/Button/Button'
import { IMAGES } from '../../constants/Images'
import { StackScreenProps } from '@react-navigation/stack'
import { Feather } from '@expo/vector-icons';
//import FeatherIcon from 'react-native-vector-icons/Feather';
import { RootStackParamList } from '../../navigation/RootStackParamList'

const selectData = [
  {
    image:IMAGES.flags1,
    title:"English"
  },
  {
    image:IMAGES.flags2,
    title:"Hindi"
  },
  {
    image:IMAGES.flags3,
    title:"French"
  },
  {
    image:IMAGES.flags4,
    title:"Germany"
  },
  {
    image:IMAGES.flags5,
    title:"Italian"
  },
  {
    image:IMAGES.flags6,
    title:"Thai"
  },
  {
    image:IMAGES.flags7,
    title:"Chinese"
  },
  {
    image:IMAGES.flags8,
    title:"Urdu"
  },
  {
    image:IMAGES.flags9,
    title:"Polish"
  },
  {
    image:IMAGES.flags10,
    title:"Canadian"
  },
  {
    image:IMAGES.flags11,
    title:"Danish"
  },
  {
    image:IMAGES.flags12,
    title:"Japanese"
  },
  {
    image:IMAGES.flags13,
    title:"Dutch"
  },
  {
    image:IMAGES.flags14,
    title:"Turkish"
  },
]

type ChooseLanguageScreenProps = StackScreenProps<RootStackParamList, 'ChooseLanguage'>;

const ChooseLanguage = ({navigation} : ChooseLanguageScreenProps) => {

  const theme = useTheme();
  const { colors }: { colors : any} = theme;

  const [Select, setSelect] = useState(selectData[0]);

  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.primary}}>
        <View style={[GlobalStyleSheet.container,{paddingVertical:20}]}>
            <View style={[GlobalStyleSheet.row,{alignItems:'center',justifyContent:'space-between'}]}>
                <Text style={[FONTS.fontMedium,{fontSize:20,color: COLORS.card}]}>Choose Your Language</Text>
                <TouchableOpacity
                   onPress={() => navigation.navigate('DrawerNavigation',{screen : 'Home'})}
                >
                    <Text style={[FONTS.fontRegular,{fontSize:16,color:COLORS.card,textDecorationLine:'underline'}]}>Skip</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{flex:1,backgroundColor:theme.dark ? colors.background : COLORS.card,borderTopLeftRadius:10,borderTopRightRadius:10}}>
            <View style={[GlobalStyleSheet.container,{flexGrow:1}]}>
                <View style={{borderBottomWidth:2,borderBottomColor:COLORS.primaryLight,paddingBottom:10,marginHorizontal:-15,paddingHorizontal:15}}>
                    <TextInput
                        placeholder='Find a language'
                        style={[FONTS.fontRegular,{fontSize:18,color:colors.title,paddingVertical:5,paddingRight:30}]}
                        placeholderTextColor={COLORS.text}
                    />
                    <TouchableOpacity style={{position:'absolute',top:10,right:15}}>
                        <Image
                        style={{height:20,width:20,tintColor:COLORS.primary}}
                        source={IMAGES.search}
                        />
                    </TouchableOpacity>
                </View>
              <ScrollView showsVerticalScrollIndicator={false} >
                <View style={[GlobalStyleSheet.row,{marginTop:20}]}>
                    {selectData.map((data,index) => {
                        return(
                          <View style={[GlobalStyleSheet.col50, { marginBottom: 15 }]} key={index}>
                              <TouchableOpacity
                                onPress={() => setSelect(data)}
                                activeOpacity={0.5} 
                                style={[{
                                  height:45,
                                  width:'100%',
                                  borderWidth:2,
                                  borderColor:COLORS.primaryLight,
                                  borderRadius:8,
                                  flexDirection:'row',
                                  alignItems:'center',
                                  justifyContent:'space-between',
                                  paddingHorizontal:10
                                },Select === data && {
                                  borderColor:COLORS.primary
                                }]}
                              >
                                <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                  <Image
                                    style={{height:22,width:28,borderRadius:6}}
                                    source={data.image}
                                  />
                                  <Text style={[FONTS.fontRegular,{fontSize:16,color:colors.title}]}>{data.title}</Text>
                                </View>
                                <View style={{height:20,width:20,backgroundColor:Select === data ? COLORS.primary:COLORS.primaryLight,borderRadius:25,alignItems:'center',justifyContent:'center'}}>
                                    <Feather size={14} color={Select === data ? COLORS.card :theme.dark ? COLORS.title:COLORS.card} name={'check'} />
                                </View>
                              </TouchableOpacity>
                          </View>
                        )
                    })}
                </View>
                <TouchableOpacity style={{alignItems:'center',marginTop:5}}>
                  <Text style={[FONTS.fontRegular,{fontSize:16,color:COLORS.primary,textDecorationLine:'underline',textDecorationColor:COLORS.primary}]}>More Language</Text>
                </TouchableOpacity>
              </ScrollView>
              <View style={{}}>
                  <Button
                    title={"Keep Going"}
                    onPress={() => navigation.navigate('SingIn')}
                  />
              </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default ChooseLanguage;