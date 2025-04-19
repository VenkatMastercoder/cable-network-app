import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS, FONTS } from "../../constants/theme";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/RootStackParamList";
import OTPInput from "../../components/Input/OTPInput";
import Button from "../../components/Button/Button";
import * as Burnt from "burnt";
import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "../../api/auth/login/mutations";

type OTPAuthenticationScreenProps = StackScreenProps<
  RootStackParamList,
  "OTPAuthentication"
>;

const OTPAuthentication = ({
  route,
  navigation,
}: OTPAuthenticationScreenProps) => {
  const { otpId, mobile_number } = route.params;
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const [otpCode, setOTPCode] = useState("");
  const [isPinReady, setIsPinReady] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [resendTimer, setResendTimer] = useState(30);
  const maximumCodeLength = 6;

  const { mutateAsync: verifyOtp, isPending } = useVerifyOtpMutation();
  const { mutateAsync: resendOtp } = useResendOtpMutation();

  useEffect(() => {
    let timer: any;
    if (isResendDisabled) {
      timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setIsResendDisabled(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isResendDisabled]);

  const verifyOTP = async () => {
    try {
      const response = await verifyOtp({ otpId, otpCode });

      if (response.success) {
        navigation.navigate("DrawerNavigation", { screen: "Home" });
      } else {
        Burnt.toast({
          title: "Invalid OTP",
          message: "Invalid OTP. Please try again.",
          preset: "done",
          haptic: "warning",
        });
      }
    } catch (error:any) {
      Burnt.toast({
        title: error.response.data.message || "An error occurred",
        message: error.response.data.message || "An error occurred. Please try again.",
        preset: "done",
        haptic: "error",
      });
    }
  };

  const resendOTP = async () => {
    setIsResendDisabled(true);
    try {
      const response = await resendOtp({ otpId });


      if (response.success) {
        Burnt.toast({
          title: "OTP Resent",
          message: "OTP Resent Successfully.",
          preset: "done",
          haptic: "success",
        });
        setIsResendDisabled(true);
        setResendTimer(30);
      } else {
        Burnt.toast({
          title: "Please try again.",
          message: "Please try again.",
          preset: "done",
          haptic: "error",
        });
        setIsResendDisabled(false);
      }
    } catch (error:any) {
      Burnt.toast({
        title: error.response.data.message || "An error occurred",
        message: "An error occurred. Please try again.",
        preset: "done",
        haptic: "error",
      });
      setIsResendDisabled(false);
    }
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather size={24} color={COLORS.card} name={"arrow-left"} />
            </TouchableOpacity>
            <Text
              style={[FONTS.fontMedium, { fontSize: 20, color: COLORS.card }]}>
              OTP
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
              Please enter the OTP sent to
            </Text>
            <Text
              style={[
                FONTS.fontMedium,
                { fontSize: 18, color: COLORS.primary },
              ]}>
              {mobile_number}
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
              </View>
            </View>
            <TouchableOpacity
              style={{ paddingTop: 0 }}
              onPress={resendOTP}
              disabled={isResendDisabled}>
              <Text
                style={[
                  FONTS.fontMedium,
                  {
                    fontSize: 12,
                    color: isResendDisabled ? COLORS.gray : COLORS.primary,
                    textAlign: "right",
                  },
                ]}>
                {isResendDisabled
                  ? `Resend OTP in ${resendTimer}s`
                  : "Resend OTP"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <View>
            <Button
              title={isPending ? "Please wait..." : "Continue"}
              onPress={verifyOTP}
              disabled={isPending || otpCode.length !== maximumCodeLength}
              text={COLORS.white}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTPAuthentication;
