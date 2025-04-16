import { View, Text,  Platform, ScrollView, Image } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import Divider from '../../components/Dividers/Divider';
import Button from '../../components/Button/Button';
import { COLORS, FONTS } from '../../constants/theme';



const CouponsData = [
    {
        title: "Home Decor",
        text: "On minimum purchase of Rs. 1,999",
        offer: "20%\nOff",
    },
    {
        title: "Home Furnishing",
        text: "On minimum purchase of Rs. 2,999",
        offer: "50%\nOff",
    },
    {
        title: "Mobile Accessories",
        text: "On minimum purchase of Rs. 999",
        offer: "25%\nOff",
    },
]

const adsData = [
    {
        image: IMAGES.ads2,
        title: "Get Flat $75 Back",
        offer: "Up to 40% Off",
    },
    {
        image: IMAGES.ads3,
        title: "Get Flat $85 Back",
        offer: "Up to 70% Off",
    },
    {
        image: IMAGES.ads2,
        title: "Get Flat $95 Back",
        offer: "Up to 60% Off",
    },
    {
        image: IMAGES.ads3,
        title: "Get Flat $86 Back",
        offer: "Up to 90% Off",
    },
]

const Coupons = () => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;


    return (
       <View style={{backgroundColor:colors.background,flex:1}}>
            <Header
                title='Coupons'
                leftIcon='back'
                //titleLeft
                titleRight
            />
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={GlobalStyleSheet.container}>
                    <View>
                        {CouponsData.map((data:any, index) => {
                            return (
                                <View key={index} style={{ height: 78, width: '100%', borderRadius: 12, backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 40, marginBottom: 15, }}>
                                    <Text style={{ ...FONTS.fontRegular, fontSize: 16, color: colors.title, marginLeft: 10 }}>{data.offer}</Text>
                                    <View style={{ transform: [{ rotate: '90deg' }], width: 60, position: 'absolute', top: 25, left: 45 }}>
                                        <Divider dashed color={theme.dark ? 'rgba(255,255,255,0.4)':'rgba(0,0,0,0.4)'} />
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: colors.title }}>{data.title}</Text>
                                        <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title, opacity: 0.6 }}>{data.text}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                    <View style={{ marginVertical: 20, marginTop: 10, borderBottomWidth: 1, borderBottomColor:COLORS.primaryLight, marginHorizontal: -15, paddingHorizontal: 15, paddingBottom: 15 }}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 18, color: colors.title }}>Discount On Your Sale</Text>
                    </View>
                    <View style={{ marginHorizontal: -15, borderBottomWidth: 1, borderBottomColor:COLORS.primaryLight, paddingBottom: 20 }}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15, marginRight: 10 }}
                        >
                            {adsData.map((data, index) => {
                                return (
                                    <View key={index} style={{ marginRight: 20 }}>
                                        <Image
                                            style={{ width: 165, height: 93, borderRadius: 12 }}
                                            source={data.image}
                                        />
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                    <View>
                        <View style={{ paddingVertical: 15 }}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 18, color: colors.title }}>Featured Offer For You</Text>
                        </View>
                        <View style={{ marginHorizontal: -15, borderBottomWidth: 1, borderBottomColor:COLORS.primaryLight, paddingBottom: 20 }}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 15, marginRight: 10 }}
                            >
                                {adsData.map((data:any, index) => {
                                    return (
                                        <View key={index} style={{ marginRight: 15, height: 219, width: 188, backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card, borderRadius: 15, alignItems: 'center', paddingTop: 5, paddingBottom: 10 }}>
                                            <Image
                                                style={{ width: 178, height: 100, borderRadius: 12 }}
                                                source={data.image}
                                            />
                                            <View style={{ marginTop: 10, alignItems: 'center' }}>
                                                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.title }}>{data.title}</Text>
                                                <Text style={{ ...FONTS.fontMedium, fontSize: 13, color: COLORS.danger }}>{data.offer}</Text>
                                            </View>
                                            <View style={{ width: '100%', paddingHorizontal: 15, marginTop: 10 }}>
                                                <Button
                                                    title={'Collect Now'}
                                                    size={"sm"}
                                                    text={COLORS.title}
                                                    color={COLORS.secondary}
                                                />
                                            </View>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </ScrollView>
       </View>
    )
}

export default Coupons