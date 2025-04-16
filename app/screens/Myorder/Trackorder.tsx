import { useTheme } from '@react-navigation/native';
import React from 'react'
import { View, Text,  ScrollView, Image } from 'react-native'
import Header from '../../layout/Header';
import { COLORS,FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Cardstyle2 from '../../components/Card/Cardstyle2';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';

const TrackorderData = [
    {
        image:IMAGES.item9,
        title:'APPLE iPhone 14 (Blue, 128 GB)',
        price:"$179",
        delevery:"FREE Delivery",
        offer:"40% OFF",
        btntitle:'Track Order',
        brand:"#22344862"
    },
]

type TrackorderScreenProps = StackScreenProps<RootStackParamList, 'Trackorder'>;

const Trackorder = ({navigation} : TrackorderScreenProps)  => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    return (
        <View style={{backgroundColor:colors.backround,flex:1}}>
            <Header
                title='Track Order'
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
                                        brand={data.brand}
                                        removebottom
                                        onPress={() => navigation.navigate('ProductsDetails')}
                                    />
                                </View>
                            )
                        })}
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{paddingTop:0,backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card}]}>
                    <View style={{ marginTop: 15, marginBottom: 20,borderBottomWidth:1,borderBottomColor:COLORS.primaryLight,marginHorizontal:-15,paddingHorizontal:15,paddingBottom:15 }}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 18, color: colors.title }}>Track Order</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                        <Image
                            style={{ height: 24, width: 24, resizeMode: 'contain',tintColor:COLORS.primary }}
                            source={IMAGES.check4}
                        />
                        <View style={{padding:10,backgroundColor:COLORS.primary,paddingHorizontal:15,borderRadius:4}}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 16, color:COLORS.card }}>Order Placed<Text style={{ ...FONTS.fontRegular, fontSize: 14, color: 'rgba(255, 255, 255, 0.50)' }}>  27 Dec 2023</Text></Text>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: COLORS.card }}>We have received your order</Text>
                        </View>
                        <View style={{ height: 70, width: 2, backgroundColor:COLORS.primary, position: 'absolute', left: 11, top: 43 }}></View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 30 }}>
                        <Image
                            style={{ height: 24, width: 24, resizeMode: 'contain',tintColor:COLORS.primary }}
                            source={IMAGES.check4}
                        />
                        <View style={{padding:10,backgroundColor:COLORS.primary,paddingHorizontal:15,borderRadius:4}}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 16, color:COLORS.card }}>Order Confirm<Text style={{ ...FONTS.fontRegular, fontSize: 14, color: 'rgba(255, 255, 255, 0.50)' }}>  27 Dec 2023</Text></Text>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: COLORS.card }}>We has been confirmed</Text>
                        </View>
                        <View style={{ height: 63, width: 2, backgroundColor:COLORS.primary, position: 'absolute', left: 11, top: 43 }}></View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 30 }}>
                        <View style={{ height: 24, width: 24,backgroundColor:COLORS.primaryLight, borderRadius: 24 }}>
                        </View>
                        <View style={{padding:10,backgroundColor:colors.background,paddingHorizontal:15,borderRadius:4}}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: colors.title }}>Order Processed<Text style={{ ...FONTS.fontRegular, fontSize: 14, color:COLORS.primary }}>  28 Dec 2023</Text></Text>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title }}>We are preparing your order</Text>
                        </View>
                        <View style={{ height: 60, width: 2, backgroundColor:COLORS.primaryLight, position: 'absolute', left: 11, top: 47 }}></View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 30 }}>
                        <View style={{ height: 24, width: 24,backgroundColor:COLORS.primaryLight, borderRadius: 24 }}>
                        </View>
                        <View style={{padding:10,backgroundColor:colors.background,paddingHorizontal:15,borderRadius:4}}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: colors.title }}>Ready To Ship<Text style={{ ...FONTS.fontRegular, fontSize: 14,color:COLORS.primary }}>  29 Dec 2023</Text></Text>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title }}>Your order is ready for shipping </Text>
                        </View>
                        <View style={{ height: 60, width: 2, backgroundColor:COLORS.primaryLight, position: 'absolute', left: 11, top: 47 }}></View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 30,marginBottom:20 }}>
                        <View style={{ height: 24, width: 24,backgroundColor:COLORS.primaryLight, borderRadius: 24 }}>
                        </View>
                        <View style={{padding:10,backgroundColor:colors.background,paddingHorizontal:15,borderRadius:4}}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: colors.title }}>Out For Delivery<Text style={{ ...FONTS.fontRegular, fontSize: 14, color:COLORS.primary}}>  31 Dec 2023</Text></Text>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title }}>Your order is out for delivery</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Trackorder