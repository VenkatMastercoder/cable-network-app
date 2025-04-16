import { useTheme } from '@react-navigation/native';
import React from 'react'
import { View, Text ,ScrollView,Image, TouchableOpacity} from 'react-native'
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS } from '../../constants/theme';
import CreditCard from '../../components/Card/CreditCard';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import PaymentAccordion from '../../components/Accordion/PaymentAccordion';
import Button from '../../components/Button/Button';

type PaymentScreenProps = StackScreenProps<RootStackParamList, 'Payment'>;

const Payment = ({navigation} : PaymentScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;
    return (
        <View style={{backgroundColor:colors.background,flex:1,}}>
            <Header
                title='Payment'
                leftIcon='back'
                titleRight
            />
            <View 
                style={[GlobalStyleSheet.container,
                    { paddingHorizontal: 15,
                        backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.35,
                        shadowRadius: 6.27,
                        elevation: 5, 
                    }
                 ]}
            >
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                        <View style={{height:18,width:18,borderRadius:30,backgroundColor:COLORS.primary,alignItems:'center',justifyContent:'center'}}>
                            <Text style={[FONTS.fontMedium,{fontSize:10,color:COLORS.card}]}>1</Text>
                        </View>
                        <Text style={[FONTS.fontMedium,{fontSize:13,color:colors.title}]}>Cart</Text>
                    </View>
                    <View style={{height:2,flex:1,backgroundColor:COLORS.primary,marginHorizontal:10}}/>
                    <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                    <View style={{height:18,width:18,borderRadius:30,backgroundColor:COLORS.primary,alignItems:'center',justifyContent:'center'}}>
                            <Text style={[FONTS.fontMedium,{fontSize:10,color:COLORS.card}]}>2</Text>
                        </View>
                        <Text style={[FONTS.fontMedium,{fontSize:13,color:colors.title}]}>Address</Text>
                    </View>
                    <View style={{height:2,flex:1,backgroundColor:COLORS.primary,marginHorizontal:10}}/>
                    <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                        <View style={{height:18,width:18,borderRadius:30,backgroundColor:COLORS.primary,alignItems:'center',justifyContent:'center'}}>
                            <Text style={[FONTS.fontMedium,{fontSize:10,color:COLORS.card}]}>3</Text>
                        </View>
                        <Text style={[FONTS.fontMedium,{fontSize:13,color:colors.title}]}>payment</Text>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={[GlobalStyleSheet.container, { marginTop:15,backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',borderBottomWidth:1,marginHorizontal:-15,paddingHorizontal:15,paddingBottom:15,borderBottomColor:COLORS.primaryLight }}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 18, color: colors.title }}>Credit/Debit Card</Text>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 5
                            }}
                            onPress={() => navigation.navigate('Addcard')}
                        >
                            <Image
                                style={{ height: 14, width: 14, resizeMode: 'contain',tintColor:COLORS.primary }}
                                source={IMAGES.plus}
                            />
                            <Text style={{ ...FONTS.fontMedium, fontSize: 13, color:COLORS.primary }}>Add Card</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20, marginHorizontal: -15 }}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 20, paddingLeft: 15, paddingRight: 15 }}
                        >
                            <CreditCard
                                creditcard
                            />
                            <CreditCard
                               debitcard
                            />
                        </ScrollView>
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container, {padding:0 }]}>
                    <View style={{ marginTop: 30 }}>
                        <PaymentAccordion
                            component
                            Payment
                            netbanking
                        />
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
                        title='Continue'
                        color={COLORS.secondary}
                        text={COLORS.title }
                        onPress={() => navigation.navigate('Checkout')}
                    />
                </View>
            </View>
        </View>
    )
}

export default Payment