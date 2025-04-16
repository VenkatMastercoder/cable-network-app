import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Text,TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import { GlobalStyleSheet } from '../../constants/StyleSheet';
//import FeatherIcon from 'react-native-vector-icons/Feather';
import { Feather } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';


const ArrivalData = [
    {
        title: "All",
        active: true,
    },
    {
        title: "Child",
    },
    {
        title: "Man",
    },
    {
        title: "Woman",
    },
    {
        title: "Dress",
    },
    {
        title: "unisex",
    },
  
  ]

const Search2Data = [
    {
        title:"iPhone Mobile"
    },
    {
        title:"Headphone"
    },
]
const SearchData = [
    {
        title: "Mobiles",
    },
    {
        title: "Electronics",
    },
    {
        title: "Camera",
    },
    {
        title: "Headphone",
    },
    {
        title: "TVs & LED",
    },
    {
        title: "Furniture",
    },
    {
        title: "Mobiles",
    },
    {
        title: "Electronics",
    },
    {
        title: "Camera",
    },
    {
        title: "Headphone",
    },
    {
        title: "TVs & LED",
    },
    {
        title: "Furniture",
    },
  
  ]

const Search = ({navigation} : any)  => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    //const navigation = useNavigation();

    const [items, setItems] = useState(SearchData);

    const removeItem = () => {
        setItems([]);
    };

  return (
    <View style={{backgroundColor:colors.background,flex:1}}>
        <View style={[GlobalStyleSheet.container,{height:60,backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,justifyContent:'center',borderBottomWidth:1,borderBottomColor:COLORS.primaryLight}]}>
            <View style={[GlobalStyleSheet.row,{}]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        // height:48,
                        // width:48,
                        borderRadius:8,
                        //backgroundColor:theme.dark ? 'rgba(255,255,255,0.10)':colors.title,
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                >
                        <Feather size={24} color={colors.text} name={'arrow-left'} />
                    {/* <Feather name='chevron-left' size={24} color={theme.dark ? COLORS.white :colors.card}/> */}
                </TouchableOpacity>
                <View style={{flex:1}}>
                    <TextInput
                        placeholder='Search Best items for You'
                        placeholderTextColor={colors.text}
                        style={[FONTS.fontRegular,{
                        height:48,
                        width:'100%',
                        //borderWidth:1,
                        borderColor:colors.border,
                        borderRadius:8,
                        paddingHorizontal:20,
                        color:colors.title,
                        fontSize:16
                        }]}
                    />
                </View>
            </View>
        </View>
        <View style={[GlobalStyleSheet.container,{paddingTop:0}]}>
            <View style={{}}>
                <View style={{backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,marginHorizontal:-15,paddingHorizontal:15,marginBottom:15}}>
                    {Search2Data.map((data,index) => {
                        return(
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => navigation.navigate('ProductsDetails')}
                                key={index} 
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'space-between',
                                    paddingVertical:15,
                                    borderBottomWidth:1,
                                    borderBottomColor:COLORS.primaryLight
                                }}
                            >
                                <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                    <Image
                                        style={{height:20,width:20,resizeMode:'contain'}}
                                        source={IMAGES.timer}
                                    />
                                    <Text style={[FONTS.fontRegular,{fontSize:18,color:colors.title}]}>{data.title}</Text>
                                </View>
                                <View>
                                    <Feather size={24} color={colors.text} name={'arrow-up-right'} />
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                {items.length > 0 &&
                    <View>
                        <View style={[GlobalStyleSheet.row,{alignItems:'center',justifyContent:'space-between',backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,marginHorizontal:-15,paddingHorizontal:15,paddingVertical:15,borderBottomWidth:1,borderBottomColor:COLORS.primaryLight}]}>
                            <Text style={[FONTS.fontMedium,{fontSize:16,color:colors.title}]}>Discover More</Text>
                            <TouchableOpacity
                                 onPress={() => removeItem()}
                                 activeOpacity={0.5}
                            >
                                <Text style={[FONTS.fontRegular,{fontSize:12,color:COLORS.primary}]}>Clear All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',flexWrap:'wrap',backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,marginHorizontal:-15,paddingHorizontal:15,paddingVertical:20 }}>
                            {items.map((data:any, index:any) => {
                                return (
                                    <View key={index} style={{ paddingVertical: 5 ,borderWidth:1,paddingHorizontal:15,borderColor:COLORS.primaryLight,marginBottom:5,marginRight:5}}>
                                        <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>{data.title}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                }
            </View>
        </View>
    </View>
  )
}

export default Search