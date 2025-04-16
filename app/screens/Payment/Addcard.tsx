import React from 'react'
import { useTheme } from '@react-navigation/native';
import { View, Text,ScrollView } from 'react-native'
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CreditCard from '../../components/Card/CreditCard';
import Input from '../../components/Input/Input';
import { COLORS, FONTS } from '../../constants/theme';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';

type AddcardScreenProps = StackScreenProps<RootStackParamList, 'Addcard'>;

const Addcard = ({navigation} : AddcardScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    return (
       <View style={{flex:1,backgroundColor:COLORS.primary}}>
            <Header
                title='Add Card'
                leftIcon='back'
                titleRight
            />
            <View style={{flex:1}}>
                <View style={[GlobalStyleSheet.container,{zIndex:20}]}>
                    <CreditCard
                        creditCard
                    />
                </View>
            </View>
            <ScrollView contentContainerStyle={{flexGrow:1,backgroundColor:theme.dark ? colors.background :colors.card,borderTopLeftRadius:20,borderTopRightRadius:20,paddingBottom:190}}>
                <View style={[GlobalStyleSheet.container,{marginTop:120}]}>
                    <View style={{ marginBottom: 15, marginTop: 20 }}>
                        <Input
                            inputBorder
                            placeholder='Card Name'
                            onChangeText={(value) => console.log(value)}
                            style={{borderColor:COLORS.primaryLight, paddingLeft:0}}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Input
                            inputBorder
                            placeholder='Card Number'
                            onChangeText={(value) => console.log(value)}
                            style={{borderColor:COLORS.primaryLight, paddingLeft:0}}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 20, paddingRight: 20 }}>
                        <View style={{ marginBottom: 15, width: '50%' }}>
                            <Input
                                inputBorder
                                placeholder='Expiry Date'
                                onChangeText={(value) => console.log(value)}
                                style={{borderColor:COLORS.primaryLight, paddingLeft:0}}
                            />
                        </View>
                        <View style={{ marginBottom: 15, width: '50%' }}>
                            <Input
                                inputBorder
                                placeholder='CVV'
                                onChangeText={(value) => console.log(value)}
                                style={{borderColor:COLORS.primaryLight, paddingLeft:0}}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container,{padding:0}]}>
                <View style={{height:88,width:'100%',justifyContent:'center',paddingHorizontal:15,backgroundColor:theme.dark ? colors.background :colors.card}}>
                    <Button
                        title='Add Card'
                        color={COLORS.secondary}
                        text={colors.title}
                        onPress={() => navigation.navigate('Payment')}
                    />
                </View>
            </View>
       </View>
    )
}

export default Addcard