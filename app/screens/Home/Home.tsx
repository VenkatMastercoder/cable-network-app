import React, { useRef, useState, useEffect, memo } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  StyleSheet,
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
// @ts-ignore
import Swiper from "react-native-swiper/src";
import { getHomeDataApi } from "../../api/home/queries";
import useUserStore from "../../store/useStore";
import BannerSwiper from "./_components/Banner/Banner";
import moment from "moment";

// Types for API data
interface Plan {
  plan_id: string;
  plan_name: string;
  plan_price: number;
  total_no_of_channel: number;
}

interface Bill {
  bill_no: string;
  bill_date: string;
  bill_amount: number;
  plan_id: string;
  payment_id: string;
  user_id: string;
}

interface Payment {
  payment_id: string;
  user_id: string;
  amount: number;
  method: string;
  status: string;
  paid_on: string;
}

interface Ticket {
  ticket_no: string;
  raised_on: string;
  closure_on: string | null;
  ticket_type: string;
  status: string;
  issue_description: string;
  user_id: string;
}

interface SetTopBox {
  stb_id: string;
  serial_no: string;
  model: string;
  activated_on: string;
  is_active: boolean;
  user_id: string;
}

interface User {
  user_id: string;
  account_no: string;
  full_name: string;
  email_id: string;
  mobile_no: string;
  communication_address: string;
  service_address: string;
  role: string;
  plan: Plan;
  bills: Bill[];
  payments: Payment[];
  tickets: Ticket[];
  setTopBoxes: SetTopBox[];
}

interface HomeData {
  success: boolean;
  message: string;
  data: {
    banners: any[];
    user: User;
  };
}

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
  const userData = useUserStore((state: any) => state.user);
  const userDataStore = useUserStore((state: any) => state.user);
  const theme = useTheme();
  const { colors }: { colors: any } = theme;


  //const navigation = useNavigation()

  const moresheet2 = useRef<any>(null);

  const [data, setData] = useState<HomeData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const MemoizedBannerSwiper = memo(BannerSwiper);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(false);
      try {
        const result = await getHomeDataApi(userData?.user_id);
        setData(result);
      } catch (error) {
        console.error("Error fetching home data:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const daysLeft = (dateString: string) => {
    const date = new Date(dateString);
    const expiryDate = moment(date).add(30, 'days');
    const today = moment();
    const daysLeft = expiryDate.diff(today, 'days');
    return daysLeft;
  }

  const user = data?.data?.user;
  const plan = user?.plan;
  const setTopBox = user?.setTopBoxes?.[0];

  const addItemToWishList = (data: any) => {
    dispatch(addTowishList(data));
  };

  // Header component - shared across all states
  const renderHeader = () => (
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
            <Text style={{ ...FONTS.font, color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>Cable Pilot</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      {renderHeader()}

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={[styles.loaderText, { color: colors.text }]}>Loading dashboard...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>Could not load dashboard data. Please try again later.</Text>
        </View>
      ) : !data?.data?.user ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.text }]}>No user data available.</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
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
            {/* {bannerData.map((data: any, index) => {
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
            })} */}

             <MemoizedBannerSwiper bannerData={data?.data?.banners} />
          </Swiper>

          <View style={[GlobalStyleSheet.container, { paddingHorizontal: 15, marginTop: 20 }]}>
            {/* Subscriber ID */}
            <Text style={{ ...FONTS.h4, color: colors.title, textAlign: 'center', marginBottom: 15 }}>
              Customer ID: {data.data.user.account_no}
            </Text>

            {/* Account Balance & Validity */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ ...FONTS.font, color: colors.text }}>Plan Price</Text>
                <Text style={{ ...FONTS.h5, color: colors.title }}>₹{plan?.plan_price.toFixed(2)}</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ ...FONTS.font, color: colors.text }}>Last Payment</Text>
                <Text style={{ ...FONTS.h5, color: colors.title }}>
                  {data.data.user.payments.length > 0
                    ? formatDate(data.data.user.payments[0].paid_on)
                    : 'N/A'}
                </Text>
              </View>
            </View>

            {/* Set Top Box Card */}
            {setTopBox && (

              <View style={{ backgroundColor: colors.card, borderRadius: SIZES.radius, padding: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.20, shadowRadius: 1.41, elevation: 2, marginBottom: 15 }}>
                {/* Active Badge */}
                <View style={{ zIndex: 100 , position: 'absolute', top: 10, right: 10, backgroundColor: setTopBox.is_active ? '#4CAF50' : COLORS.danger, borderRadius: 5, paddingHorizontal: 8, paddingVertical: 3, flexDirection: 'row', alignItems: 'center' }}>
                  {setTopBox.is_active ? (
                    <Image source={IMAGES.check} style={{ width: 12, height: 12, tintColor: COLORS.white, marginRight: 4 }} />
                  ) : (
                    <Image source={IMAGES.close} style={{ width: 12, height: 12, tintColor: COLORS.white, marginRight: 4 }} />
                  )}
                  <Text style={{ ...FONTS.fontXs, color: COLORS.white }}>{setTopBox.is_active ? 'Active' : 'Inactive'}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  {/* Left Side */}
                  <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                      <Text style={{ ...FONTS.h6, color: colors.title }}>Set Top Box</Text>

                    </View>
                    <Text style={{ ...FONTS.fontSm, color: colors.text, marginBottom: 5 }}>Model: {setTopBox.model}</Text>
                    <Text style={{ ...FONTS.fontSm, color: colors.text, marginBottom: 10 }}>Serial No: {setTopBox.serial_no}</Text>

                  </View>

                  {/* Right Side */}
                  <View style={{ alignItems: 'center' }}>

                    <View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: SIZES.radius, padding: 5 }}>
                      <Image source={IMAGES.product1} style={{ width: 80, height: 50, resizeMode: 'contain'}} />
                      <Text style={{ ...FONTS.fontXs, color: colors.text, textAlign: 'center', marginTop: 3 }}>{setTopBox.model}</Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, paddingTop: 15, borderTopWidth: 1, borderTopColor: colors.border }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ ...FONTS.fontSm, color: colors.text }}>Activated On</Text>
                    <Text style={{ ...FONTS.h6, color: colors.title }}>{formatDate(setTopBox.activated_on)}</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ ...FONTS.fontSm, color: colors.text }}>Expires In</Text>
                    <Text style={{ ...FONTS.h6, color: colors.title }}>{daysLeft(setTopBox.activated_on) > 0 ? daysLeft(setTopBox.activated_on) + " days" : "Expired"}</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Plan Details */}
            <View style={{ backgroundColor: colors.card, borderRadius: SIZES.radius, padding: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.20, shadowRadius: 1.41, elevation: 2, marginBottom: 15 }}>
              <Text style={{ ...FONTS.h5, color: colors.title, marginBottom: 10 }}>Plan Details</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ ...FONTS.font, color: colors.text }}>Plan Name:</Text>
                <Text style={{ ...FONTS.fontSemiBold, color: colors.title }}>{plan?.plan_name}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ ...FONTS.font, color: colors.text }}>Monthly Charge:</Text>
                <Text style={{ ...FONTS.fontSemiBold, color: colors.title }}>₹{plan?.plan_price.toFixed(2)}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ ...FONTS.font, color: colors.text }}>Total Channels:</Text>
                <Text style={{ ...FONTS.fontSemiBold, color: colors.title }}>{plan?.total_no_of_channel}</Text>
              </View>
            </View>

            {/* Recent Bills */}
            {data.data.user.bills.length > 0 && (
              <View style={{ backgroundColor: colors.card, borderRadius: SIZES.radius, padding: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.20, shadowRadius: 1.41, elevation: 2, marginBottom: 15 }}>
                <Text style={{ ...FONTS.h5, color: colors.title, marginBottom: 10 }}>Recent Bill</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text style={{ ...FONTS.font, color: colors.text }}>Bill No:</Text>
                  <Text style={{ ...FONTS.fontSemiBold, color: colors.title }}>{data.data.user.bills[0].bill_no.substring(0, 10)}...</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text style={{ ...FONTS.font, color: colors.text }}>Bill Date:</Text>
                  <Text style={{ ...FONTS.fontSemiBold, color: colors.title }}>{formatDate(data.data.user.bills[0].bill_date)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text style={{ ...FONTS.font, color: colors.text }}>Amount:</Text>
                  <Text style={{ ...FONTS.fontSemiBold, color: colors.title }}>₹{data.data.user.bills[0].bill_amount.toFixed(2)}</Text>
                </View>
              </View>
            )}

            {/* Recent Tickets */}
            {data.data.user.tickets.length > 0 && (
              <View style={{ backgroundColor: colors.card, borderRadius: SIZES.radius, padding: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.20, shadowRadius: 1.41, elevation: 2, marginBottom: 15 }}>
                <Text style={{ ...FONTS.h5, color: colors.title, marginBottom: 10 }}>Recent Tickets</Text>
                {data.data.user.tickets.slice(0, 2).map((ticket, index) => (
                  <View key={ticket.ticket_no} style={{ marginBottom: index < data.data.user.tickets.length - 1 ? 15 : 0, borderBottomWidth: index < data.data.user.tickets.length - 1 ? 1 : 0, borderBottomColor: colors.border, paddingBottom: index < data.data.user.tickets.length - 1 ? 15 : 0 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                      <Text style={{ ...FONTS.fontSm, color: colors.text }}>Ticket No:</Text>
                      <Text style={{ ...FONTS.fontSm, color: colors.title }}>{ticket.ticket_no.substring(0, 10)}...</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                      <Text style={{ ...FONTS.fontSm, color: colors.text }}>Type:</Text>
                      <Text style={{ ...FONTS.fontSm, color: colors.title }}>{ticket.ticket_type}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                      <Text style={{ ...FONTS.fontSm, color: colors.text }}>Status:</Text>
                      <Text style={{ ...FONTS.fontSm, color: ticket.status === 'OPEN' ? COLORS.danger : COLORS.success }}>{ticket.status}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ ...FONTS.fontSm, color: colors.text }}>Description:</Text>
                      <Text style={{ ...FONTS.fontSm, color: colors.title, maxWidth: '60%', textAlign: 'right' }}>{ticket.issue_description}</Text>
                    </View>
                  </View>
                ))}

              </View>
            )}

            {/* Contact Info */}
            {/* <View style={{ backgroundColor: colors.card, borderRadius: SIZES.radius, padding: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.20, shadowRadius: 1.41, elevation: 2, marginBottom: 20 }}>
              <Text style={{ ...FONTS.h5, color: colors.title, marginBottom: 10 }}>Contact Info</Text>
              <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Text style={{ ...FONTS.font, color: colors.text, width: 100 }}>Name:</Text>
                <Text style={{ ...FONTS.fontSemiBold, color: colors.title, flex: 1 }}>{data.data.user.full_name}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Text style={{ ...FONTS.font, color: colors.text, width: 100 }}>Mobile:</Text>
                <Text style={{ ...FONTS.fontSemiBold, color: colors.title, flex: 1 }}>{data.data.user.mobile_no}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Text style={{ ...FONTS.font, color: colors.text, width: 100 }}>Email:</Text>
                <Text style={{ ...FONTS.fontSemiBold, color: colors.title, flex: 1 }}>{data.data.user.email_id}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ ...FONTS.font, color: colors.text, width: 100 }}>Address:</Text>
                <Text style={{ ...FONTS.fontSemiBold, color: colors.title, flex: 1 }}>{data.data.user.service_address}</Text>
              </View>
            </View> */}

            {/* Action Buttons */}
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <TouchableOpacity style={{ backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 12, paddingHorizontal: 15, flex: 1, marginRight: 10, alignItems: 'center' }}>
                <Text style={{ ...FONTS.fontSm, color: COLORS.white }}>Pay Bill</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: SIZES.radius, paddingVertical: 12, paddingHorizontal: 15, flex: 1, alignItems: 'center' }}>
                <Text style={{ ...FONTS.fontSm, color: colors.title }}>Raise Ticket</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </ScrollView>
      )}
      <BottomSheet2 ref={moresheet2} />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loaderText: {
    marginTop: 10,
    ...FONTS.font,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    ...FONTS.font,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    ...FONTS.font,
  },
});

export default Home;
