import { useTheme } from '@react-navigation/native';
import React, { useRef, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated, Image, StyleSheet} from 'react-native'
import Header from '../../layout/Header';
import { COLORS, SIZES ,FONTS} from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import { Feather } from '@expo/vector-icons';
import Cardstyle2 from '../../components/Card/Cardstyle2';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';


const MyorderData = [
    {
        image:IMAGES.item9,
        title:'Echo Vibe Urban Runners',
        price:"$179",
        delevery:"FREE Delivery",
        offer:"40% OFF",
        btntitle:'Track Order',
        brand:"Apple",
        trackorder:true,
        status : "ongoing",
    },
    {
        image:IMAGES.item05,
        title:"Polka dot wrap blouse dress",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true,
        completed:true,
        status : "completed",
    },
    {
        image:IMAGES.item10,
        title:'Swift Glide Sprinter Soles',
        price:"$199",
        delevery:"FREE Delivery",
        offer:"40% OFF",
        btntitle:'Track Order',
        brand:"OLG",
        EditReview:true,
        completed:true,
        status : "completed",
    },
    {
        image:IMAGES.item11,
        title:'Sky Burst Skyline Burst Shoes',
        price:"$149",
        delevery:"FREE Delivery",
        offer:"40% OFF",
        btntitle:'Track Order',
        brand:"Sony",
        completed:true,
        status : "completed",
    },
    {
        image:IMAGES.item12,
        title:'Zen Dash Active Flex Shoes',
        price:"$299",
        delevery:"FREE Delivery",
        offer:"40% OFF",
        btntitle:'Track Order',
        brand:"Deslar",
        trackorder:true,
        status : "ongoing",
    },
    {
        image:IMAGES.item13,
        title:'Nova Stride Street Stompers',
        price:"$99",
        delevery:"FREE Delivery",
        offer:"40% OFF",
        btntitle:'Track Order',
        brand:"Apple",
        trackorder:true,
        status : "ongoing",
    },
]


type MyorderScreenProps = StackScreenProps<RootStackParamList, 'Myorder'>;

const Myorder = ({navigation} : MyorderScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const [orderData , setOrderData] = useState(MyorderData);
    const [activeFilter, setActiveFilter] = useState('all'); // Track active filter

    const filterData = (val:any) => {
        setActiveFilter(val); // Update active filter when a filter is selected
        if(val === 'all'){
            setOrderData(MyorderData);
        }else{
            const newArry = MyorderData.filter(e => e.status === val);
            //console.log(newArry)
            setOrderData(newArry);
        }
    }

    const removeItem = (indexToRemove: number) => {
        setOrderData(prevItems => prevItems.filter((item, index) => index !== indexToRemove));
      };

    return (
       <View style={{backgroundColor:colors.background,flex:1}}>
            <Header
                title='My Order'
                leftIcon='back'
                titleRight
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
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <TouchableOpacity
                        onPress={() => filterData('all')} 
                        style={{width:'20%',justifyContent:'center',alignItems:'center'}}
                    >
                        <Text style={[
                            FONTS.fontMedium,{fontSize:15,color: activeFilter === 'all' ? COLORS.primary : colors.title },
                        ]}>All</Text>
                    </TouchableOpacity>
                   <View style={{width:1,height:40,backgroundColor:COLORS.primaryLight,}}/>
                    <TouchableOpacity
                        onPress={() => filterData('ongoing')}
                        activeOpacity={0.5}  style={styles.TopbarCenterLine}>
                        <Image
                            style={{height:16,width:16,resizeMode:'contain',tintColor: activeFilter === 'ongoing' ? COLORS.primary :colors.title }}
                            source={IMAGES.deliverytruck2}
                        />
                        <Text style={[
                            FONTS.fontMedium,{fontSize:15,color: activeFilter === 'ongoing' ? COLORS.primary :colors.title },
                        ]}>Ongoing</Text>
                    </TouchableOpacity>
                   <View style={{width:1,height:40,backgroundColor:COLORS.primaryLight,}}/>
                    <TouchableOpacity
                        onPress={() => filterData('completed')} 
                        activeOpacity={0.5}  style={styles.TopbarCenterLine}>
                        <Image
                            style={{height:16,width:16,resizeMode:'contain',tintColor: activeFilter === 'completed' ? COLORS.primary : colors.title }}
                            source={IMAGES.savecheck}
                        />
                         <Text style={[
                            FONTS.fontMedium,{fontSize:15,color: activeFilter === 'completed' ? COLORS.primary : colors.title },
                        ]}>Completed</Text>
                    </TouchableOpacity>
                </View>
            </View>
           <ScrollView contentContainerStyle={{flexGrow:1,justifyContent:orderData.length === 0 ? 'center': 'flex-start'}}>
                <View style={[GlobalStyleSheet.container, { paddingTop: 15 }]}>
                    <View style={{ marginHorizontal: -15, }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            <View>
                                {orderData.map((data:any, index) => {
                                    return (
                                        <View   key={index} style={{marginBottom:10}}>
                                            <Cardstyle2
                                                title={data.title}
                                                price={data.price}
                                                delevery={data.delevery}
                                                image={data.image}
                                                offer={data.offer}
                                                brand={data.brand}
                                                btntitle={data.btntitle}
                                                trackorder={data.trackorder}
                                                completed={data.completed}
                                                EditReview={data.EditReview}
                                                onPress={() => navigation.navigate('ProductsDetails')}
                                                onPress2={() => navigation.navigate('Trackorder')}
                                                onPress3={() => navigation.navigate('Writereview')}
                                                onPress4={() => removeItem(index)}
                                                closebtn
                                            />
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                        {orderData.length === 0 &&
                            <View style={[GlobalStyleSheet.container,{padding:0,left:0,right:0,bottom:0,top:0,}]}>
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
                                    <Text style={{...FONTS.h5,color:colors.title,marginBottom:8}}>Your My Order is Empty!</Text>    
                                    <Text
                                        style={{
                                            ...FONTS.fontSm,
                                            color:colors.text,
                                            textAlign:'center',
                                            paddingHorizontal:40,
                                            //marginBottom:30,
                                        }}
                                    >Add Product to you addcart and shop now.</Text>
                                </View>
                            </View>
                        }
                    </View>
                </View>
            </ScrollView>
       </View>
    )
}

const styles = StyleSheet.create({
    TopbarCenterLine:{
        flexDirection:'row',
        alignItems:'center',
        gap:5,
        width:'40%',
        justifyContent:'center'
    }
})

export default Myorder