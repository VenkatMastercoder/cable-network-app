import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
//import FeatherIcon from 'react-native-vector-icons/Feather';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/RootStackParamList";
import Input from "../../components/Input/Input";
import { IMAGES } from "../../constants/Images";
import Button from "../../components/Button/Button";
import OTPInput from "../../components/Input/OTPInput";
//import OTPInputView from '@twotalltotems/react-native-otp-input'

type OTPAuthenticationScreenProps = StackScreenProps<
  RootStackParamList,
  "OTPAuthentication"
>;

const OTPAuthentication = ({ navigation }: OTPAuthenticationScreenProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const [otpCode, setOTPCode] = useState("");
  const [isPinReady, setIsPinReady] = useState(false);
  const maximumCodeLength = 6;

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
              OTP
            </Text>
          </View>
          {/* <TouchableOpacity>
                    <Text style={[FONTS.fontRegular,{fontSize:16,color:colors.card,textDecorationLine:'underline'}]}>Skip</Text>
                </TouchableOpacity> */}
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
              Please enter the OTP sent to
            </Text>
            <Text
              style={[
                FONTS.fontMedium,
                { fontSize: 18, color: COLORS.primary },
              ]}>
              +91 897654123
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 15,
              }}>
              <Text
                style={[
                  FONTS.fontMedium,
                  { fontSize: 14, color: colors.text },
                ]}>
                Enter OTP
              </Text>
            </View>
            <View>
              <View style={{ marginBottom: 20 }}>
                <OTPInput
                  code={otpCode}
                  setCode={setOTPCode}
                  maximumLength={maximumCodeLength}
                  setIsPinReady={setIsPinReady}
                />
                {/* <StatusBar barStyle={'light-content'}/> */}
              </View>
            </View>
            <TouchableOpacity style={{ paddingTop: 0 }}>
              <Text
                style={[
                  FONTS.fontMedium,
                  { fontSize: 12, color: COLORS.primary, textAlign: "right" },
                ]}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={{}}>
            <Button
              title={"Continue"}
              //onPress={() => navigation.navigate('OTPAuthentication')}
              onPress={() =>
                navigation.navigate("DrawerNavigation", { screen: "Home" })
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTPAuthentication;
