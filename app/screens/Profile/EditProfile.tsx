import React, { useState } from 'react'
import { View, Text,  ScrollView, Image, TouchableOpacity } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import Input from '../../components/Input/Input';
//import { Feather } from '@expo/vector-icons';
import Button from '../../components/Button/Button';
import { COLORS, FONTS } from '../../constants/theme';

const EditProfile = () => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const navigation = useNavigation<any>();

    const [isFocused , setisFocused] = useState(false);
    const [isFocused1 , setisFocused1] = useState(false);
    const [isFocused2 , setisFocused2] = useState(false);
    const [isFocused3 , setisFocused3] = useState(false);

    return (
       <View style={{backgroundColor:colors.background,flex:1}}>
           <Header
                title='Edit Profile'
                leftIcon='back'
                titleRight
           />
            <ScrollView contentContainerStyle={{flex:1}}>
                <View style={[GlobalStyleSheet.container, {backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card}]}>
                    <View style={{flexDirection:'row',alignItems:'center',gap:20}}>
                        <View style={{}}>
                            <View style={{ borderWidth: 2, borderColor:COLORS.primary, height: 90, width: 90, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    style={{ height: 82, width: 82, borderRadius: 50 }}
                                    source={IMAGES.small6}
                                />
                            </View>
                            <TouchableOpacity activeOpacity={0.9} style={{ height: 42, width: 42, borderRadius: 40, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 0, left:60 }}>
                                <View style={{ height: 36, width: 36, borderRadius: 36, alignItems: 'center', justifyContent: 'center', backgroundColor:COLORS.primary }}>
                                    <Image
                                        style={{ height: 16, width: 16, resizeMode: 'contain', tintColor: COLORS.card }}
                                        source={IMAGES.write}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={[FONTS.fontMedium,{fontSize:24,color:colors.title}]}>James Smith</Text>
                            <Text style={[FONTS.fontMedium,{fontSize:13,color:COLORS.primary}]}>Last Visit : 17 Jan 2024</Text>
                        </View>
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,marginTop:10,paddingVertical:10}]}>
                    <View style={{ marginBottom: 20, marginTop: 10 }}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 13, color:COLORS.primary, }}>Your Name</Text>
                        <Input
                             onFocus={() => setisFocused(true)}
                             onBlur={() => setisFocused(false)}
                             isFocused={isFocused}
                            inputBorder
                            defaultValue="James Smith"
                            onChangeText={(value) => console.log(value)}
                            style={{borderColor:COLORS.primaryLight, paddingLeft:0}}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Input
                             onFocus={() => setisFocused1(true)}
                             onBlur={() => setisFocused1(false)}
                             isFocused={isFocused1}
                            inputBorder
                            placeholder='Mobile Number'
                            onChangeText={(value) => console.log(value)}
                            style={{borderColor:COLORS.primaryLight, paddingLeft:0}}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Input
                             onFocus={() => setisFocused2(true)}
                             onBlur={() => setisFocused2(false)}
                             isFocused={isFocused2}
                            inputBorder
                            placeholder='Email'
                            onChangeText={(value) => console.log(value)}
                            style={{borderColor:COLORS.primaryLight, paddingLeft:0}}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Input
                             onFocus={() => setisFocused3(true)}
                             onBlur={() => setisFocused3(false)}
                             isFocused={isFocused3}
                            inputBorder
                            placeholder='Location'
                            onChangeText={(value) => console.log(value)}
                            style={{borderColor:COLORS.primaryLight, paddingLeft:0}}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container,{paddingHorizontal:0,paddingBottom:0}]}>
                <View style={{height:88,width:'100%',backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,justifyContent:'center',paddingHorizontal:15}}>
                    <Button
                        title='Update Profile'
                        color={COLORS.secondary}
                        text={ COLORS.title}
                        onPress={() => navigation.navigate('Profile')}
                    />
                </View>
            </View> 
       </View>
    )
}

export default EditProfile