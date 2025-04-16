import React from 'react';
import {  Image, ScrollView, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Header from '../../layout/Header';
import Input from '../../components/Input/Input';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { IMAGES } from '../../constants/Images';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
//import MultiSlider from '@ptomasroos/react-native-multi-slider';

const Inputs = () => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;


    return (
        <View style={{flex:1,backgroundColor:colors.card}}>
            <View
                style={{
                    flex:1,
                    //backgroundColor:colors.background,
                }}
            >
                <Header 
                    title={'Inputs'}  
                    leftIcon={'back'}
                    //titleLeft
                    titleRight
                />
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                    <View style={[GlobalStyleSheet.card,{backgroundColor:theme.dark ?colors.card:colors.background}]}>

                            <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                <Text style={{...FONTS.h6,color:colors.title}}>Classic Input</Text>
                            </View>

                            <View style={GlobalStyleSheet.cardBody}>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        //value={''}  
                                        placeholder="Enter Username"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        //value={''}  
                                        placeholder="Enter Email"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        //value={''}  
                                        type={'password'}
                                        placeholder="Enter Password"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={[GlobalStyleSheet.card,{backgroundColor:theme.dark ?colors.card:colors.background}]}>
                            <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                <Text style={{...FONTS.h6,color:colors.title}}>Input with Icon</Text>
                            </View>
                            <View style={GlobalStyleSheet.cardBody}>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.title}/> }
                                        //value={''}  
                                        placeholder="Enter Username"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        icon={<MaterialIcons style={{opacity:.6}} name={'email'} size={20} color={colors.title}/>}
                                        //value={''}  
                                        placeholder="Enter Email"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        type={'password'}
                                        icon={<FontAwesome style={{opacity:.6}} name={'lock'} size={20} color={colors.title}/> }
                                        //value={''}  
                                        placeholder="Password"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={[GlobalStyleSheet.card, GlobalStyleSheet.shadow, { backgroundColor: colors.card }]}>
                            <View style={[GlobalStyleSheet.cardHeader, { borderBottomColor: colors.border }]}>
                                <Text style={{ ...FONTS.h6, color: colors.title }}>Border Input</Text>
                            </View>
                            <View style={GlobalStyleSheet.cardBody}>
                                <View style={{ marginBottom: 10 }}>
                                    <Input
                                        inputBorder
                                        placeholder="Enter Username"
                                        onChangeText={(value) => console.log(value)}
                                        style={{borderColor:COLORS.primaryLight, paddingLeft:0}}
                                    />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Input
                                        inputBorder
                                        defaultValue="Enter Username"
                                        onChangeText={(value) => console.log(value)}
                                        style={{borderColor:COLORS.primary, paddingLeft:0}}
                                    />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Input
                                        inputBorder
                                        icon={<FontAwesome style={{}} name={'user'} size={20} color={COLORS.primary} />}
                                        // placeholder="Enter Username"
                                        onChangeText={(value) => console.log(value)}
                                        style={{borderColor:COLORS.primary, paddingLeft:30}}
                                    />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Input
                                        inputBorder
                                        icon={<Image
                                            style={{height:19,width:28,borderRadius:4}}
                                            source={IMAGES.flags1}
                                          />}
                                        //placeholder="+44"
                                        onChangeText={(value) => console.log(value)}
                                        style={{borderColor:COLORS.primary,}}
                                        text={"+44"}
                                    />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Input
                                        inputBorder
                                        icon={<MaterialIcons style={{}} name={'email'} size={20} color={COLORS.primary} />}
                                        //placeholder="Enter Email"
                                        onChangeText={(value) => console.log(value)}
                                        style={{borderColor:COLORS.primary, paddingLeft:30}}
                                    />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Input
                                        inputBorder
                                        type={'password'}
                                        icon={<FontAwesome style={{}} name={'lock'} size={20} color={COLORS.primary} />}
                                        // placeholder="Password"
                                        onChangeText={(value) => console.log(value)}
                                        style={{borderColor:COLORS.primary, paddingLeft:30}}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={[GlobalStyleSheet.card,{backgroundColor:theme.dark ?colors.card:colors.background}]}>
                            <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                <Text style={{...FONTS.h6,color:colors.title}}>Input with different sizes</Text>
                            </View>
                            <View style={GlobalStyleSheet.cardBody}>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        inputLg
                                        //value={''}  
                                        placeholder="Enter Username"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        //value={''}  
                                        placeholder="Enter Username"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        inputSm
                                        //value={''}  
                                        placeholder="Enter Username"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={[GlobalStyleSheet.card,{backgroundColor:theme.dark ?colors.card:colors.background}]}>
                            <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                <Text style={{...FONTS.h6,color:colors.title}}>Input with different sizes and icon</Text>
                            </View>
                            <View style={GlobalStyleSheet.cardBody}>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        backround
                                        inputLg
                                        //value={''}  
                                        placeholder="Enter Username"
                                        onChangeText={(value)=> console.log(value)}
                                        icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.title}/> }
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        backround
                                        //value={''}  
                                        placeholder="Enter Username"
                                        onChangeText={(value)=> console.log(value)}
                                        icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.title}/> }
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        backround
                                        inputSm
                                        //value={''}  
                                        placeholder="Enter Username"
                                        onChangeText={(value)=> console.log(value)}
                                        icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.title}/> }
                                    />
                                </View>
                            </View>
                        </View>
                        
                        
                        <View style={[GlobalStyleSheet.card,{backgroundColor:theme.dark ?colors.card:colors.background}]}>
                            <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                <Text style={{...FONTS.h6,color:colors.title}}>Rounded Input</Text>
                            </View>
                            <View style={GlobalStyleSheet.cardBody}>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        inputRounded
                                        icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.text}/> }
                                        //value={''}  
                                        placeholder="Enter Username"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        inputRounded
                                        icon={<MaterialIcons style={{opacity:.6}} name={'email'} size={20} color={colors.text}/>}
                                        //value={''}  
                                        placeholder="Enter Email"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        inputRounded
                                        type={'password'}
                                        icon={<FontAwesome style={{opacity:.6}} name={'lock'} size={20} color={colors.text}/> }
                                        //value={''}  
                                        placeholder="Password"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={[GlobalStyleSheet.card,{backgroundColor:theme.dark ?colors.card:colors.background}]}>
                            <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                <Text style={{...FONTS.h6,color:colors.title}}>Border Input</Text>
                            </View>
                            <View style={GlobalStyleSheet.cardBody}>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.text}/> }
                                        //value={''}  
                                        placeholder="Enter Username"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        icon={<MaterialIcons style={{opacity:.6}} name={'email'} size={20} color={colors.text}/>}
                                        //value={''}  
                                        placeholder="Enter Email"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        type={'password'}
                                        icon={<FontAwesome style={{opacity:.6}} name={'lock'} size={20} color={colors.text}/> }
                                        //value={''}  
                                        placeholder="Password"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* <View style={[GlobalStyleSheet.card,{backgroundColor:theme.dark ?colors.card:colors.background}]}>
                            <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                <Text style={{...FONTS.h6,color:colors.title}}>Range Slider</Text>
                            </View>
                            <View style={GlobalStyleSheet.cardBody}>
                                <View style={{marginBottom:15}}>
                                    <MultiSlider
                                        enableLabel
                                        customLabel={() => 
                                            <View style={{
                                                flexDirection:'row',
                                                justifyContent:'space-between',
                                                position:'absolute',
                                                bottom:-4,
                                                width:'100%',
                                            }}>
                                                <Text style={{...FONTS.fontSm,color:colors.text}}>0%</Text>
                                                <Text style={{...FONTS.fontSm,color:colors.text}}>25%</Text>
                                                <Text style={{...FONTS.fontSm,color:colors.text}}>50%</Text>
                                                <Text style={{...FONTS.fontSm,color:colors.text}}>75%</Text>
                                                <Text style={{...FONTS.fontSm,color:colors.text}}>100%</Text>
                                            </View>
                                        }
                                        trackStyle={{height:4,borderRadius:2,backgroundColor:'rgba(142,165,200,.3)'}}
                                        selectedStyle={{
                                            backgroundColor:COLORS.primary,
                                        }}
                                        markerStyle={{
                                            backgroundColor:COLORS.white,
                                            top:1,
                                            height:16,
                                            width:16,
                                            borderWidth:3,
                                            borderColor:COLORS.primary,
                                        }}
                                        sliderLength={SIZES.width - 60}
                                        max={100}
                                    />
                                </View>
                            </View>
                        </View> */}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};


export default Inputs;