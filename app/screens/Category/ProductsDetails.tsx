import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Text,Image, TouchableOpacity, Share, SectionList, Platform } from 'react-native'
import Header from '../../layout/Header';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Swiper from 'react-native-swiper/src';
import { Feather } from '@expo/vector-icons';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { ScrollView } from 'react-native-gesture-handler';
import Cardstyle1 from '../../components/Card/Cardstyle1';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/reducer/cartReducer';
import { addTowishList } from '../../redux/reducer/wishListReducer';





const SelectData =[
    {
        title:"Color",
        text:"Blue",
    },
    {
        title:"Storage",
        text:"128GB Storage",
    },
    {
        title:"RAM",
        text:"6GB RAM",
    },
    {
        title:"Size",
        text:"Medium",
    },
]

const offerData = [
    {
        image:IMAGES.deliverytruck,
        title:"Free Shipping",
        text:"For all orders over $99",
    },
    {
        image:IMAGES.check3,
        title:"Secure Payment",
        text:"We ensure secure payment",
    },
    {
        image:IMAGES.savemoney,
        title:"Money Back Guarantee",
        text:"Any back within 30 days",
    },
    {
        image:IMAGES.technicalsupport,
        title:"Customer Support",
        text:"Call or email us 24/7",
    },
    {
        image:IMAGES.wallet2,
        title:"Flexible Payment",
        text:"Pay with Multiple Credit Card",
    },
]

const ListwithiconData = [
    {
        title: 'GENERAL',
        data: [
            {
                title: "Country of Origin",
                text: 'China'
            },
            {
                title: "Sim Type",
                text: 'Dual Sim, GSM+GSM'
            },
            {
                title: "Dual Sim",
                text: 'Yes'
            },
            {
                title: "Sim Size",
                text: 'Nano + eSIM'
            },
            {
                title: "Device Type",
                text: 'Smartphone'
            },
            {
                title: "Release Date",
                text: 'September 07, 2022'
            },
        ],
    },
    {
        title: 'DESIGN',
        data: [
            {
                title: "Dimensions",
                text: '71.5 x 146.7 x 7.8 mm'
            },
            {
                title: "Weight",
                text: '172 g'
            },
            {
                title: "Colors",
                text: 'Blue, Purple, Yellow, Midnight'
            },
        ],
    },
    {
        title: 'DISPLAY',
        data: [
            {
                title: "Type",
                text: 'Color OLED Screen (16M Colors)'
            },
            {
                title: "Touch",
                text: 'Yes'
            },
            {
                title: "Size",
                text: '6.1inches, 1170x2532pixels'
            },
            {
                title: "Aspect Ratio",
                text: '19.5:9'
            },
            {
                title: "PPI",
                text: '~ 460PPI'
            },
            {
                title: "Glass Type",
                text: 'Ceramic Shield Front, Glass Back'
            },
            {
                title: "Features",
                text: 'HDR Display'
            },
            {
                title: "Notch",
                text: 'Yes, Small Notch'
            },
        ],
    },
];

const card2Data =[
    {
        id:"20",
        image:IMAGES.item1,
        title:"APPLE iPhone 14 (Bluetooth)",
        price:"$199",
        discount:"$112",
        offer:"70% OFF",
        brand:"Apple",
        color:false,
        //hascolor:false
    },
    {
        id:"21",
        image:IMAGES.item2,
        title:"APPLE iPhone 11 (Bluetooth)",
        price:"$149",
        discount:"$114",
        offer:"50% OFF",
        brand:"Apple",
        color:false,
        // hascolor:true
    },
    {
        id:"22",
        image:IMAGES.item1,
        title:"APPLE iPhone 13 (Bluetooth)",
        price:"$299",
        discount:"$116",
        offer:"70% OFF",
        color:false,
        brand:"Apple",
        //hascolor:true
    },
    {
        id:"23",
        image:IMAGES.item2,
        title:"APPLE iPhone 15 (Bluetooth)",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        color:true,
        brand:"Apple",
        //hascolor:false
    },
]

const ItemImages = [IMAGES.product12, IMAGES.product13, IMAGES.product14, IMAGES.product15];

type ProductsDetailsScreenProps = StackScreenProps<RootStackParamList, 'ProductsDetails'>;

const ProductsDetails = ({navigation} : ProductsDetailsScreenProps) => {
    
    // const navagation = useNavigation();
    
    const [Select, setSelect] = useState(offerData[0]);
    
    const theme = useTheme();
    const { colors } : {colors : any} = theme;
    
    const onShare = async() => {
        try {
            const result = await Share.share({
                message:
                    'Share Product link here.',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error:any) {
            //alert(error.message);
        }
    };

    const dispatch = useDispatch();

    const addItemToCart = () => {
        dispatch(addToCart({
            id:"0",
            image:IMAGES.item1,
            title:"APPLE iPhone 14 (Bluetooth)",
            price:"$199",
            discount:"$112",
            offer:"70% OFF",
            brand:"Apple",
            color:false,
            hascolor:true
        } as any ));
    }

    const addItemToWishList = (data: any) => {
        dispatch(addTowishList(data));
        }

    return (
       <View style={{backgroundColor:colors.background,flex:1}}>
            <Header
                title='Product Details'
                leftIcon='back'
                rightIcon2={'cart'}
                rightIcon1={'search'}
            />
            <ScrollView contentContainerStyle={{flexGrow:1,paddingBottom:20}}>
                <View
                    style={[GlobalStyleSheet.container,{
                        width:'100%',
                        height: SIZES.height / 2,
                        paddingTop:40,
                        backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,
                        paddingBottom:30,
                        padding:0
                    }]}
                >
                    <Swiper
                        showsPagination={Platform.OS === "android" ? true : false}
                        loop={false}
                        paginationStyle={{
                            bottom: -20,
                        }}
                        dotStyle={{
                            height: 8,
                            width: 8,
                            backgroundColor:COLORS.primary,
                            opacity:.2
                        }}
                        activeDotStyle={{
                            height: 8,
                            width: 8,
                            backgroundColor: COLORS.primary,
                        }}
                    >
                        {ItemImages.map((data:any, index:any) => (
                            <View
                                key={index}
                            >
                                <Image
                                    style={{
                                        height:350,
                                        width: '100%',
                                        resizeMode:'contain',
                                        marginTop:50
                                    }}
                                    source={data}
                                />
                            </View>
                        ))}
                    </Swiper>
                    <View
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            paddingHorizontal: 0,
                            paddingLeft:10,
                            paddingVertical: 10,
                            flexDirection: 'row',
                            //alignItems:'center',
                            justifyContent:'space-between'
                        }}
                    >
                        <View style={{  }}>
                            <View
                                style={{
                                    marginTop:10,
                                    backgroundColor:COLORS.success,
                                    paddingHorizontal:5,
                                    paddingVertical:2
                                }}
                            >
                                <Text style={[FONTS.fontSemiBold,{fontSize:12,color:COLORS.card}]}>70% OFF</Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={{
                                        height: 38,
                                        width: 38,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: 8,
                                    }}
                                    onPress={onShare}
                            >
                                <Feather size={22} color={colors.text} name={'share-2'} />
                                {/* <FeatherIcon size={20} color={COLORS.white} name="share-2" /> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <   View style={[GlobalStyleSheet.container,{padding:0}]}>
                    <View style={{height:45,backgroundColor:'#87E8FF',marginVertical:10,flexDirection:'row',alignItems:'center',width:'100%',justifyContent:'space-between',paddingLeft:15}}>
                        <View>
                            <Text style={[FONTS.fontRegular,{fontSize:15,color:COLORS.title}]} >You're saving<Text style={[FONTS.fontSemiBold,{color:'#07A3C5'}]}> $5,565 </Text>on this time</Text>
                        </View>
                        <View>
                            <Image
                                style={{height:45,resizeMode:'contain',marginRight:Platform.OS === 'android' ? -35 : 0}}
                                source={IMAGES.background}
                            />
                            <Image
                                style={{position:'absolute',height:28,width:28,top:10,right:15}}
                                source={IMAGES.gift}
                            />
                        </View>
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card}]}>
                    <Text numberOfLines={1} style={[FONTS.fontMedium,{fontSize:18,color:colors.title,}]}>APPLE iPhone 14 (Blue, 128 GB)</Text>
                    <View style={{flexDirection:'row',alignItems:'center',gap:10,marginTop:2}}>
                        <Image
                            style={{height:14,width:74}}
                            source={IMAGES.star7}
                        />
                        <Text style={[FONTS.fontRegular,{fontSize:14,color:colors.title,opacity:.5}]}>(270 Review)</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:2,gap:5}}>
                        <Text style={[FONTS.fontSemiBold,{fontSize:20,color:COLORS.success}]}>$6,499</Text>
                        <Text style={[FONTS.fontMedium,{fontSize:20,color:colors.title,textDecorationLine:'line-through',opacity:.6}]}>$7,000</Text>    
                        <Text style={[FONTS.fontMedium,{fontSize:14,color:COLORS.danger}]}>  70% OFF</Text>    
                        <Text style={[FONTS.fontMedium,{fontSize:15,color:COLORS.success,}]}>  In Stock </Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',gap:5,marginTop:10}}>
                        <Image
                            style={{height:14,width:14}}
                            source={IMAGES.leftarrow}
                        />
                        <Text style={[FONTS.fontRegular,{fontSize:15,color:colors.text}]}>14 Days return available</Text>
                        <Text style={[FONTS.fontSemiBold,{fontSize:15,color:COLORS.success}]}>  Free delivery</Text>
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,marginVertical:10,paddingBottom:0,paddingTop:10}]}>
                    <Text style={[FONTS.fontMedium,{fontSize:16,color:colors.title,paddingBottom:10}]}>Select Variant</Text>
                    <View style={{flexDirection:'row',flexWrap:'wrap',marginHorizontal:-15}}>
                        {SelectData.map((data:any,index) => {
                            return(
                                <TouchableOpacity key={index} 
                                    style={{
                                        paddingVertical:10,
                                        width:'100%',
                                        borderTopWidth:1,
                                        borderTopColor:COLORS.primaryLight,
                                        //marginHorizontal:-15,
                                        paddingHorizontal:15,
                                        flexDirection:'row',
                                        alignItems:'center',
                                        justifyContent:'space-between'
                                    }}
                                >
                                    <Text style={[FONTS.fontMedium,{fontSize:15,color:colors.title}]}>{data.title}:</Text>
                                    <View style={{flexDirection:'row',gap:5}}>
                                        <Text style={[FONTS.fontRegular,{fontSize:15,color:colors.text}]}>{data.text}</Text>
                                        <Feather size={20} color={COLORS.primary} name={'chevron-right'} />
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:-15,paddingVertical:0,marginBottom:10}]}> 
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal:15}}
                    >
                        <View style={{flexDirection:'row',alignItems:'center',gap:15}}>
                            {offerData.map((data:any,index) => {
                                return(
                                    <TouchableOpacity
                                        key={index} 
                                        style={[{
                                            padding:10,
                                            backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,
                                            borderRadius:4
                                        },Select === data && {
                                            backgroundColor:COLORS.primary
                                        }]}
                                        onPress={() => setSelect(data)}
                                    >
                                        <View style={{alignItems:'center'}}>
                                            <Image
                                                style={{height:45,width:45,tintColor:Select === data ? COLORS.secondary :COLORS.primary}}
                                                source={data.image}
                                            />
                                            <View>
                                                <Text style={[FONTS.fontMedium,{fontSize:15,color:Select === data ? COLORS.white : colors.title,textAlign:'center'}]}>{data.title}</Text>
                                                <Text style={[FONTS.fontRegular,{fontSize:12,color:Select === data ? COLORS.white : colors.title,opacity:.7,textAlign:'center'}]}>{data.text}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
                <View style={[GlobalStyleSheet.container,{backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card}]}>
                    <View style={{}}>
                        <Text  style={[FONTS.fontMedium,{fontSize:16,color:colors.title}]}>Description:</Text>
                        <Text style={[FONTS.fontRegular,{fontSize:15,color:colors.text,lineHeight:20,marginTop:10,opacity:.8}]}>
                        Apple iPhone 14 price in India starts from ₹54,994. It is available at lowest price on Croma in India as on Feb 22, 2024. Take a look at Apple iPhone 14 detailed specifications and features.
                        </Text>
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,marginTop:10,marginBottom:10}]}>
                    <Text style={[FONTS.fontMedium,{fontSize:16,color:colors.title}]}>Apple iPhone 14 Full Specs</Text>
                </View>
                <View style={[GlobalStyleSheet.container,{flex:1,paddingTop:0}]}>
                    <View style={{ marginHorizontal: -15, marginTop: 0, flex: 1 }}>
                        <SectionList
                            contentContainerStyle={{backgroundColor:colors.card,marginTop:-10}}
                            scrollEnabled={false}
                            sections={ListwithiconData}
                            keyExtractor={(item:any, index) => item + index}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    //onPress={() => navigation.navigate(item.navigate)}
                                    style={{
                                        flexDirection: 'row',
                                        paddingHorizontal:15,
                                        // height: 30,
                                        alignItems: 'center',
                                        paddingVertical: 5,
                                        //borderRadius: SIZES.radius,
                                        backgroundColor:colors.card,
                                        //marginVertical:5
                                    }}
                                >
                                    <View style={{width:'40%'}}>
                                        <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.text,}}>{item.title}</Text>
                                    </View>
                                    <View>
                                        <Text style={{...FONTS.fontRegular,fontSize:14,color:colors.title}}>{item.text}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            renderSectionHeader={({ section:{ title } }) => (
                                <Text 
                                    style={{
                                        ...FONTS.fontRegular,
                                        fontSize: 13,
                                        color: COLORS.title,
                                        paddingLeft: 15,
                                        paddingVertical:5,
                                        backgroundColor:COLORS.primaryLight,
                                        //borderBottomWidth:1,
                                        //borderBottomColor:COLORS.primaryLight,
                                        marginTop:10,
                                        marginBottom:10
                                    }}
                                >{title}</Text>
                            )}
                        />
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:15,backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,borderBottomWidth:1,borderBottomColor:COLORS.primaryLight,paddingVertical:15,marginTop:-5}]}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Text style={[FONTS.fontMedium,{fontSize:18,color:colors.title}]}>Similar Products</Text>
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{padding:0,borderBottomWidth:1,borderBlockColor:COLORS.primaryLight}]}>
                    <ScrollView 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            {card2Data.map((data:any, index:any) => {
                                return (
                                    <View style={[{ marginBottom: 0, width: SIZES.width > SIZES.container ? SIZES.container / 3 : SIZES.width / 2.3 }]} key={index}>
                                        <Cardstyle1
                                            title={data.title}
                                            image={data.image}
                                            price={data.price}
                                            offer={data.offer}
                                            color={data.color}
                                            brand={data.brand}
                                            discount={data.discount} 
                                            id={data.id}
                                            onPress3={() => addItemToWishList(data)}                                            
                                            onPress={() => navigation.navigate('ProductsDetails')}
                                        />
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container,{padding:0,}]}>
                <View 
                    style={{
                        flexDirection:'row',
                        width:'100%',
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                >
                    <View style={{width:'50%'}}>
                        <Button
                            onPress={() => {addItemToCart(); navigation.navigate('MyCart')}}
                            title='Add To cart'
                            color={COLORS.white}
                            text={COLORS.primary}
                            style={{borderRadius:0}}
                        />
                    </View>
                    <View style={{width:'50%'}}>
                        <Button
                            title='Buy Now'
                            color={COLORS.secondary}
                            text={COLORS.title}
                            onPress={() => navigation.navigate('DeliveryAddress')}
                            style={{borderRadius:0}}
                        />
                    </View>
                </View>
            </View>
       </View>
    )
}

export default ProductsDetails