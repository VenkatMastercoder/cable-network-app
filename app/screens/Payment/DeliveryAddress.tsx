import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react' 
import { View, Text ,ScrollView,Image,TouchableOpacity} from 'react-native'
import { IMAGES } from '../../constants/Images';
import Header from '../../layout/Header';
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
//import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';


const saveData = [
    {
        image: IMAGES.Home4,
        title: "Home Address",
        text: "123 Main Street, Anytown, USA 12345",
    },
    {
        image: IMAGES.map,
        title: "Office Address",
        text: "456 Elm Avenue, Smallville, CA 98765",
    },
    {
        image: IMAGES.Home4,
        title: "Home Address",
        text: "789 Maple Lane, Suburbia, NY 54321",
    },
    {
        image: IMAGES.shop,
        title: "Shop Address",
        text: "654 Pine Road, Countryside, FL 34567",
    },
]


type DeliveryAddressScreenProps = StackScreenProps<RootStackParamList, 'DeliveryAddress'>;

const DeliveryAddress = ({navigation} : DeliveryAddressScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const [isChecked, setIsChecked] = useState(saveData[0]);

    return (
        <View style={{backgroundColor:colors.background,flex:1}}>
            <Header
                title='Delivery Address'
                leftIcon='back'
                titleLeft
                righttitle='4 address'
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
                    <View style={{height:2,flex:1,backgroundColor:colors.title,opacity:.1,marginHorizontal:10}}/>
                    <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                        <View style={{height:18,width:18,borderRadius:30,backgroundColor:COLORS.primaryLight,alignItems:'center',justifyContent:'center'}}>
                            <Text style={[FONTS.fontMedium,{fontSize:10,color:COLORS.title}]}>3</Text>
                        </View>
                        <Text style={[FONTS.fontMedium,{fontSize:13,color:colors.text}]}>payment</Text>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={[GlobalStyleSheet.container, { paddingTop: 10,backgroundColor:theme.dark ? 'rgba(255,255,255,.1)' :colors.card,marginTop:15 }]}>
                    {saveData.map((data, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => setIsChecked(data)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderBottomWidth: 1,
                                    borderBottomColor:COLORS.primaryLight,
                                    paddingBottom: 10,
                                    marginTop: 10
                                }}
                                key={index}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 ,flex:1}}>
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
                                <View
                                    style={[{
                                        //borderWidth: 1,
                                        backgroundColor:COLORS.primaryLight,
                                        width: 24,
                                        height: 24,
                                        borderRadius: 50,
                                        //borderColor: theme.dark ? COLORS.white : colors.borderColor,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // flex:1
                                    },isChecked === data && {
                                        backgroundColor:COLORS.primary
                                    }]}
                                >
                                    <View style={[{
                                        width: 14,
                                        height: 14,
                                        backgroundColor:theme.dark ? colors.background : COLORS.card,
                                        borderRadius: 50
                                    }, isChecked === data && {
                                        backgroundColor: COLORS.card
                                    }]}></View>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                    <TouchableOpacity
                        style={{
                            height: 48,
                            width: '100%',
                            backgroundColor:theme.dark ? colors.background :COLORS.primaryLight,
                            // borderWidth: 1,
                            // borderColor:colors.border,
                            //borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            marginTop: 30
                        }}
                        onPress={() => navigation.navigate('AddDeliveryAddress')}
                    >
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Image
                                style={{ height: 20, width: 20, resizeMode: 'contain', tintColor:COLORS.primary }}
                                source={IMAGES.plus}
                            />
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.title }}>Add Address</Text>
                        </View>
                        <Feather size={22} color={colors.title} name={'chevron-right'} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container,{paddingHorizontal:0,paddingBottom:0}]}>
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
                        text={ COLORS.title}
                        onPress={() => navigation.navigate('Payment')}
                    />
                </View>
            </View>
        </View>
    )
}

export default DeliveryAddress