import { View, Text,  Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../../constants/Images';
import { COLORS ,FONTS} from '../../constants/theme';
import Button from '../Button/Button';
import Input from '../Input/Input';
import ButtonOutline from '../Button/ButtonOutline';
import Accordion from 'react-native-collapsible/Accordion';


type Props = {
    component ?: any,
    Payment ?: any,
    netbanking ?: any,
}

const PaymentAccordion = ({component ,Payment,netbanking} : Props)=> {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;
    
    const [activeSections, setActiveSections] = useState([0]);

    const setSections = (sections:any) => {
        setActiveSections(
            sections.includes(undefined) ? [] : sections
        );
    };

    const SECTIONS = [
        {
            icon: IMAGES.dollar,
            title: 'Cash on Delivery(Cash/UPI)',
            content: 'Carry on your cash payment..\nThanx!',
        },
        {
            icon: IMAGES.payment,
            title: 'Google Pay/Phone Pay/BHIM UPI',
            content: 'Your UPI ID Will be encrypted and is 100% safe with us.',
            component: true
        },
        {
            icon: IMAGES.folder,
            title: 'Payments/Wallet',
            payment: true
        },
        {
            icon: IMAGES.bank,
            title: 'Netbanking',
            netbanking: true,
        },
    ];


    const AccordionHeader = (item:any, _:any ,isActive:any) => {

        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 15
            }}>
                <Image
                    style={{
                        height: 20,
                        width: 20,
                        resizeMode: 'contain',
                        tintColor: COLORS.primary,
                        marginRight: 10,
                    }}
                    source={item.icon}
                />
                <Text style={[FONTS.fontMedium, { fontSize: 14, color: colors.title, flex: 1 }]}>{item.title}</Text>
                <View
                    style={{
                        //borderWidth: 1,
                        backgroundColor:COLORS.primaryLight,
                        width: 24,
                        height: 24,
                        borderRadius: 50,
                        //borderColor: theme.dark ? COLORS.white : colors.borderColor,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <View style={[{
                        width: 14,
                        height: 14,
                        backgroundColor:COLORS.primaryLight,
                        borderRadius: 50
                    }, isActive == true && {
                        backgroundColor: COLORS.primary
                    }]}></View>
                </View>
            </View>
        )
    }

    const AccordionBody = (item:any, _:any, isActive:any) => {
        return (
            <View style={{
                borderTopWidth: 1,
                borderTopColor:  '#CCCCCC',
                paddingVertical: 10,
                paddingHorizontal: 15
            }}>
                {item.component ?

                    <View>
                        {/* <Text style={{ ...FONTS.fontMedium, fontSize: 13, color: colors.title, marginBottom: 5 }}>Link via UPI</Text> */}
                        <Input
                            inputBorder
                            placeholder='Link via UPI'
                            onChangeText={(value) => console.log(value)}
                            style={{borderColor:COLORS.primaryLight, paddingLeft:0}}
                        />
                        <View style={{ marginTop: 15 }}>
                            <Button
                                //btnRounded
                                title={"Continue"}
                                color={colors.text}
                                text={ COLORS.white}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10, marginLeft: 10,paddingBottom:10 }}>
                            <Image
                                style={{ height: 18, width: 18, resizeMode: 'contain',tintColor:COLORS.primary }}
                                source={IMAGES.shieldcheck}
                            />
                            <Text style={{ ...FONTS.fontRegular, fontSize: 13, color: colors.title }}>{item.content}</Text>
                        </View>
                    </View>
                    :
                    item.payment ?
                        <View>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 13, color:COLORS.primary, marginBottom: 5 }}>Link Your Wallet</Text>
                            <Input
                                inputBorder
                                placeholder='+91'
                                onChangeText={(value) => console.log(value)}
                                style={{borderColor:COLORS.primaryLight, paddingLeft:0}}
                            />
                            <View style={{ marginTop: 15, marginBottom: 10 }}>
                                <Button
                                    //btnRounded
                                    title={"Continue"}
                                    color={colors.text}
                                    text={ COLORS.white}
                                />
                            </View>
                        </View>
                        :
                        item.netbanking ?
                            <View style={{ marginVertical: 10 }}>
                                <ButtonOutline
                                    color={theme.dark ? COLORS.white :COLORS.primary}
                                    title={"Netbanking"}
                                />
                            </View>
                            :
                            <Text style={[FONTS.fontSm, { color: colors.text, lineHeight: 20 }]}>{item.content}</Text>
                }
            </View>
        )
    }

    return (
        <>
            <Accordion
                sections={SECTIONS}
                duration={300}
                sectionContainerStyle={{
                    //borderWidth: 1,
                    //borderColor: theme.dark ? COLORS.white : colors.borderColor,
                    marginBottom: 15,
                    //paddingHorizontal: 20,
                    //borderRadius: 10,
                    backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card
                }}
                activeSections={activeSections}
                onChange={setSections}
                touchableComponent={TouchableOpacity}
                renderHeader={AccordionHeader}
                renderContent={AccordionBody}
            />
        </>
    );
}

export default PaymentAccordion