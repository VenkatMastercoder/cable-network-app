import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Text,ScrollView,TouchableOpacity, LayoutAnimation, Image } from 'react-native'
import Header from '../../layout/Header';
import { IMAGES } from '../../constants/Images';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SwipeBox from '../../components/SwipeBox';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Cardstyle1 from '../../components/Card/Cardstyle1';
import { useDispatch } from 'react-redux';
import { addTowishList } from '../../redux/reducer/wishListReducer';


const PopoulerData = [
    {
        title: "All",
        active:true
    },
    {
        title: "Offer",
        image:IMAGES.offer
    },
    {
        title: "Crazy Deals",
        image:IMAGES.fire,
    },
    {
        title: "Deal of the day",
    },
]

const card2Data =[
    {
        id:"42",
        image:IMAGES.item3,
        title:"LG TurboWash Washing",
        price:"$199",
        discount:"$112",
        offer:"70% OFF",
        brand:"OLG",
        //color:false,
        //hascolor:false
    },
    {
        id:"43",
        image:IMAGES.item4,
        title:"KitchenAid 9-Cup Food",
        price:"$149",
        discount:"$114",
        offer:"50% OFF",
        brand:"Apple",
        //color:false,
       // hascolor:true
    },
    {
        id:"44",
        image:IMAGES.item5,
        title:"KitchenAid 9-mixer Food",
        price:"$299",
        discount:"$116",
        offer:"70% OFF",
        //color:false,
        brand:"OLG",
        //hascolor:true
    },
    {
        id:"45",
        image:IMAGES.item1,
        title:"APPLE iPhone 15 (Bluetooth)",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        //color:true,
        brand:"Apple",
        //hascolor:false
    },
]

const absData = [
    {
        image: IMAGES.ads3,
    },
    {
        image: IMAGES.ads2,
    },
    {
        image: IMAGES.ads3,
    },
    {
        image: IMAGES.ads2,
    },
]

const Swipe2Data = [
    {
        image: IMAGES.brand5,
        title: "Exclusive Discounts Inside",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small4,
        title: "Limited Stock - Act Fast!",
        date: "15 July 2023"
    },
]

const Swipe4Data = [
    {
        image: IMAGES.brand3,
        title: "Don't Miss Out on Savings",
        date: "15 July 2023"
    },
    {
        image: IMAGES.brand1,
        title: "Get Ready to Shop",
        date: "15 July 2023"
    },
]

const Swipe3Data = [
    {
        image: IMAGES.small5,
        title: "Get Ready to Shop",
        date: "15 July 2023"
    },
    {
        image: IMAGES.brand2,
        title: "Don't Miss Out on Savings",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small7,
        title: "Flash Sale Announcement",
        date: "15 July 2023"
    },
]

const SwipeData = [
    {
        image: IMAGES.small1,
        title: "New Arrivals Alert!",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small2,
        title: "Flash Sale Announcement",
        date: "15 July 2023"
    },
]

const Notification = () => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const navigation = useNavigation<any>();

    const [lists, setLists] = useState<any>(SwipeData);

    const deleteItem = (index:any) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        const arr = [...lists];
        arr.splice(index, 1);
        setLists(arr);
    };

    const [lists2, setLists2] = useState<any>(Swipe2Data);

    const deleteItem2 = (index:any) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        const arr = [...lists2];
        arr.splice(index, 1);
        setLists2(arr);
    };

    const [lists3, setLists3] = useState<any>(Swipe3Data);

    const deleteItem3 = (index:any) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        const arr = [...lists3];
        arr.splice(index, 1);
        setLists3(arr);
    };

    const [lists4, setLists4] = useState<any>(Swipe4Data);

    const deleteItem4 = (index:any) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        const arr = [...lists4];
        arr.splice(index, 1);
        setLists4(arr);
    };

    const dispatch = useDispatch();


    const addItemToWishList = (data: any) => {
        dispatch(addTowishList(data));
        }

    return (
        <View style={{backgroundColor:theme.dark ? colors.background :colors.card,flex:1}}>
            <Header
                title='Notifications (12)'
                leftIcon='back'
                rightIcon1={'search'}
            />
            <View 
                style={{
                    height:40,
                    backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.35,
                    shadowRadius: 6.27,
                    elevation: 5, 
                }}
            >
                <View style={[GlobalStyleSheet.container,{padding:10,paddingHorizontal:0}]}>
                    <View>
                        <ScrollView
                            horizontal
                            contentContainerStyle={{paddingHorizontal:20,flexGrow:1}}
                            showsHorizontalScrollIndicator={false}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, }}>
                                {PopoulerData.map((data:any,index) => {
                                    return(
                                        <TouchableOpacity
                                            activeOpacity={0.9} 
                                            key={index}
                                        >
                                            <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                                {data.image ? 
                                                    <Image
                                                        style={{height:16,width:16,resizeMode:'contain'}}
                                                        source={data.image}
                                                    />
                                                :null}
                                                <Text style={[FONTS.fontMedium,{fontSize:15,color:data.active ? COLORS.primary :colors.title}]}>{data.title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={{paddingBottom:50}}>
                <View style={[GlobalStyleSheet.container,{padding:0,paddingBottom:10}]}>
                    <GestureHandlerRootView style={{}}>
                            {lists.map((data:any,index:any) => {
                                return(
                                    <View
                                        key={index}
                                    >
                                        <SwipeBox data={data} colors={colors} handleDelete={() => deleteItem(index)} />
                                    </View>
                                )
                            })}
                    </GestureHandlerRootView>
                </View>
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,backgroundColor:colors.card,borderBottomWidth:1,borderBottomColor:COLORS.primaryLight,paddingVertical:15,paddingTop:5}]}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Text style={[FONTS.fontMedium,{fontSize:18,color:colors.title}]}>Crazy Deals</Text>
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{padding:0,borderBottomWidth:1,borderBlockColor:COLORS.primaryLight}]}>
                    <ScrollView 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            {card2Data.map((data:any, index) => {
                                return (
                                    <View style={[{ marginBottom: 0, width: SIZES.width > SIZES.container ? SIZES.container / 3 : SIZES.width / 2.3 }]} key={index}>
                                        <Cardstyle1
                                            id={data.id}
                                            title={data.title}
                                            image={data.image}
                                            price={data.price}
                                            offer={data.offer}
                                            color={data.color}
                                            brand={data.brand}
                                            discount={data.discount}
                                            onPress={() => navigation.navigate('ProductsDetails')}
                                            onPress3={() => addItemToWishList(data)}
                                        />
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
                <View style={[GlobalStyleSheet.container,{padding:0,paddingTop:5}]}>
                    <GestureHandlerRootView style={{}}>
                            {lists2.map((data:any,index:any) => {
                                return(
                                    <View
                                        key={index}
                                    >
                                        <SwipeBox data={data} colors={colors} handleDelete={() => deleteItem2(index)} />
                                    </View>
                                )
                            })}
                    </GestureHandlerRootView>
                </View>
                <View style={[GlobalStyleSheet.container, { paddingVertical: 0 }]}>
                    <View style={{ marginHorizontal: -15, marginVertical:15,borderBottomWidth:1,borderBottomColor:COLORS.primaryLight,paddingBottom:15,marginBottom:0}}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{}}
                        >
                            {absData.map((data, index) => {
                                return (
                                    <View key={index} style={{ marginRight: 10 }}>
                                        <Image
                                            style={{ width: 201, height: 110}}
                                            source={data.image}
                                        />
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{padding:0,}]}>
                    <GestureHandlerRootView style={{}}>
                            {lists3.map((data:any,index:any) => {
                                return(
                                    <View
                                        key={index}
                                    >
                                        <SwipeBox data={data} colors={colors} handleDelete={() => deleteItem3(index)} />
                                    </View>
                                )
                            })}
                    </GestureHandlerRootView>
                </View>
                <View style={[GlobalStyleSheet.container,{paddingVertical:5,padding:0,borderBottomWidth:1,borderBlockColor:COLORS.primaryLight}]}>
                    <Image
                        style={{width:'100%',height:undefined,aspectRatio:1/.3,resizeMode:'contain'}}
                        source={IMAGES.ads8}
                    />
                </View>
                <View style={[GlobalStyleSheet.container,{padding:0,paddingBottom:10}]}>
                    <GestureHandlerRootView style={{}}>
                            {lists4.map((data:any,index:any) => {
                                return(
                                    <View
                                        key={index}
                                    >
                                        <SwipeBox data={data} colors={colors} handleDelete={() => deleteItem4(index)} />
                                    </View>
                                )
                            })}
                    </GestureHandlerRootView>
                </View>
            </ScrollView>
        </View>
    )
}

export default Notification