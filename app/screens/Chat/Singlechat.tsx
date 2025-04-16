import { View, Text,  Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { IMAGES } from '../../constants/Images';
import { COLORS,FONTS} from '../../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
// import { Ionicons } from '@expo/vector-icons';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';

const ChatData = [
    {
        id: '1',
        title: 'Good morning!',
        send: false,
    },
    {
        id: '2',
        title: " I'm looking for a new laptop",
        time: "4.40pm",
        send: false,
    },
    {
        id: '3',
        title: 'Good morning!',
        send: true,
    },
    {
        id: '4',
        title: 'Of course, we have a great selection of laptops.',
        time: "4.50pm",
        send: true,
    },
    {
        id: '5',
        title: "I'll mainly use it for work, so something with good processing power and a comfortable keyboard is essential.",
        time: "4.55pm",
        send: false,
    },
    {
        id: '6',
        title: 'Got it!',
        time: "4.56pm",
        send: true,
    },
    {
        id: '7',
        title: 'We have several options that would suit your needs. Let me show you a few models that match your criteria.',
        time: "4.57pm",
        send: true,
    },
    {
        id: '8',
        title: "I'm looking to spend around $800 to $1,000.",
        time: "4.58pm",
        send: false,
    },
    {
        id: '9',
        title: "That's a good budget.I'll show you a few options within that range. Are you interested in Windows or Mac laptops?",
        time: "4.40pm",
        send: true,
    },
    {
        id: '1',
        title: 'Good morning!',
        send: false,
    },
    {
        id: '2',
        title: " I'm looking for a new laptop",
        time: "4.40pm",
        send: false,
    },
    {
        id: '3',
        title: 'Good morning!',
        send: true,
    },
    {
        id: '4',
        title: 'Of course, we have a great selection of laptops.',
        time: "4.50pm",
        send: true,
    },
    {
        id: '5',
        title: "I'll mainly use it for work, so something with good processing power and a comfortable keyboard is essential.",
        time: "4.55pm",
        send: false,
    },
    {
        id: '6',
        title: 'Got it!',
        time: "4.56pm",
        send: true,
    },
    {
        id: '7',
        title: 'We have several options that would suit your needs. Let me show you a few models that match your criteria.',
        time: "4.57pm",
        send: true,
    },
    {
        id: '8',
        title: "I'm looking to spend around $800 to $1,000.",
        time: "4.58pm",
        send: false,
    },
    {
        id: '9',
        title: "That's a good budget.I'll show you a few options within that range. Are you interested in Windows or Mac laptops?",
        time: "4.40pm",
        send: true,
    },
]

type SinglechatScreenProps = StackScreenProps<RootStackParamList, 'Singlechat'>;

const Singlechat = ({navigation} : SinglechatScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    return (
       <View style={{backgroundColor:colors.background,flex:1}}>
            <View style={[GlobalStyleSheet.container,{padding:0}]}>
                <View
                    style={{
                        height: 60,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: colors.card,
                        justifyContent: 'space-between',
                        borderBottomWidth:1,
                        borderBlockColor:colors.border
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft:5 }}>
                        <TouchableOpacity 
                            onPress={() => navigation.goBack()}
                            style={{padding:10,marginRight:5}}
                            >
                                {/* <Ionicons size={20} color={colors.title} name='chevron-back'/> */}
                                <FeatherIcon size={24} color={colors.title} name={'arrow-left'} />
                        </TouchableOpacity>
                        <Image
                            style={{ height: 40, width: 40, borderRadius: 30, marginLeft: -5, marginRight: 10 }}
                            source={IMAGES.small3}
                        />
                        <View>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: colors.title }}>Emily Johnson</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ height: 10, width: 10, borderRadius: 12, backgroundColor: COLORS.success }}></View>
                                <Text style={{ ...FONTS.fontRegular, fontSize: 13, color: colors.title }}>Online</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Call')}
                        style={{
                            height: 40,
                            width: 40, borderRadius: 10,
                            backgroundColor: '#59BD56',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 15
                        }}
                    >
                        <Image
                            style={{ height: 20, width: 20, resizeMode: 'contain' }}
                            source={IMAGES.call}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={{ paddingHorizontal:15,paddingTop:20 }}>
                    {ChatData.map((data:any, index) => {
                        return (
                            <View key={index}>
                                <View
                                    style={[{
                                        width: '75%',
                                        marginBottom: 10,
                                    },
                                    data.send == false
                                        ?
                                        {
                                            marginRight: 'auto',
                                            alignItems: 'flex-start',
                                        }
                                        :
                                        {
                                            marginLeft: 'auto',
                                            alignItems: 'flex-end',
                                        }
                                    ]}
                                >
                                    <View
                                        style={[
                                            data.send == false
                                                ?
                                                {
                                                    backgroundColor: COLORS.primary,
                                                    borderTopLeftRadius: 10,
                                                    borderTopRightRadius: 10,
                                                    borderBottomRightRadius: 10,

                                                }
                                                :
                                                {
                                                    backgroundColor: COLORS.white,
                                                    borderTopLeftRadius: 10,
                                                    borderTopRightRadius: 10,
                                                    borderBottomLeftRadius: 10,

                                                }

                                        ]}
                                    >
                                        <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: data.send ? COLORS.title : COLORS.white, paddingVertical: 10, paddingHorizontal: 10 }}>{data.title}</Text>
                                    </View>
                                    {data.time &&
                                        <Text style={{ ...FONTS.fontXs, ...FONTS.fontRegular, color: COLORS.text, marginTop: 5 }}>{data.time}</Text>
                                    }
                                </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
            <View style={{ height: 60, backgroundColor: colors.card ,paddingHorizontal:15}}>
                <View style={{ height: 60, width: '100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between' }}>
                    <View style={{  }}>
                        <Image
                            style={{ height: 20, width: 20, resizeMode: 'contain', tintColor:COLORS.primary, }}
                            source={IMAGES.happy}
                        />
                    </View>
                    <TextInput
                        placeholder='Type Something'
                        placeholderTextColor={theme.dark ? 'rgba(255,255,255,0.4)':'rgba(0,0,0,0.4)'}
                        style={{ ...FONTS.fontRegular, fontSize: 15, paddingLeft: 15, color: colors.title,flex:1,paddingRight:40 }}
                    />
                    <View style={{ }}>
                        <Image
                            style={{ height: 20, width: 20, resizeMode: 'contain', tintColor:COLORS.primary }}
                            source={IMAGES.send}
                        />
                    </View>
                </View>
            </View>
       </View>
    )
}


const styles = StyleSheet.create({
    header : {
        height:60,
        backgroundColor:COLORS.card,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    title : {
        fontSize:20,
        ...FONTS.fontMedium,
    },
    actionBtn : {
        height: 35,
        width: 35,
        borderRadius:8,
        alignItems:'center',
        justifyContent : 'center',
        // position:'absolute',
        // left:10,
        // top:10,
        backgroundColor:COLORS.background
    }
})

export default Singlechat