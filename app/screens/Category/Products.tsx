import React, { useRef, useState } from 'react'
//import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { View, Text,TouchableOpacity,Image,ScrollView, StyleSheet, TextInput, Platform } from 'react-native'
import { COLORS,FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import Cardstyle1 from '../../components/Card/Cardstyle1';
import Cardstyle2 from '../../components/Card/Cardstyle2';
import BottomSheet2 from '../Components/BottomSheet2';
import Header from '../../layout/Header';
import { addTowishList } from '../../redux/reducer/wishListReducer';
import { useDispatch } from 'react-redux';


const sliderData = [
    {
        title: "Crazy Deals",
    },
    {
        title: "Budget Buys",
    },
    {
        title: "Best Offer",
    },
    {
        title: "Woman",
    },
    {
        title: "Dress",
    },
    {
        title: "unisex",
    },

]

const ArrivalData = [
    {
        image:IMAGES.item15,
        title: "Fashion",
    },
    {
        image:IMAGES.item16,
        title: "Beauty",
    },
    {
        image:IMAGES.item17,
        title: "Home",
    },
    {
        image:IMAGES.item20,
        title: "phone",
    },
    {
        image:IMAGES.item15,
        title: "Fashion",
    },
    {
        image:IMAGES.item16,
        title: "Beauty",
    },
    {
        image:IMAGES.item17,
        title: "Home",
    },
    {
        image:IMAGES.item20,
        title: "phone",
    },
]

const cardgridData =[
    {
        id:"30",
        image:IMAGES.item01,
        title:"Slim Leather Bifold Wallet",
        price:"$199",
        discount:"$112",
        offer:"70% OFF",
        hascolor:true
    },
    {
        id:"31",
        image:IMAGES.item02,
        title:"Denim skinny fit jeans and ",
        price:"$149",
        discount:"$114",
        offer:"50% OFF",
        hascolor:true
    },
    {
        id:"32",
        image:IMAGES.item03,
        title:"Cuisinart Compact 2-Slice for",
        price:"$299",
        discount:"$116",
        offer:"70% OFF",
        color:false,
        hascolor:true
    },
    {
        id:"33",
        image:IMAGES.item04,
        title:"Sony Bravia OLED TV",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true
    },
]

const cardgrid2Data =[
    {
        id:"34",
        image:IMAGES.item05,
        title:"Polka dot wrap blouse dress",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true
    },
    {
        id:"35",
        image:IMAGES.item06,
        title:"Pleated high-waisted is",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true
    },
    {
        id:"36",
        image:IMAGES.item07,
        title:"LG TurboWash Washing for",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true
    },
    {
        id:"37",
        image:IMAGES.item08,
        title:"Ergonomic Office Chair",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true
    },
]
const cardgrid3Data =[
    {
        id:"38",
        image:IMAGES.item09,
        title:"APPLE iPhone 14 (Bluetooth)",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true
    },
    {
        id:"39",
        image:IMAGES.item010,
        title:"KitchenAid 9-Cup Food and",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true
    },
    {
        id:"40",
        image:IMAGES.item011,
        title:"Engraved Metal Money is",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true
    },
    {
        id:"41",
        image:IMAGES.item012,
        title:"OnePlus Bullets EyeBuds",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true
    },
]

const CardlistData =[
    {
        image:IMAGES.item9,
        title:'Echo Vibe Urban Runners',
        price:"$179",
        delevery:"FREE Delivery",
        discount:"$112",
        offer:"40% OFF",
        brand:"Apple"
    },
    {
        image:IMAGES.item10,
        title:'Swift Glide Sprinter Soles',
        price:"$199",
        delevery:"FREE Delivery",
        discount:"$110",
        offer:"40% OFF",
        brand:"OLG"
    },
]

const Cardlist2Data =[
    {
        image:IMAGES.item06,
        brand:"SKY",
        title:"Pleated high-waisted is",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true
    },
    {
        image:IMAGES.item07,
        title:"LG TurboWash Washing for",
        brand:"OLG",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true
    },
]
const Cardlist3Data =[
    {
        image:IMAGES.item09,
        brand:"Apple",
        title:"APPLE iPhone 14 (Bluetooth)",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true
    },
    {
        image:IMAGES.item010,
        brand:"Apple",
        title:"KitchenAid 9-Cup Food and",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true
    },
    {
        image:IMAGES.item011,
        brand:"Whp",
        title:"Engraved Metal Money is",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true
    },
    {
        image:IMAGES.item012,
        brand:"Vivo",
        title:"OnePlus Bullets EyeBuds",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true
    },
]


type ProductsScreenProps = StackScreenProps<RootStackParamList, 'Products'>;

const Products = ({navigation} : ProductsScreenProps)=> {

    const dispatch = useDispatch();

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const [show, setshow] = useState(true);

    const sheetRef = useRef<any>(null);

    const addItemToWishList = (data: any) => {
        dispatch(addTowishList(data));
        }

    return (
       <View style={{backgroundColor:colors.background, flex:1}}>
            <Header
                title='Product Grid'
                leftIcon='back'
                titleLeft
                rightIcon1={'search'}
                rightIcon2={'cart'}
            />
             <View 
                style={[
                    {   padding: 0,
                        //paddingHorizontal:15,
                        backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.35,
                        shadowRadius: 6.27,
                        elevation: 5,
                        height:40,
                        width:'100%',
                    }
                 ]}
            >
                <View style={[GlobalStyleSheet.container,{padding:0,justifyContent:'space-between',flexDirection:'row',alignItems:'center' }]}>
                    <TouchableOpacity activeOpacity={0.5}  onPress={() => sheetRef.current.openSheet('short')} style={{flexDirection:'row',alignItems:'center',gap:5,width:'35%',justifyContent:'center'}}>
                        <Image
                            style={{height:16,width:16,resizeMode:'contain'}}
                            source={IMAGES.list2}
                        />
                        <Text style={[FONTS.fontMedium,{fontSize:15,color:colors.title}]}>SORT</Text>
                    </TouchableOpacity>
                    <View style={{width:1,height:40,backgroundColor:COLORS.primaryLight,}}/>
                    <TouchableOpacity activeOpacity={0.5}  onPress={() => sheetRef.current.openSheet('filter')}  style={{flexDirection:'row',alignItems:'center',gap:5,width:'35%',justifyContent:'center'}}>
                        <Image
                            style={{height:16,width:16,resizeMode:'contain'}}
                            source={IMAGES.filter3}
                        />
                        <Text style={[FONTS.fontMedium,{fontSize:15,color:colors.title}]}>FILTER</Text>
                    </TouchableOpacity>
                    <View style={{width:1,height:40,backgroundColor:COLORS.primaryLight,}}/>
                    <TouchableOpacity onPress={() => {setshow(!show) }} style={{width:'15%',justifyContent:'center',alignItems:'center'}}>
                        <Image
                            style={{height:22,width:22,resizeMode:'contain',tintColor:show ? colors.text : COLORS.primary}}
                            source={IMAGES.list}
                        />
                    </TouchableOpacity>
                    <View style={{width:1,height:40,backgroundColor:COLORS.primaryLight,}}/>
                    <TouchableOpacity onPress={() => {setshow(!show) }} style={{width:'15%',justifyContent:'center',alignItems:'center'}}>
                        <Image
                            style={{height:22,width:22,resizeMode:'contain',tintColor:show ? COLORS.primary : colors.text}}
                            source={IMAGES.grid}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView contentContainerStyle={{flexGrow:1,paddingBottom:20}}>
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:0,paddingTop:15,paddingBottom:0}]}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginRight: 10 }}>
                            {ArrivalData.map((data:any, index) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={() => navigation.navigate('ProductsDetails')}
                                        key={index}
                                        style={{
                                            backgroundColor:colors.card,
                                            height: 35,
                                            alignItems: 'center',
                                            gap:5,
                                            //justifyContent: 'center',
                                            flexDirection:'row',
                                            borderRadius: 34,
                                            borderWidth:1,
                                            borderColor:colors.text,
                                            //marginTop: 10,
                                            paddingHorizontal: 5,
                                            paddingVertical: 5,
                                            overflow:'hidden'
                                        }}>
                                        <Image
                                            style={{width:44,height:45,resizeMode:'contain'}}
                                            source={data.image}
                                        />
                                        <Text style={{ ...FONTS.fontMedium, fontSize: 13, color:colors.title }}>{data.title}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
                <View style={[GlobalStyleSheet.container,{paddingTop:15,paddingHorizontal:0}]}>
                    <View>
                        {show ?
                            <View style={{}}>
                                <View style={[GlobalStyleSheet.row]}>
                                    {cardgridData.map((data:any, index) => {
                                        return (
                                            <View key={index} style={[GlobalStyleSheet.col50, { paddingHorizontal:0 }]}>
                                                <Cardstyle1
                                                    id={data.id}
                                                    title={data.title}
                                                    image={data.image}
                                                    price={data.price}
                                                    color={data.color}
                                                    offer={data.offer}
                                                    hascolor={data.hascolor}
                                                    discount={data.discount}
                                                    borderTop
                                                    onPress={() => navigation.navigate('ProductsDetails')}
                                                    onPress3={() => addItemToWishList(data)}
                                                />
                                            </View>
                                        )
                                    })}   
                                </View>
                                <View style={{paddingVertical:5}}>
                                    <Image
                                        style={{width:'100%',height:undefined,aspectRatio:1/.3,resizeMode:'contain'}}
                                        source={IMAGES.ads4}
                                    />
                                </View>
                                <View style={[GlobalStyleSheet.row]}>
                                    {cardgrid2Data.map((data:any, index) => {
                                        return (
                                            <View key={index} style={[GlobalStyleSheet.col50, { paddingHorizontal:0 }]}>
                                                <Cardstyle1
                                                    id={data.id}
                                                    title={data.title}
                                                    image={data.image}
                                                    price={data.price}
                                                    color={data.color}
                                                    offer={data.offer}
                                                    hascolor={data.hascolor}
                                                    discount={data.discount}
                                                    borderTop
                                                    onPress={() => navigation.navigate('ProductsDetails')}
                                                    onPress3={() => addItemToWishList(data)}
                                                />
                                            </View>
                                        )
                                    })}   
                                </View>
                                <View style={[{ paddingTop:5,paddingBottom:0 ,}]}>
                                    <View style={{ marginHorizontal: -15, marginBottom: 10,paddingHorizontal:15 }}>
                                        <ScrollView
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            contentContainerStyle={{ paddingHorizontal: 15}}
                                        >
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                                                {sliderData.map((data, index) => {
                                                    return (
                                                        <TouchableOpacity
                                                            onPress={() => navigation.navigate('ProductsDetails')}
                                                            activeOpacity={0.5}
                                                            key={index}
                                                            style={{
                                                                backgroundColor:theme.dark ? 'rgba(255,255,255,0.10)': colors.card,
                                                                height: 40,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                //borderRadius: 8,
                                                                //borderWidth: 1,
                                                                //borderColor: theme.dark ? COLORS.white : colors.borderColor,
                                                                marginTop: 5,
                                                                paddingHorizontal: 15,
                                                                paddingVertical: 5
                                                            }}>
                                                            <Text style={{ ...FONTS.fontMedium, fontSize: 13, color: colors.title }}>{data.title}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })}
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                                <View style={[GlobalStyleSheet.row]}>
                                    {cardgrid3Data.map((data:any, index) => {
                                        return (
                                            <View key={index} style={[GlobalStyleSheet.col50, { paddingHorizontal:0 }]}>
                                                <Cardstyle1
                                                    id={data.id}
                                                    title={data.title}
                                                    image={data.image}
                                                    price={data.price}
                                                    color={data.color}
                                                    offer={data.offer}
                                                    hascolor={data.hascolor}
                                                    discount={data.discount}
                                                    borderTop
                                                    onPress={() => navigation.navigate('ProductsDetails')}
                                                    onPress3={() => addItemToWishList(data)}
                                                />
                                            </View>
                                        )
                                    })}   
                                </View>
                            </View>
                        :
                            <View style={{}}>
                                <View style={[{}]}>
                                    {CardlistData.map((data:any, index) => {
                                        return (
                                            <View key={index} style={{marginBottom:10}}>
                                                <Cardstyle2
                                                    title={data.title}
                                                    price={data.price}
                                                    delevery={data.delevery}
                                                    image={data.image}
                                                    offer={data.offer}
                                                    removebottom
                                                    discount={data.discount}
                                                    brand={data.brand}
                                                    onPress={() => navigation.navigate('ProductsDetails')}
                                                />
                                            </View>
                                        )
                                    })}
                                </View>
                                <View style={{paddingVertical:0,marginTop:-10,marginBottom:0}}>
                                    <Image
                                        style={{width:'100%',height:undefined,aspectRatio:1/.3,resizeMode:'contain'}}
                                        source={IMAGES.ads4}
                                    />
                                </View>
                                <View style={[{}]}>
                                    {Cardlist2Data.map((data:any, index) => {
                                        return (
                                            <View key={index} style={{marginBottom:10}}>
                                                <Cardstyle2
                                                    title={data.title}
                                                    price={data.price}
                                                    delevery={data.delevery}
                                                    image={data.image}
                                                    offer={data.offer}
                                                    removebottom
                                                    discount={data.discount}
                                                    brand={data.brand}
                                                    onPress={() => navigation.navigate('ProductsDetails')}
                                                />
                                            </View>
                                        )
                                    })}
                                </View>
                                <View style={[{ paddingTop:0,paddingBottom:0 ,}]}>
                                    <View style={{ marginHorizontal: -15, marginBottom: 15,paddingHorizontal:15 }}>
                                        <ScrollView
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            contentContainerStyle={{ paddingHorizontal: 15}}
                                        >
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                                                {sliderData.map((data, index) => {
                                                    return (
                                                        <TouchableOpacity
                                                            activeOpacity={0.5}
                                                            key={index}
                                                            style={{
                                                                backgroundColor:theme.dark ? 'rgba(255,255,255,0.10)': colors.card,
                                                                height: 40,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                //borderRadius: 8,
                                                                //borderWidth: 1,
                                                                //borderColor: theme.dark ? COLORS.white : colors.borderColor,
                                                                marginTop: 5,
                                                                paddingHorizontal: 15,
                                                                paddingVertical: 5
                                                            }}>
                                                            <Text style={{ ...FONTS.fontMedium, fontSize: 13, color: colors.title }}>{data.title}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })}
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                                <View style={[{}]}>
                                    {Cardlist3Data.map((data:any, index) => {
                                        return (
                                            <View key={index} style={{marginBottom:10}}>
                                                <Cardstyle2
                                                    title={data.title}
                                                    price={data.price}
                                                    delevery={data.delevery}
                                                    image={data.image}
                                                    offer={data.offer}
                                                    removebottom
                                                    discount={data.discount}
                                                    brand={data.brand}
                                                    onPress={() => navigation.navigate('ProductsDetails')}
                                                />
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        }
                    </View>
                </View>
            </ScrollView>
            <BottomSheet2
                ref={sheetRef}
            />
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
        height: 45,
        width: 45,
        borderRadius:8,
        alignItems:'center',
        justifyContent : 'center',
        backgroundColor:COLORS.background,
        marginLeft:15
    }
})

export default Products