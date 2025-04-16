import { View, Text,  ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Cardstyle2 from '../../components/Card/Cardstyle2';
import { COLORS, FONTS } from '../../constants/theme';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';


const TrackorderData = [
    {
        image:IMAGES.item05,
        title:"Polka dot wrap blouse dress",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true,
        brand:"#22344862"
    },
]

const btnData = [
    {
        name:"Yes"
    },
    {
        name:"No"
    }
]



type WritereviewScreenProps = StackScreenProps<RootStackParamList, 'Writereview'>;

const Writereview = ({navigation} : WritereviewScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;


    const [isChecked, setIsChecked] = useState(btnData[0]);

    return (
        <View style={{backgroundColor:colors.background,flex:1}}>
            <Header
                title='Write Review'
                leftIcon='back'
                titleRight
            />
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={[GlobalStyleSheet.container,{paddingTop:0,marginVertical:10,paddingBottom:0}]}>
                    <View style={{
                        marginHorizontal: -15
                    }}>
                        {TrackorderData.map((data:any, index) => {
                            return (
                                <View key={index}>
                                    <Cardstyle2
                                        key={index}
                                        title={data.title}
                                        price={data.price}
                                        delevery={data.delevery}
                                        image={data.image}
                                        offer={data.offer}
                                        removebottom
                                        brand={data.brand}
                                        //onPress={() => navigation.navigate('ProductsDetails')}
                                    />
                                </View>
                            )
                        })}
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{paddingTop:0,backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,}]}>
                    <View style={{ marginTop: 15,borderBottomWidth:1,borderBottomColor:COLORS.primaryLight,marginHorizontal:-15,paddingHorizontal:15,paddingBottom:15,marginBottom:10 }}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: colors.title }}>Overall Rating</Text>
                    </View>
                    <Text style={{ ...FONTS.fontRegular, fontSize: 16, color:colors.title, marginTop: 5 }}>Your Average Rating Is 4.0</Text>
                    {/* <Rating
                        ratingCount={5}
                        imageSize={50}
                        style={{ paddingTop: 20 }}
                    /> */}
                    <AirbnbRating
                        count={5}
                        reviews={[]}
                        defaultRating={4}
                        size={30}
                        ratingContainerStyle={{height:25,alignItems:'flex-start'}}
                    />
                    <View style={{ marginBottom: 15, marginTop: 30 }}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 12, color:COLORS.primary, marginBottom: 5 }}>Review Title</Text>
                        <Input
                            inputBorder
                            defaultValue="Awesome Product"
                            onChangeText={(value) => console.log(value)}
                            style={{borderColor:colors.text, paddingLeft:0,}}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title, marginBottom: 5 }}>Product Review</Text>
                        <Input
                            inputLg
                            inputBorder
                            //defaultValue="Awesome Product"
                            onChangeText={(value) => console.log(value)}
                            style={{borderColor:colors.text, paddingLeft:0,}}
                        />
                    </View>
                    <View>
                        <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>Would you recommend this product to a friend?</Text>
                        <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                            gap:15,
                            marginTop:10
                        }}>
                            {btnData.map((data:any,index:any) => {
                                return(
                                    <View key={index} style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                        <TouchableOpacity
                                            style={[{
                                                backgroundColor:colors.background,
                                                width: 24,
                                                height: 24,
                                                borderRadius: 50,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            },isChecked === data && {
                                                backgroundColor:COLORS.primary
                                            }]}
                                            onPress={() => setIsChecked(data)}
                                        >
                                            <View style={[{
                                                width: 14,
                                                height: 14,
                                                backgroundColor:theme.dark ? colors.background : colors.card,
                                                borderRadius: 50
                                            }, isChecked === data && {
                                                backgroundColor:theme.dark ? colors.background : colors.card
                                            }]}></View>
                                        </TouchableOpacity>
                                        <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: colors.title }}>{data.name}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container,{padding:0}]}>
                <View 
                    style={{
                        height:88,
                        width:'100%',
                        backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,
                        justifyContent:'center',
                        paddingHorizontal:15,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 2,
                            height: 2,
                        },
                        shadowOpacity: .1,
                        shadowRadius: 5,
                    }}
                >
                    <Button
                        title='Save Address'
                        color={COLORS.secondary}
                        text={COLORS.title }
                        onPress={() => navigation.navigate('Myorder')}
                    />
                </View>
            </View>
        </View>
    )
}

export default Writereview