import { useTheme } from '@react-navigation/native';
import React from 'react'
import { View, Text ,ScrollView, Image, TouchableOpacity, TextInput} from 'react-native'
import Header from '../../layout/Header';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import FeatherIcon from 'react-native-vector-icons/Feather';
//import { Ionicons } from '@expo/vector-icons';
import { COLORS,FONTS } from '../../constants/theme';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';


const checkoutData = [
    {
        image: IMAGES.map,
        title: "Delivery address",
        text: "123 Main Street, Anytown, USA 12345",
        navigate: "DeliveryAddress"
    },
    {
        image: IMAGES.card2,
        title: "Payment",
        text: "XXXX XXXX XXXX 3456",
        navigate: "Payment"
    },
]

type CheckoutScreenProps = StackScreenProps<RootStackParamList, 'Checkout'>;

const Checkout =  ({navigation} : CheckoutScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    return (
       <View style={{backgroundColor:colors.background,flex:1}}>
            <Header
                title='Checkout'
                leftIcon='back'
                titleRight
            />
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={[GlobalStyleSheet.container, { paddingTop: 10,backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,marginTop:15 }]}>
                    {checkoutData.map((data:any, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate(data.navigate)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderBottomWidth: 1,
                                    marginHorizontal:-15,
                                    paddingHorizontal:15,
                                    borderBottomColor: COLORS.primaryLight,
                                    paddingBottom: 10,
                                    marginTop: 10
                                }}
                                key={index}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10,flex:1 }}>
                                    <View style={{ height: 40, width: 40,borderWidth:1,borderColor:COLORS.primaryLight, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image
                                            style={{ height: 20, width: 20, tintColor: COLORS.primary , resizeMode: 'contain' }}
                                            source={data.image}
                                        />
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: colors.title }}>{data.title}</Text>
                                        <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.text }}>{data.text}</Text>
                                    </View>
                                </View>
                                <FeatherIcon size={22} color={colors.title} name={'chevron-right'} />
                                {/* <Ionicons color={colors.title} name='chevron-forward' size={20}/> */}
                            </TouchableOpacity>
                        )
                    })}
                    <View style={{ marginTop: 20, }}>
                        <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>Additional Notes:</Text>
                        <TextInput
                            style={{
                                ...FONTS.fontRegular,
                                fontSize: 15,
                                color: colors.title,
                                //paddingVertical: 12,
                                //paddingHorizontal: 15,
                                borderBottomWidth:2,
                                borderBottomColor:COLORS.primaryLight,
                                //height: 60,
                                paddingBottom:50,
                                // width: '100%',
                            }}
                            placeholder='Write Here'
                            multiline
                            placeholderTextColor={colors.text}
                        />
                    </View>
                </View>
                <View style={{flex:1}}></View>
                <View style={[GlobalStyleSheet.container, { paddingTop: 10,backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,marginTop:15, }]}>
                    <View>
                        <View style={{borderBottomWidth:1,borderBottomColor:COLORS.primaryLight,marginHorizontal:-15,paddingHorizontal:15,paddingBottom:15,marginTop:5}}>
                            <Text style={[FONTS.fontMedium,{fontSize:16,color:colors.title}]}>Price Details</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5,marginTop:15 }}>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title }}>Price (5 Items)</Text>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title }}>$21299</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title }}>Discount</Text>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title }}>$4299</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title }}>Delivery Charges</Text>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color:COLORS.success }}>Free Delivery</Text>
                        </View>
                        <View style={{borderTopWidth:1,borderTopColor:COLORS.primaryLight,marginHorizontal:-15,paddingHorizontal:15,paddingTop:15,paddingBottom:5,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text style={[FONTS.fontMedium,{fontSize:16,color:colors.title}]}>Price Details</Text>
                            <Text style={[FONTS.fontMedium,{fontSize:16,color:COLORS.success}]}>$17299</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container,{paddingHorizontal:0,paddingBottom:0}]}>
                <View style={{height:88,width:'100%',backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,justifyContent:'center',paddingHorizontal:15}}>
                    <Button
                        title='Submit Order'
                        color={COLORS.secondary}
                        text={COLORS.title}
                        onPress={() => navigation.navigate('Myorder')}
                    />
                </View>
            </View>
       </View>
    )
}

export default Checkout