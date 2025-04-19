import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { GlobalStyleSheet } from "../constants/StyleSheet";
import { SIZES, FONTS, COLORS } from "../constants/theme";
import { IMAGES } from "../constants/Images";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Props = {
  state: any;
  navigation: any;
  descriptors: any;
};

const BottomMenu = ({ state, navigation, descriptors }: Props) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const [tabWidth, setWidth] = useState(wp("100%"));

  const tabWD = tabWidth < SIZES.container ? tabWidth / 4 : SIZES.container / 4;

  const circlePosition = useRef(new Animated.Value(0)).current;

  Dimensions.addEventListener("change", (val) => {
    setWidth(val.window.width);
  });

  useEffect(() => {
    Animated.spring(circlePosition, {
      toValue: state.index * tabWD,
      useNativeDriver: true,
    }).start();
  }, [state.index, tabWidth]);

  const onTabPress = (index: any) => {
    const tabW =
      tabWidth < SIZES.container ? tabWidth / 4 : SIZES.container / 4; // Adjust this according to your tab width

    Animated.spring(circlePosition, {
      toValue: index * tabW,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      style={{
        backgroundColor: theme.dark ? "rgba(0,3,3,1)" : colors.card,
      }}>
      <View
        style={[
          styles.tabBar,
          {
            borderTopColor: colors.border,
          },
        ]}>
        <View
          style={[
            GlobalStyleSheet.container,
            {
              flexDirection: "row",
              paddingHorizontal: 0,
              paddingTop: 0,
              paddingBottom: 0,
            },
          ]}>
          <Animated.View
            style={{ transform: [{ translateX: circlePosition }] }}>
            <View
              style={{
                width:
                  tabWidth < SIZES.container
                    ? tabWidth / 4
                    : SIZES.container / 4,
                position: "absolute",
                //backgroundColor:'red',
                zIndex: 1,
                top: 0,
                left: 0,
                alignItems: "center",
                justifyContent: "center",
              }}>
              {/* <View
                                    style={{
                                        height:65,
                                        width:65,
                                        borderRadius:0,
                                        backgroundColor:'rgba(255,255,255,.1)',
                                        position:'absolute',
                                    }}
                                /> */}
              <View
                style={{
                  height: 4,
                  width: 54,
                  borderRadius: 4,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  backgroundColor: theme.dark ? COLORS.white : COLORS.primary,
                }}
              />
            </View>
          </Animated.View>

          {state.routes.map((route: any, index: string) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const iconTranslateY = useRef(new Animated.Value(0)).current;
            Animated.timing(iconTranslateY, {
              toValue: isFocused ? -20 : 0,
              duration: 200,
              useNativeDriver: true,
            }).start();

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate({ name: route.name, merge: true });
                onTabPress(index);
              }
            };

            return (
              <View key={index} style={styles.tabItem}>
                <TouchableOpacity onPress={onPress} style={styles.tabLink}>
                  {/* <Animated.View
                                            style={{
                                                transform: [{translateY: iconTranslateY}],
                                        }}> */}
                  <Image
                    style={
                      label == "Profile"
                        ? {
                            height: 24,
                            width: 24,
                            borderRadius: 50,
                            marginBottom: 2,
                            resizeMode: "contain",
                          }
                        : {
                            height: 24,
                            width: 24,
                            marginBottom: 2,
                            resizeMode: "contain",
                            tintColor: isFocused
                              ? COLORS.primary
                              : colors.title,
                            //tintColor:colors.title
                          }
                    }
                    source={
                      label === "Home"
                        ? IMAGES.Home
                        : label === "Category"
                        ? IMAGES.grid
                        : label === "MyCart"
                        ? IMAGES.mycart
                        : label === "Wishlist"
                        ? IMAGES.heart2
                        : label === "Profile"
                        ? IMAGES.small6
                        : label === "Support"
                        ? IMAGES.technicalsupport
                        : label === "Bills"
                        ? IMAGES.card2
                        : label === "Tickets"
                        ? IMAGES.payment
                        : IMAGES.Home
                    }
                  />
                  {/* </Animated.View> */}
                  <Text
                    style={[
                      styles.navText,
                      { color: isFocused ? COLORS.primary : colors.title },
                    ]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    //borderTopWidth:1,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    paddingTop: 10,
  },
  tabLink: {
    alignItems: "center",
  },
  navText: {
    ...FONTS.fontRegular,
    fontSize: 13,
  },
});

export default BottomMenu;
