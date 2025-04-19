import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { COLORS, FONTS } from "../../constants/theme";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/RootStackParamList";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import SelectCountery from "../../components/SelectCountery";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Burnt from "burnt";
import { useLoginUserMutation } from "../../api/auth/login/mutations";
import useUserStore from "../../store/useStore";
import RBSheet from "react-native-raw-bottom-sheet";
// import NoInternetModal from "../../components/Modal/NoInternetModal";
// import { useCheckNetwork } from "../../hooks/useCheckNetwork";

type SingInScreenProps = StackScreenProps<RootStackParamList, "SingIn">;

const signInSchema = z.object({
  mobile_number: z.string().regex(/^\d{10}$/, "Invalid phone number"),
});

const SignIn = ({ navigation, route }: SingInScreenProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  const sheetRef = useRef<RBSheet | null>(null);
  const [show, setShow] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mutateAsync: loginUser } = useLoginUserMutation();

  const tokens = useUserStore((state) => state.tokens);

  const [isConnected, setIsConnected] = useState(null);
  const [refershNet, setRefershNet] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (has tokens)
    console.log("tokens", tokens);
    if (tokens && tokens.token_data.access_token) {
      // Navigate to Home if user has valid tokens
      console.log("navigating to home");
      navigation.navigate("DrawerNavigation", { screen: "Home" });
    }
  }, [tokens, navigation]);

  useEffect(() => {
    // Disable swipe back gesture
    navigation.setOptions({
      gestureEnabled: false,
    });

    const handleBackPress = () => {
      // Either prevent going back or navigate to a specific screen
      return true; // Returning true prevents the default back action
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: any) => {
    // const checkNetworkConnection = useCheckNetwork();
    // if (!(await checkNetworkConnection())) return;
    setLoading(true);
    try {
      if (isConnected === false) {
        Burnt.toast({
          title: "No internet connection",
          message: "Please check your internet connection and try again.",
          preset: "error",
          haptic: "error",
        });
        return;
      }
      const response = await loginUser({ mobile_number: data.mobile_number });

      if (response.success) {
        Burnt.toast({
          title: "Otp Sent",
          message: "Otp sent successfully.",
          preset: "done",
          haptic: "success",
        });
        navigation.navigate("OTPAuthentication", {
          otpId: response.data.otp_id,
          mobile_number: response.data.mobile_number,
        });
      } else {
        Burnt.toast({
          title: "Failed to send OTP",
          message: "Failed to send OTP. Please try again.",
          preset: "error",
          haptic: "error",
        });
      }
    } catch (error) {
      Burnt.toast({
        title: "User Not Found",
        message: "No account found with this mobile number. Please register.",
        preset: "error",
        haptic: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <View style={[GlobalStyleSheet.container, { paddingVertical: 20 }]}>
        {/* {showAlert && (
          <NoInternetModal
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            setRefreshNet={setRefershNet}
          />
        )} */}
        <View
          style={[
            GlobalStyleSheet.row,
            { alignItems: "center", justifyContent: "space-between" },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>

            <Text
              style={[FONTS.fontMedium, { fontSize: 20, color: COLORS.card }]}
            >
              Cable Pilot
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.dark ? colors.background : COLORS.card,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <View
          style={[GlobalStyleSheet.container, { flexGrow: 1, marginTop: 15 }]}
        >
          <ScrollView>
            <Text
              style={[FONTS.fontMedium, { fontSize: 18, color: colors.title }]}
            >
              Login For The Best Experience
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 15,
                paddingBottom: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setShow(!show);
                }}
              >
                <Text
                  style={[
                    FONTS.fontMedium,
                    {
                      fontSize: 14,
                      color: show ? colors.text : COLORS.primary,
                    },
                  ]}
                >
                  Enter Mobile Number
                </Text>
              </TouchableOpacity>
            </View>
            {
              <View>
                <Controller
                  control={control}
                  rules={{ required: true, pattern: /^[0-9]+$/ }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      inputBorder
                      value={value}
                      onChangeText={onChange}
                      keyboardType={"number-pad"}
                      style={{ borderColor: COLORS.primary, paddingLeft: 70 }}
                      onBlur={onBlur}
                    />
                  )}
                  name="mobile_number"
                  defaultValue=""
                />
                {errors.mobile_number && (
                  <Text style={[{ color: "red" }, FONTS.fontMedium]}>
                    {errors?.mobile_number?.message?.toString() || ""}
                  </Text>
                )}
                <View style={{ position: "absolute", top: 12, left: 0 }}>
                  <SelectCountery />
                </View>
              </View>
            }
            {/* <View style={{ paddingTop: 10 }}>
              <Text
                style={[
                  FONTS.fontRegular,
                  { fontSize: 14, color: colors.title },
                ]}
              >
                By continuing, you agree to SM Commerce{" "}
                <Text
                  style={[FONTS.fontSemiBold, { color: COLORS.primary }]}
                  onPress={() => {
                    navigation.navigate("Terms");
                  }}
                >
                  Terms of Use
                </Text>
                {"\n"}and{" "}
                <Text
                  style={[FONTS.fontSemiBold, { color: COLORS.primary }]}
                  onPress={() => {
                    navigation.navigate("Privacy");
                  }}
                >
                  Privacy Policy
                </Text>
                .
              </Text>
            </View> */}
          </ScrollView>
          <View>
            <Button
              title={loading ? "Please wait..." : "Continue"}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              text={COLORS.white}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
