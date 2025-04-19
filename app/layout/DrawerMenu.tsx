import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { IMAGES } from "../constants/Images";
import { COLORS, FONTS } from "../constants/theme";
import FeatherIcon from "react-native-vector-icons/Feather";
//import { Feather } from '@expo/vector-icons';
import ThemeBtn from "../components/ThemeBtn";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../redux/actions/drawerAction";
import useUserStore from "../store/useStore";

const MenuItems = [
  {
    icon: IMAGES.home,
    name: "Home",
    navigate: "DrawerNavigation",
  },
  {
    icon: IMAGES.user3,
    name: "Profile",
    navigate: "Profile",
  },
  {
    icon: IMAGES.logout,
    name: "Logout",
    navigate: "SingIn",
  },
];

const DrawerMenu = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { colors }: { colors: any } = theme;
  const userDataStore = useUserStore((state: any) => state.user);
  const clearUserData = useUserStore((state: any) => state.clearUserData);


  const navigation = useNavigation<any>();
  // const initials = userDataStore.user.full_name
  //   .split(' ')
  //   .map((name: string) => name[0])
  //   .join('')
  //   .toUpperCase()
  //   .substring(0, 2);

  const handleMenuItemPress = (item: any) => {
    dispatch(closeDrawer());

    // If logout is clicked, clear user data from store
    if (item.name === "Logout") {
      clearUserData();
      navigation.navigate("SingIn");
    }

    navigation.navigate(item.navigate);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.dark ? COLORS.title : colors.card,
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: COLORS.primaryLight,
            paddingBottom: 20,
            paddingTop: 10,
            marginHorizontal: -15,
            paddingHorizontal: 15,
          }}>
             <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: COLORS.primaryLight,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
            borderWidth: 2,
            borderColor: COLORS.primary,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
            <Text style={{
              ...FONTS.h1,
              color: COLORS.primary,
              fontSize: 28,
              fontWeight: 'bold',
            }}>{
              userDataStore?.full_name?.split(' ').map((name: string) => name[0]).join('').toUpperCase().substring(0, 2)
              }</Text>
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <Text
              style={[
                FONTS.fontSemiBold,
                { color: colors.title, fontSize: 18 },
              ]}>
              {userDataStore?.full_name}
            </Text>
            <Text
              style={[
                FONTS.fontRegular,
                { color: COLORS.primary, fontSize: 15 },
              ]}>
              {userDataStore?.mobile_no}
            </Text>
          </View>
          <View style={{ position: "absolute", right: 10, top: 0 }}>
            {/* <ThemeBtn /> */}
          </View>
        </View>
        <View style={{ flex: 1, paddingVertical: 15 }}>
          {MenuItems.map((data, index) => {
            return (
              <TouchableOpacity
                onPress={() => handleMenuItemPress(data)}
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 5,
                  marginBottom: 0,
                  justifyContent: "space-between",
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderWidth: 1,
                      borderColor: COLORS.primaryLight,
                      borderRadius: 4,
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <Image
                      source={data.icon}
                      style={{
                        height: 18,
                        width: 18,
                        tintColor: COLORS.primary,
                        //marginRight:14,
                        resizeMode: "contain",
                      }}
                    />
                  </View>
                  <Text
                    style={[
                      FONTS.fontRegular,
                      { color: colors.title, fontSize: 16 },
                    ]}>
                    {data.name}
                  </Text>
                </View>
                <FeatherIcon
                  size={20}
                  color={colors.title}
                  name={"chevron-right"}
                />
                {/* <Feather size={18} color={colors.title} name='chevron-right' /> */}
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={{
            paddingVertical: 10,
            borderTopWidth: 1,
            borderTopColor: COLORS.primaryLight,
            marginHorizontal: -15,
            paddingHorizontal: 15,
          }}>
          <Text
            style={[FONTS.fontSemiBold, { color: colors.title, fontSize: 13 }]}>
            Cable Pilot
          </Text>
          <Text
            style={[FONTS.fontRegular, { color: colors.title, fontSize: 13 }]}>
            App Version 1.0
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DrawerMenu;
