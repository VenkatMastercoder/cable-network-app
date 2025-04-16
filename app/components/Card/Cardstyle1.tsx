import React, { useState } from 'react'
import { View, Text ,Image,TouchableOpacity} from 'react-native'
import { COLORS, FONTS } from '../../constants/theme';
import { useNavigation, useTheme } from '@react-navigation/native';
import LikeBtn from '../LikeBtn';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromwishList } from '../../redux/reducer/wishListReducer';


type Props = {
    id : string,
    title : string;
    color : any;
    //style ?: object;
    //rounded ?: any;
    //size ?: string;
    price : string;
    image ?: any;
    offer : string;
    hascolor?:any;
    brand?:any;
    discount?:any;
    wishlist?:any;
    borderTop?:any;
    onPress ?: (e : any) => void,
    onPress3 ?: (e : any) => void,
    onPress4 ?: any,
    // onpress:string;
}

const Cardstyle1 = ({id,title,price,image,offer,color,hascolor,onPress,brand,discount,wishlist,borderTop,onPress3,onPress4}:Props) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const navagation = useNavigation();

    const dispatch = useDispatch();

    const [show, setshow] = useState(false)

    const wishList = useSelector((state:any) => state.wishList.wishList);

    const inWishlist = () => {
        var temp = [] as any;
        wishList.forEach((data:any) => {
            temp.push(data.id);
        });
        return temp;
    }

    const removeItemFromWishList = () => {
        dispatch(removeFromwishList(id as any));
    }


  return (
    <TouchableOpacity
        activeOpacity={.8}
        style={{
            backgroundColor:theme.dark ? 'rgba(255,255,255,.1)' :colors.card,
            borderRightWidth:1,
            borderRightColor:COLORS.primaryLight,
            width:'100%',
            height:undefined,
            //aspectRatio:hascolor ? wishlist ? 1/1.55 : 1/1.3 : 1/1.4,
            borderTopWidth:hascolor ? 1:borderTop ? 1: 0,
            borderTopColor:COLORS.primaryLight,
            paddingBottom:15
        }}
        onPress={onPress} 
    >
        <View style={{height:undefined,width:'100%',aspectRatio:1/1,alignItems:'center',justifyContent:'center'}}>
            <Image
                style={{ height: undefined, width: '100%', aspectRatio: 1/1,resizeMode:'contain'}}
                source={image}
            />
        </View>
        <TouchableOpacity  style={{position:'absolute',right:0,top:-5}}>
            <LikeBtn
                id={id}
                onPress={inWishlist().includes(id) ? removeItemFromWishList : onPress3}
                inWishlist={inWishlist}
            />
        </TouchableOpacity>
        <View style={{paddingHorizontal:hascolor ? 20 :20,marginTop:hascolor ? -20 :-10}}>
            <Text  style={[FONTS.fontMedium,{fontSize:12,color:COLORS.primary,paddingRight:30}]}>{brand}</Text>
            <Text numberOfLines={1} style={[FONTS.fontMedium,{fontSize:12,color:colors.title,marginTop:5,paddingRight:10}]}>{title}</Text>
            <View style={{flexDirection:'row',alignItems:'center',marginTop:5,gap:5}}>
                <Text style={[FONTS.fontMedium,{fontSize:14,color:colors.title}]}>{price}</Text>
                <Text style={[FONTS.fontJostLight,{fontSize:12,color:colors.title,textDecorationLine:'line-through',opacity:.6}]}>{discount}</Text>
                <Text style={[FONTS.fontRegular,{fontSize:12,color:COLORS.danger,}]}>{offer}</Text>

            </View>
        </View>
        {wishlist ?
            <View style={{paddingHorizontal:15,marginTop:10,}}>
                <TouchableOpacity
                    onPress={() => {setshow(!show) ; onPress4() }}
                    activeOpacity={0.5}
                    style={{
                        height:40,
                        width:'100%',
                        borderWidth:2,
                        borderColor:show ? COLORS.primary :COLORS.primaryLight,
                        borderRadius:4,
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:show ? COLORS.primary : colors.card
                    }}
                >
                        <Text style={[FONTS.fontMedium,{fontSize:14,color:show ? COLORS.card :COLORS.primary}]}>Add To Cart</Text>
                </TouchableOpacity>
            </View>
            :
            null
        }
    </TouchableOpacity>
  )
}

export default Cardstyle1