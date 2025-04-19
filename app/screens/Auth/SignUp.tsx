import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS } from "../../constants/theme";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { useTheme } from "@react-navigation/native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/RootStackParamList";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import SelectCountery from "../../components/SelectCountery";

type SignUpScreenProps = StackScreenProps<RootStackParamList, "SignUp">;

const SignUp = ({ navigation }: SignUpScreenProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const [show, setshow] = useState(true);

  const [inputValue, setInputValue] = useState("");

  const handleChange = (text: any) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setInputValue(numericValue);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <View style={[GlobalStyleSheet.container, { paddingVertical: 20 }]}>
        <View
          style={[
            GlobalStyleSheet.row,
            { alignItems: "center", justifyContent: "space-between" },
          ]}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              //style={[styles.actionBtn,{}]}
            >
              <Feather size={24} color={COLORS.card} name={"arrow-left"} />
            </TouchableOpacity>
            <Text
              style={[FONTS.fontMedium, { fontSize: 20, color: COLORS.card }]}>
              Create Account
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.dark ? colors.background : colors.card,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}>
        <View
          style={[GlobalStyleSheet.container, { flexGrow: 1, marginTop: 15 }]}>
          <ScrollView>
            <Text
              style={[FONTS.fontMedium, { fontSize: 18, color: colors.title }]}>
              Fresh Arrival, Ready To Explore?
            </Text>
            <Text
              style={[FONTS.fontRegular, { fontSize: 14, color: colors.text }]}>
              Register Using Your Phone Number To Begin
            </Text>
            <View style={{ paddingTop: 15 }}>
              <Text
                style={[
                  FONTS.fontMedium,
                  { fontSize: 14, color: colors.text },
                ]}>
                Your Name
              </Text>
              <Input
                inputBorder
                icon={
                  <FontAwesome
                    style={{}}
                    name={"user"}
                    size={20}
                    color={COLORS.primary}
                  />
                }
                // placeholder="Enter Username"
                onChangeText={(value) => console.log(value)}
                style={{ borderColor: COLORS.primary, paddingLeft: 40 }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 15,
                paddingBottom: 5,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setshow(!show);
                }}>
                <Text
                  style={[
                    FONTS.fontMedium,
                    {
                      fontSize: 14,
                      color: show ? colors.text : COLORS.primary,
                    },
                  ]}>
                  Enter Mobile Number
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setshow(!show);
                }}>
                <Text
                  style={[
                    FONTS.fontMedium,
                    {
                      fontSize: 12,
                      color: show ? COLORS.primary : colors.text,
                    },
                  ]}>
                  Use Email Id
                </Text>
              </TouchableOpacity>
            </View>
            {show ? (
              <View>
                <Input
                  inputBorder
                  value={inputValue}
                  onChangeText={(value) => handleChange(value)}
                  keyboardType={"number-pad"}
                  style={{ borderColor: COLORS.primary, paddingLeft: 70 }}
                />
                <View style={{ position: "absolute", top: 12, left: 0 }}>
                  <SelectCountery />
                </View>
              </View>
            ) : (
              <View>
                <Input
                  inputBorder
                  onChangeText={(value) => console.log(value)}
                  style={{ borderColor: COLORS.primary, paddingLeft: 0 }}
                />
              </View>
            )}
            <View style={{ paddingTop: 10 }}>
              <Text
                style={[
                  FONTS.fontRegular,
                  { fontSize: 14, color: colors.title },
                ]}>
                By continuing, you agree to Cable Pilot's{" "}
                <Text style={[FONTS.fontSemiBold, { color: COLORS.primary }]}>
                  Terms of Use
                </Text>
                {"\n"}and{" "}
                <Text style={[FONTS.fontSemiBold, { color: COLORS.primary }]}>
                  Privacy Policy
                </Text>
                .
              </Text>
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 15,
              gap: 5,
            }}>
            <Text
              style={[
                FONTS.fontRegular,
                { fontSize: 15, color: colors.title },
              ]}>
              Existing User?
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("SingIn")}>
              <Text
                style={[
                  FONTS.fontRegular,
                  {
                    fontSize: 16,
                    color: COLORS.primary,
                    textDecorationLine: "underline",
                    textDecorationColor: COLORS.primary,
                  },
                ]}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <Button
              title={"Continue"}
              onPress={() => navigation.navigate("SingIn")}
              text={COLORS.white}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
