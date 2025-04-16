import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { IMAGES } from "../../constants/Images";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import Button from "../../components/Button/Button";
import { RootStackParamList } from "../../navigation/RootStackParamList";
import { StackScreenProps } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { openDrawer } from "../../redux/actions/drawerAction";
import { LinearGradient } from "expo-linear-gradient";
import BottomSheet2 from "../Components/BottomSheet2";
import { addTowishList } from "../../redux/reducer/wishListReducer";
import Swiper from "react-native-swiper/src";

const bannerData = [
  {
    image: IMAGES.banner1,
    title: "AirPods",
    text: "2nd generation",
    price: "$1259.00*",
    bottom: false,
  },
  {
    image: IMAGES.banner3,
    title: "Shoes",
    text: "1nd generation",
    price: "$125.00*",
    bottom: true,
  },
  {
    image: IMAGES.banner2,
    title: "AirPods",
    text: "3nd generation",
    price: "$1029.00*",
    bottom: true,
  },
];

const offerData = [
  {
    image: IMAGES.deliverytruck,
    title: "Free Shipping & Returns",
    text: "For all orders over $99",
  },
  {
    image: IMAGES.check3,
    title: "Secure Payment",
    text: "We ensure secure payment",
  },
  {
    image: IMAGES.savemoney,
    title: "Money Back Guarantee",
    text: "Any back within 30 days",
  },
  {
    image: IMAGES.technicalsupport,
    title: "Customer Support",
    text: "Call or email us 24/7",
  },
  {
    image: IMAGES.wallet2,
    title: "Flexible Payment",
    text: "Pay with Multiple Credit Card",
  },
];

type HomeScreenProps = StackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: HomeScreenProps) => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  //const navigation = useNavigation()

  const moresheet2 = useRef<any>(null);

  const [Select, setSelect] = useState(offerData[0]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const addItemToWishList = (data: any) => {
    dispatch(addTowishList(data));
  };

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={{ height: 60, backgroundColor: COLORS.primary }}>
          <View style={[GlobalStyleSheet.container, { paddingHorizontal: 20 }]}>
            <View
              style={[
                GlobalStyleSheet.row,
                { alignItems: "center", justifyContent: "space-between" },
              ]}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <TouchableOpacity
                  style={{ margin: 5 }}
                  onPress={() => dispatch(openDrawer())}>
                  <Image
                    style={{
                      height: 22,
                      width: 22,
                      tintColor: COLORS.card,
                      resizeMode: "contain",
                    }}
                    source={IMAGES.grid5}
                  />
                </TouchableOpacity>
                <Image
                  style={{ resizeMode: "contain", width: 114, height: 25 }}
                  source={IMAGES.appname}
                />
              </View>
      
            </View>
          </View>
        </View>

        <Swiper
          autoplay={true}
          autoplayTimeout={5}
          height={"auto"}
          dotStyle={{
            height: 6,
            width: 6,
            backgroundColor: COLORS.card,
            opacity: 0.2,
          }}
          activeDotStyle={{
            height: 6,
            width: 6,
            backgroundColor: COLORS.card,
          }}
          paginationStyle={{ bottom: 10 }}
          showsPagination={Platform.OS === "android" ? true : false}>
          {bannerData.map((data: any, index) => {
            return (
              <LinearGradient
                key={index}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                colors={["#001A44", "#1E51A5"]}
                style={{ height: undefined, width: "100%" }}>
                <View
                  style={[
                    GlobalStyleSheet.container,
                    { paddingHorizontal: 30, overflow: "hidden" },
                  ]}>
                  <View style={GlobalStyleSheet.row}>
                    <View
                      style={[
                        GlobalStyleSheet.col50,
                        { alignSelf: "center", zIndex: 25 },
                      ]}>
                      <View style={{ paddingVertical: 10 }}>
                        <Text
                          style={[
                            FONTS.fontSemiBold,
                            { fontSize: 35, color: "#fff" },
                          ]}>
                          {data.title}
                        </Text>
                        <Text
                          style={[
                            FONTS.fontSemiBold,
                            {
                              fontSize: 16,
                              color: COLORS.secondary,
                              marginTop: -5,
                            },
                          ]}>
                          {data.text}
                        </Text>
                        <Text
                          style={[
                            FONTS.fontSemiBold,
                            {
                              fontSize: 16,
                              color: COLORS.white,
                              marginTop: 10,
                            },
                          ]}>
                          {data.price}*
                        </Text>
                        <View style={{ width: "55%", marginTop: 15 }}>
                          <Button
                            title="Buy Now"
                            size={"sm"}
                            color={COLORS.white}
                            text={COLORS.title}
                            onPress={() =>
                              navigation.navigate("ProductsDetails")
                            }
                          />
                        </View>
                      </View>
                    </View>
                    <View style={[GlobalStyleSheet.col50, {}]}>
                      <View
                        style={{
                          marginTop: -15,
                          marginBottom: -15,
                          marginLeft: -15,
                          marginRight: -15,
                          position: "absolute",
                          alignItems: "center",
                          bottom: data.bottom ? -10 : -50,
                          right: 15,
                          zIndex: 30,
                        }}>
                        <Image
                          style={{
                            height: 200,
                            width: 150,
                            //aspectRatio:1/1,
                            //resizeMode:'contain'
                          }}
                          source={data.image}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={{ position: "absolute", right: -90, top: -100 }}>
                    <Image
                      style={{
                        height: undefined,
                        width: "100%",
                        aspectRatio: 1 / 0.8,
                        resizeMode: "contain",
                      }}
                      source={IMAGES.bannerborder2}
                    />
                  </View>
                  <View
                    style={{ position: "absolute", bottom: -100, left: -130 }}>
                    <Image
                      style={{
                        height: undefined,
                        width: "100%",
                        aspectRatio: 1 / 0.5,
                        resizeMode: "contain",
                      }}
                      source={IMAGES.bannerborder1}
                    />
                  </View>
                </View>
              </LinearGradient>
            );
          })}
        </Swiper>

        {/* Subscriber Info Card */}
        <View style={[GlobalStyleSheet.container, { paddingHorizontal: 15, marginTop: 20 }]}>
          {/* Subscriber ID */}
          <Text style={{ ...FONTS.h4, color: colors.title, textAlign: 'center', marginBottom: 15 }}>
            Subscriber ID: 1186258214
          </Text>

          {/* Account Balance & Validity */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ ...FONTS.font, color: colors.text }}>Account Balance</Text>
              <Text style={{ ...FONTS.h5, color: colors.title }}>₹126.31</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ ...FONTS.font, color: colors.text }}>Valid Till</Text>
              <Text style={{ ...FONTS.h5, color: colors.title }}>Apr 18, 2025</Text>
            </View>
          </View>

          {/* Primary Box Card */}
          <View style={{ backgroundColor: colors.card, borderRadius: SIZES.radius, padding: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.20, shadowRadius: 1.41, elevation: 2 }}>
            {/* Active Badge */}
            <View style={{ position: 'absolute', top: 10, left: 10, backgroundColor: '#4CAF50', borderRadius: 5, paddingHorizontal: 8, paddingVertical: 3, flexDirection: 'row', alignItems: 'center' }}>
              <Image source={IMAGES.check} style={{ width: 12, height: 12, tintColor: COLORS.white, marginRight: 4 }} />
              <Text style={{ ...FONTS.fontXs, color: COLORS.white }}>Active</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
              {/* Left Side */}
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                  <Text style={{ ...FONTS.h6, color: colors.title }}>Primary Box</Text>
                  {/* Add Edit Icon Here */}
                  <TouchableOpacity style={{ marginLeft: 5 }}>
                    <Image source={IMAGES.write} style={{ width: 14, height: 14, tintColor: colors.text }}/>
                  </TouchableOpacity>
                </View>
                <Text style={{ ...FONTS.fontSm, color: colors.text, marginBottom: 10 }}>Primary Box ID: 1343</Text>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {/* Pause Icon Removed - No suitable replacement found in IMAGES */}
                  {/* <Image source={IMAGES.pause} style={{ width: 16, height: 16, tintColor: COLORS.primary, marginRight: 5 }} /> */}
                  <Text style={{ ...FONTS.fontSm, color: COLORS.primary }}>Pause Box</Text>
                </TouchableOpacity>
              </View>

              {/* Right Side - Box Upgrade */}
              <View style={{ alignItems: 'center' }}>
                 <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                   {/* Add Box Upgrade Icon Here */}
                   <Image source={IMAGES.arrowup} style={{ width: 14, height: 14, tintColor: COLORS.primary, marginRight: 3 }} />
                   <Text style={{ ...FONTS.fontXs, color: COLORS.primary }}>Box Upgrade</Text>
                 </TouchableOpacity>
                 <View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: SIZES.radius, padding: 5 }}>
                   {/* Replace with actual Tata Play HD image */}
                   <Image source={IMAGES.product1} style={{ width: 80, height: 50, resizeMode: 'contain' }} />
                   <Text style={{ ...FONTS.fontXs, color: colors.text, textAlign: 'center', marginTop: 3 }}>Tata Play HD</Text>
                 </View>
              </View>
            </View>

            {/* Channels & Monthly Charge */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, paddingTop: 15, borderTopWidth: 1, borderTopColor: colors.border }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ ...FONTS.fontSm, color: colors.text }}>Channels</Text>
                <Text style={{ ...FONTS.h5, color: colors.title }}>334</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ ...FONTS.fontSm, color: colors.text }}>Monthly Charge</Text>
                <Text style={{ ...FONTS.h5, color: colors.title }}>₹277.26</Text>
              </View>
            </View>
          </View>

          {/* View Channels Link */}
          <TouchableOpacity style={{ marginTop: 15, marginBottom: 20 }}>
            <Text style={{ ...FONTS.fontSm, color: COLORS.primary, textAlign: 'center' }}>
              View your channels, OTT apps & pricing
            </Text>
          </TouchableOpacity>

          {/* Action Buttons */}
          <Button
            title="Add Channels & More"
            size={'sm'}
            color={COLORS.primary}
            text={COLORS.white}
            style={{ marginBottom: 10 }}
            onPress={() => { /* Add navigation/action */ }}
          />
          <Button
            title="Drop Channels & More"
            size={'sm'}
            color={colors.card}
            text={COLORS.primary}
            style={{ marginBottom: 10, borderWidth: 1, borderColor: COLORS.primary }}
            onPress={() => { /* Add navigation/action */ }}
          />
          <Button
            title="Make Your Own Pack"
            size={'sm'}
            color={colors.card}
            text={COLORS.primary}
            style={{ marginBottom: 20, borderWidth: 1, borderColor: COLORS.primary }}
            onPress={() => { /* Add navigation/action */ }}
          />
        </View>

      </ScrollView>
      <BottomSheet2 ref={moresheet2} />
    </View>
  );
};

export default Home;
