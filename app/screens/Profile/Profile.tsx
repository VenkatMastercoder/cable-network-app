import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react'
import { View, Text ,TouchableOpacity,Image,ScrollView, SectionList} from 'react-native'
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { IMAGES } from '../../constants/Images';
import { COLORS,FONTS, SIZES } from '../../constants/theme';
//import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useDispatch } from 'react-redux';
import { openDrawer } from '../../redux/actions/drawerAction';

const btnData = [
  {
      title: "Your order",
      navigate: 'Myorder',
  },
  {
      title: "Wishlist",
      navigate: 'Wishlist',
  },
  {
      title: "Coupons",
      navigate: 'Coupons',
  },
  {
      title: "Track order",
      navigate: 'Trackorder',
  },
]

const ListwithiconData = [
  {
      title: 'Account Settings',
      data: [
          {
              icon: IMAGES.user3,
              title: "Edit profile",
              navigate: 'EditProfile'
          },
          {
              icon: IMAGES.card2,
              title: "Saved Cards & Wallet",
              navigate: 'Payment'
          },
          {
              icon: IMAGES.map,
              title: "Saved Addresses",
              navigate: 'AddDeliveryAddress'
          },
          {
              icon: IMAGES.translation,
              title: "Select Language",
              navigate: 'Language'
          },
          {
              icon: IMAGES.ball,
              title: "Notifications Settings",
              navigate: 'Notification'
          },
      ],
  },
  {
      title: 'My Activity',
      data: [
          {
              icon: IMAGES.star,
              title: "Reviews",
              navigate: 'Writereview'
          },
          {
              icon: IMAGES.chat,
              title: "Questions & Answers",
              navigate: 'Questions'
          },
      ],
  },

];

type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>;

const Profile = ({navigation} : ProfileScreenProps) => {

  const theme = useTheme();
  const { colors } : {colors : any} = theme;

  //const navigation = useNavigation();

  const dispatch = useDispatch();


  return (
      <View style={{backgroundColor:colors.background,flex:1}}>
        <View style={{height:60,backgroundColor:COLORS.primary}}>
            <View style={[GlobalStyleSheet.container,{paddingHorizontal:20}]}>
                <View style={[GlobalStyleSheet.row,{alignItems:'center',justifyContent:'space-between'}]}>
                    <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                        <TouchableOpacity
                            style={{margin:5}}
                            onPress={() => dispatch(openDrawer())}
                        >
                            <Image
                                style={{height:22,width:22,tintColor:COLORS.card,resizeMode:'contain'}}
                                source={IMAGES.grid5}
                            />
                        </TouchableOpacity>
                        <Image
                            style={{resizeMode:'contain',width:114,height:25}}
                            source={IMAGES.appname}
                        />
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Search')} 
                            style={{
                                height:35,
                                width:35,
                                // borderRadius:8,
                                // backgroundColor:theme.dark ? 'rgba(255,255,255,0.10)' : COLORS.background,
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            <Image
                            style={{height:22,width:22,tintColor:COLORS.card,resizeMode:'contain'}}
                            source={IMAGES.search}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Notification')} 
                            style={{
                                height:35,
                                width:35,
                                // borderRadius:8,
                                // backgroundColor:theme.dark ? 'rgba(255,255,255,0.10)' : COLORS.background,
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            <Image
                            style={{height:20,width:20,tintColor:COLORS.card,resizeMode:'contain'}}
                            source={IMAGES.ball}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        <View style={[GlobalStyleSheet.container,{paddingTop:20,backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card}]}> 
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingBottom: 20 }}>
                <Image
                    style={{ height: 40, width: 40, borderRadius: 50 }}
                    source={IMAGES.small6}
                />
                <Text style={{ ...FONTS.fontRegular, fontSize: 20, color: colors.title }}>James Smith</Text>
            </View>
            <View style={GlobalStyleSheet.row}>
                {btnData.map((data:any,index) => {
                    return(
                        <View key={index} 
                            style={[GlobalStyleSheet.col50,{marginBottom:10,paddingHorizontal:5}]}>
                            <TouchableOpacity
                            onPress={() => navigation.navigate(data.navigate)}
                            style={{
                                height:46,
                                width:'100%',
                                backgroundColor:colors.card,
                                borderWidth:1,
                                borderColor:COLORS.primaryLight,
                                //borderRadius:8,
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                            >
                                <Text style={[FONTS.fontMedium,{fontSize:16,color:colors.title}]}>{data.title}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        </View>
        <View style={[GlobalStyleSheet.container,{flex:1,paddingTop:0}]}>
            <View style={{ marginHorizontal: -15, marginTop: 0, flex: 1 }}>
                <SectionList
                    sections={ListwithiconData}
                    keyExtractor={(item:any, index) => item + index}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => navigation.navigate(item.navigate)}
                            style={{
                                flexDirection: 'row',
                                paddingHorizontal:15,
                                height: 48,
                                alignItems: 'center',
                                paddingVertical: 15,
                                //borderRadius: SIZES.radius,
                                backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,
            
                            }}
                        >
                            <View style={{
                                height: 30,
                                width: 30,
                                borderRadius: 6,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 10,
                            }}>
                                <Image
                                    style={{
                                        height:20,
                                        width:20,
                                        tintColor:COLORS.primary,
                                        resizeMode:'contain',
                                    }}
                                    source={item.icon}
                                />
                            </View>
                            <Text style={{...FONTS.fontRegular,fontSize:16,color:colors.title,flex:1}}>{item.title}</Text>
                            <FeatherIcon size={22} color={colors.title} name={'chevron-right'} />
                            {/* <Ionicons  style={{opacity:.8}} color={colors.title} name='chevron-forward' size={20}/> */}
                        </TouchableOpacity>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text 
                            style={{
                                 ...FONTS.fontMedium,
                                  fontSize: 20,
                                   color: colors.title,
                                    paddingLeft: 20,
                                    paddingVertical:10,
                                    backgroundColor:theme.dark ? 'rgba(255,255,255,.1)' : COLORS.white,
                                    borderBottomWidth:1,
                                    borderBottomColor:COLORS.primaryLight,
                                    marginTop:10
                             }}
                        >{title}</Text>
                    )}
                />
            </View>
        </View>
      </View>
  )
}

export default Profile