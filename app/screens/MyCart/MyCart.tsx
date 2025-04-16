import { useTheme } from '@react-navigation/native';
import React from 'react'
import { View, Text ,ScrollView, Image ,} from 'react-native'
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS } from '../../constants/theme';
import Cardstyle2 from '../../components/Card/Cardstyle2';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../redux/reducer/cartReducer';
import { Feather } from '@expo/vector-icons';


type MyCartScreenProps = StackScreenProps<RootStackParamList, 'MyCart'>;

const MyCart = ({navigation} : MyCartScreenProps)=> {

    const cart = useSelector((state:any) => state.cart.cart);
    const dispatch = useDispatch();

    const removeItemFromCart = (data: any) => {
        dispatch(removeFromCart(data));
    }

  
  const theme = useTheme();
  const { colors } : {colors : any} = theme;

  return (
      <View style={{backgroundColor:colors.background,flex:1}}>
          <Header
            title='Shopping Cart'
            leftIcon='back'
            titleLeft
            righttitle2
          />
            {cart.length > 0 ?
                <View 
                    style={[GlobalStyleSheet.container,
                        { paddingHorizontal: 15,
                            backgroundColor:theme.dark ? 'rgba(255,255,258,.1)':colors.card,
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
                        <View style={{height:2,flex:1,backgroundColor:colors.title,opacity:.1,marginHorizontal:10}}/>
                        <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                            <View style={{height:18,width:18,borderRadius:30,backgroundColor:COLORS.primaryLight,alignItems:'center',justifyContent:'center'}}>
                                <Text style={[FONTS.fontMedium,{fontSize:10,color:COLORS.title}]}>2</Text>
                            </View>
                            <Text style={[FONTS.fontMedium,{fontSize:13,color:colors.text}]}>Address</Text>
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
                :
                null
            }
            {cart.length > 0 ?
                <View style={[GlobalStyleSheet.container,{padding:0}]}>
                    <View style={{height:45,backgroundColor:'#87E8FF',marginVertical:15,flexDirection:'row',alignItems:'center',width:'100%',justifyContent:'space-between',paddingLeft:15}}>
                        <View>
                            <Text style={[FONTS.fontRegular,{fontSize:15,color:COLORS.title}]} >You're saving<Text style={[FONTS.fontSemiBold,{color:'#07A3C5'}]}> $5,565 </Text>on this time</Text>
                        </View>
                        <View>
                            <Image
                                style={{height:45,resizeMode:'contain',marginRight:-35}}
                                source={IMAGES.background}
                            />
                            <Image
                                style={{position:'absolute',height:28,width:28,top:10,right:15}}
                                source={IMAGES.gift}
                            />
                        </View>
                    </View>
                </View>
                :
                null
            }
            <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
                <View style={[GlobalStyleSheet.container,{padding:0}]}>
                    {cart.map((data:any,index:any) => {
                        return(
                            <View key={index} style={{marginBottom:10}}>
                                <Cardstyle2
                                    title={data.title}
                                    price={data.price}
                                    discount={data.discount}
                                    delevery={data.delevery}
                                    image={data.image}
                                    offer={data.offer}
                                    brand={data.brand} 
                                    onPress={() => navigation.navigate('ProductsDetails')}
                                    onPress4={() => removeItemFromCart(data)} 
                                />
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
            {cart.length > 0 ?
                (
                    <View style={[GlobalStyleSheet.container,{backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card}]}>
                        <Button
                            title='Proceed to Buy (8 items)'
                            color={COLORS.secondary}
                            text={COLORS.title}
                            onPress={() => navigation.navigate('DeliveryAddress')}
                        />
                    </View>


                )
                :
                (
                    <View style={[GlobalStyleSheet.container,{padding:0,position:'absolute',left:0,right:0,bottom:0,top:20}]}>
                        <View
                            style={{
                                flex:1,
                                alignItems:'center',
                                justifyContent:'center',
                            }}
                        >
                            <View
                                style={{
                                    height:60,
                                    width:60,
                                    borderRadius:60,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    backgroundColor:COLORS.primaryLight,
                                    marginBottom:20,
                                }}
                            >
                                <Feather color={COLORS.primary} size={24} name='shopping-cart'/>
                            </View>
                            <Text style={{...FONTS.h5,color:colors.title,marginBottom:8}}>Your shopping-cart is Empty!</Text>    
                            <Text
                                style={{
                                    ...FONTS.fontSm,
                                    color:colors.text,
                                    textAlign:'center',
                                    paddingHorizontal:40,
                                    //marginBottom:30,
                                }}
                            >Add Product to you favourite and shop now.</Text>
                        </View>
                    </View>
                )
            }
      </View>
  )
}

export default MyCart