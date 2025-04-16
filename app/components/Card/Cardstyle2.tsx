import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import LikeBtn from '../LikeBtn';
import CheckoutItems from '../CheckoutItems';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { Feather } from '@expo/vector-icons';

type Props = {
    title : string;
    //color : any;
    //style ?: object;
    //rounded ?: any;
    //size ?: string;
    price : string;
    image ?: any;
    delevery : string;
    removelikebtn?: any;
    offer?:any,
    btntitle?:string,
    brand?:any,
    discount?:any,
    closebtn?:any,
    trackorder?:any,
    completed?:any,
    EditReview?:any,
    removebottom?:any,
    onPress ?: (e : any) => void,
    onPress2 ?: (e : any) => void,
    onPress3 ?: (e : any) => void,
    onPress4 ?: (e : any) => void,
    //hascolor:any
}

const Cardstyle2 = ({title,price,image,delevery,removelikebtn,offer,btntitle,onPress,brand,discount,closebtn,trackorder,completed,EditReview,onPress2,removebottom,onPress3,onPress4}:Props) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

  return (
    <View 
        style={{
            marginTop: 0,
            paddingHorizontal: 15,
            paddingVertical:10,
            paddingBottom:0,
            backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,
        }}
    >
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.5}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 0,
                justifyContent:'center',
                borderBottomWidth:removebottom ? 0:1,
                borderBottomColor:COLORS.primaryLight,
                paddingBottom:10,
                marginHorizontal:-15
            }}
        >
            {/* <View style={{height: undefined, width:SIZES.width / 2.8,aspectRatio:1/1, borderRadius: 8,backgroundColor:theme.dark ? 'rgba(255,255,255,0.10)':colors.background}}> */}
                <Image
                    style={{ height: undefined, width:SIZES.width /2.9,aspectRatio:1/1.,resizeMode:'contain' }}
                    source={image}
                />
            {/* </View> */}
            <View style={{flex:1}}>
                <Text  style={[FONTS.fontMedium,{fontSize:12,color:COLORS.primary,paddingRight:30}]}>{brand}</Text>
                <Text numberOfLines={1} style={[FONTS.fontMedium,{fontSize:13,color:colors.title,marginTop:5,paddingRight:10}]}>{title}</Text>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:2,gap:5}}>
                    <Text style={[FONTS.fontMedium,{fontSize:14,color:colors.title}]}>{price}</Text>
                    <Text style={[FONTS.fontJostLight,{fontSize:12,color:colors.title,textDecorationLine:'line-through',opacity:.6}]}>{discount}</Text>
                    <Text style={[FONTS.fontRegular,{fontSize:12,color:COLORS.danger,}]}>{offer}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',gap:10,marginTop:2}}>
                    <Image
                        style={{height:12,width:64}}
                        source={IMAGES.star7}
                    />
                    <Text style={[FONTS.fontRegular,{fontSize:12,color:colors.title,opacity:.5}]}>(270 Review)</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',gap:5,marginTop:10}}>
                    <Image
                        style={{height:14,width:14}}
                        source={IMAGES.leftarrow}
                    />
                    <Text style={[FONTS.fontRegular,{fontSize:14,color:colors.text}]}>14 Days return available</Text>
                </View>
            </View>
            {closebtn ?
                <TouchableOpacity
                    onPress={onPress4}
                    style={{position:'absolute',right:10,top:5}}
                >
                    <Feather size={20} color={colors.title} name={'x'} />
                </TouchableOpacity>
            :
            null
            }
        </TouchableOpacity>
        {removebottom ?
            null 
            :
            <View style={{height:40,width:'100%',justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                {trackorder ? 
                    <TouchableOpacity onPress={onPress2} activeOpacity={0.5} style={{flexDirection:'row',alignItems:'center',gap:5,paddingHorizontal:0}}>
                        <Feather size={14} color={colors.primary} name={'truck'} />
                        <Text style={[FONTS.fontRegular,{fontSize:14,color:colors.text}]}>Track Order</Text>
                    </TouchableOpacity>
                :completed ? 
                    <TouchableOpacity activeOpacity={0.5} style={{flexDirection:'row',alignItems:'center',gap:5,paddingHorizontal:0}}>
                        <Image
                            style={{ height: 16, width: 16, resizeMode: 'contain', }}
                            source={IMAGES.check4}
                        />
                        <Text style={[FONTS.fontRegular,{fontSize:14,color:COLORS.success}]}>Completed</Text>
                    </TouchableOpacity>
                :
                    <View>
                        <CheckoutItems/>
                    </View>
                }
                <View style={{width:1,height:40,backgroundColor:COLORS.primaryLight,}}/>
                {trackorder ?
                    <TouchableOpacity onPress={onPress3} activeOpacity={0.5} style={{flexDirection:'row',alignItems:'center',gap:5,paddingHorizontal:0}}>
                        <Image
                            style={{ height: 16, width: 16, resizeMode: 'contain', tintColor:colors.text }}
                            source={IMAGES.Star4}
                        />
                        <Text style={[FONTS.fontRegular,{fontSize:14,color:colors.text}]}>Write Review</Text>
                    </TouchableOpacity>
                :EditReview ?
                    <TouchableOpacity onPress={onPress3} activeOpacity={0.5} style={{flexDirection:'row',alignItems:'center',gap:5,paddingHorizontal:0}}>
                        <Image
                            style={{ height: 16, width: 16, resizeMode: 'contain', tintColor:'#FFAC5F' }}
                            source={IMAGES.Star4}
                        />
                        <Text style={[FONTS.fontRegular,{fontSize:14,color:colors.title}]}>4.5 <Text style={{color:COLORS.primary,textDecorationLine:'underline'}}>Edit Review</Text></Text>
                    </TouchableOpacity>
                :completed ?
                    <TouchableOpacity onPress={onPress3} activeOpacity={0.5} style={{flexDirection:'row',alignItems:'center',gap:5,paddingHorizontal:0}}>
                        <Image
                            style={{ height: 16, width: 16, resizeMode: 'contain', tintColor:'#FFAC5F' }}
                            source={IMAGES.Star4}
                        />
                        <Text style={[FONTS.fontRegular,{fontSize:14,color:colors.title}]}>Write Review</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity
                        onPress={onPress4} 
                        activeOpacity={0.5} 
                        style={{flexDirection:'row',alignItems:'center',gap:5,paddingHorizontal:0}}
                    >
                        <Feather size={14} color={colors.text} name={'save'} />
                        <Text style={[FONTS.fontRegular,{fontSize:14,color:colors.text}]}>Save for later</Text>
                    </TouchableOpacity>
                }      
                <View style={{width:1,height:40,backgroundColor:COLORS.primaryLight,}}/>
                <TouchableOpacity
                    onPress={onPress4} 
                    activeOpacity={0.5} 
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 5, }}
                >
                    <Image
                        style={{ height: 16, width: 16, resizeMode: 'contain', tintColor:COLORS.danger }}
                        source={IMAGES.delete}
                    />
                    <Text style={{ ...FONTS.fontMedium, fontSize: 14, color:COLORS.danger }}>Remove</Text>
                </TouchableOpacity>
            </View>
        }
    </View>
  )
}

export default Cardstyle2