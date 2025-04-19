import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Theme, useTheme } from "@react-navigation/native";
import Header from "../../layout/Header";
import { IMAGES } from "../../constants/Images";
import { COLORS, FONTS } from "../../constants/theme";
import FeatherIcon from "react-native-vector-icons/Feather";
// import { Ionicons } from '@expo/vector-icons';
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/RootStackParamList";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CHATBOT_DATA } from "../../constants/ChatbotData";
import ChatBotOption from "../../components/ChatBotOption";
import ChatFlow from "../../components/ChatFlow";
import FinalActions from "../../components/FinalActions";

const UserAvatar = () => (
  <View style={styles.avatarContainer}>
    <FeatherIcon name="user" size={20} color={COLORS.white} />
  </View>
);

const SupportAvatar = () => (
  <View style={[styles.avatarContainer, styles.supportAvatarContainer]}>
    <FeatherIcon name="headphones" size={20} color={COLORS.white} />
  </View>
);


type SinglechatScreenProps = StackScreenProps<RootStackParamList, "Singlechat">;

interface ChatState {
  selectedIssue: number | null;
  currentStep: number;
  isResolved: boolean;
}

interface ExtendedTheme extends Theme {
  colors: Theme['colors'] & {
    title: string;
  };
}

interface Message {
  text: string;
  isBot: boolean;
  timestamp: string;
  options?: { text: string; onPress: () => void }[];
}

const Singlechat = () => {
  const theme = useTheme() as ExtendedTheme;
  const { colors } = theme;
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatState, setChatState] = useState<ChatState>({
    selectedIssue: null,
    currentStep: -1,
    isResolved: false,
  });

  useEffect(() => {
    loadChatState();
  }, []);

  useEffect(() => {
    // Initial greeting
    if (messages.length === 0) {
      addMessage({
        text: "Hello! How can I help you today?",
        isBot: true,
        timestamp: getCurrentTime(),
        options: [
          {
            text: "Account Information",
            onPress: () => handleSection("Account Information")
          },
          {
            text: "Troubleshooting",
            onPress: () => handleSection("Troubleshooting")
          },
          {
            text: "Billing & Payments",
            onPress: () => handleSection("Billing & Payments")
          },
        ]
      });
    }
  }, []);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const loadChatState = async () => {
    try {
      const savedState = await AsyncStorage.getItem('chatState');
      if (savedState) {
        setChatState(JSON.parse(savedState));
      }
    } catch (error) {
      console.error('Error loading chat state:', error);
    }
  };

  const handleIssueSelect = (index: number) => {
    // Add user selection message
    addMessage({
      text: CHATBOT_DATA[index].title,
      isBot: false,
      timestamp: getCurrentTime(),
    });

    // Add bot response with first step
    addMessage({
      text: CHATBOT_DATA[index].steps[0],
      isBot: true,
      timestamp: getCurrentTime(),
      options: [
        { text: "Next Step", onPress: () => handleNextStep(index, 0) },
        { text: "Start Over", onPress: handleReset },
      ]
    });

    setChatState({
      selectedIssue: index,
      currentStep: 0,
      isResolved: false,
    });
  };

  const handleNextStep = (issueIndex: number, stepIndex: number) => {
    const currentIssue = CHATBOT_DATA[issueIndex];
    const nextStepIndex = stepIndex + 1;

    if (nextStepIndex < currentIssue.steps.length) {
      addMessage({
        text: currentIssue.steps[nextStepIndex],
        isBot: true,
        timestamp: getCurrentTime(),
        options: nextStepIndex === currentIssue.steps.length - 1
          ? [
              { text: "Issue Resolved", onPress: () => handleResolve(issueIndex) },
              { text: "Still Not Resolved", onPress: handleNotResolved },
              { text: "Start Over", onPress: handleReset }
            ]
          : [
              { text: "Next Step", onPress: () => handleNextStep(issueIndex, nextStepIndex) },
              { text: "Start Over", onPress: handleReset }
            ]
      });
    }
  };

  const handleResolve = (issueIndex: number) => {
    addMessage({
      text: "Thanks for resolving the issue!",
      isBot: true,
      timestamp: getCurrentTime(),
      options: [
        { text: "Start New", onPress: handleReset }
      ]
    });
    setChatState({
      selectedIssue: issueIndex,
      currentStep: CHATBOT_DATA[issueIndex].steps.length,
      isResolved: true,
    });
  };

  const handleNotResolved = () => {
    addMessage({
      text: "We're sorry to hear that your issue hasn't been resolved.",
      isBot: true,
      timestamp: getCurrentTime(),
      options: [
        { text: "Contact Customer Care", onPress: handleCall },
        { text: "Start Over", onPress: handleReset }
      ]
    });
  };

  const handleReset = () => {
    addMessage({
      text: "Hello! How can I help you today?",
      isBot: true,
      timestamp: getCurrentTime(),
      options: [
        {
          text: "Account Information",
          onPress: () => handleSection("Account Information")
        },
        {
          text: "Troubleshooting",
          onPress: () => handleSection("Troubleshooting")
        },
        {
          text: "Billing & Payments",
          onPress: () => handleSection("Billing & Payments")
        },
      ]
    });
    setChatState({
      selectedIssue: null,
      currentStep: -1,
      isResolved: false,
    });
  };

  const handleSection = (section: string) => {
    // Add user selection message
    addMessage({
      text: section,
      isBot: false,
      timestamp: getCurrentTime(),
    });

    // Show response based on selected section
    switch (section) {
      case "Account Information":
        addMessage({
          text: "What would you like to know about your account?",
          isBot: true,
          timestamp: getCurrentTime(),
          options: [
            {
              text: "My Plan Details",
              onPress: () => handleMenuOption("Plan Details")
            },
            {
              text: "My Recent Usage",
              onPress: () => handleMenuOption("Recent Usage")
            },
            {
              text: "My Account Statement",
              onPress: () => handleMenuOption("Account Statement")
            },
            {
              text: "My Recharge/Payment History",
              onPress: () => handleMenuOption("Recharge/Payment History")
            },
          ]
        });
        break;
      case "Troubleshooting":
        addMessage({
          text: "Please select your issue:",
          isBot: true,
          timestamp: getCurrentTime(),
          options: CHATBOT_DATA.map((issue, index) => ({
            text: issue.title,
            onPress: () => handleIssueSelect(index)
          }))
        });
        break;
      case "Billing & Payments":
        addMessage({
          text: "How can I help you with billing and payments?",
          isBot: true,
          timestamp: getCurrentTime(),
          options: [
            {
              text: "Make a Payment",
              onPress: () => handlePayment()
            },
            {
              text: "My Vouchers",
              onPress: () => handleMenuOption("Vouchers")
            },
            {
              text: "My Coupons",
              onPress: () => handleMenuOption("Coupons")
            },
            {
              text: "Change Package",
              onPress: () => handleMenuOption("Other Plans")
            }
          ]
        });
        break;
      default:
        handleReset();
    }
  };

  const handleMenuOption = (option: string) => {
    // Add user selection message
    addMessage({
      text: `My ${option}`,
      isBot: false,
      timestamp: getCurrentTime(),
    });

    // Show response based on selected option
    switch (option) {
      case "Plan Details":
        addMessage({
          text: "Your current plan is Basic HD Cable Package: ₹499/month\n\nFeatures:\n- 200+ HD Channels\n- 1 month validity\n- No additional benefits",
          isBot: true,
          timestamp: getCurrentTime(),
          options: [
            { text: "Check Other Plans", onPress: () => handleMenuOption("Other Plans") },
            { text: "Main Menu", onPress: handleReset }
          ]
        });
        break;
      case "Recent Usage":
        addMessage({
          text: "Please tap on the below 'Recent Usage' button to view your Call/Data/SMS usage.",
          isBot: true,
          timestamp: getCurrentTime(),
          options: [
            { text: "Recent Usage", onPress: () => handleRecentUsage() },
            { text: "Main Menu", onPress: handleReset }
          ]
        });
        break;
      case "Account Statement":
        addMessage({
          text: "Your account statement for the last month:\n\nOpening balance: ₹0\nCharges: ₹499 (Basic HD Package)\nPayments: ₹499 (Credit Card payment on 15/08/2023)\nClosing balance: ₹0",
          isBot: true,
          timestamp: getCurrentTime(),
          options: [
            { text: "Download Statement", onPress: () => handleDownloadStatement() },
            { text: "Main Menu", onPress: handleReset }
          ]
        });
        break;
      case "Recharge/Payment History":
        addMessage({
          text: "Recent Payments:\n\n1. ₹499 - Credit Card payment on 15/08/2023\n2. ₹499 - Credit Card payment on 15/07/2023\n3. ₹499 - Credit Card payment on 15/06/2023",
          isBot: true,
          timestamp: getCurrentTime(),
          options: [
            { text: "Make a Payment", onPress: () => handlePayment() },
            { text: "Main Menu", onPress: handleReset }
          ]
        });
        break;
      case "Vouchers":
        addMessage({
          text: "You have no active vouchers at the moment.",
          isBot: true,
          timestamp: getCurrentTime(),
          options: [
            { text: "Main Menu", onPress: handleReset }
          ]
        });
        break;
      case "Coupons":
        addMessage({
          text: "You have 1 coupon available:\n\nFREEMONTH - Get 1 month free on annual subscription upgrade",
          isBot: true,
          timestamp: getCurrentTime(),
          options: [
            { text: "Use Coupon", onPress: () => handleUseCoupon() },
            { text: "Main Menu", onPress: handleReset }
          ]
        });
        break;
      case "Other Plans":
        addMessage({
          text: "Available Plans:\n\n1. Basic HD Package: ₹499/month\n2. Premium HD Package: ₹799/month\n3. Ultra HD Package: ₹1,299/month\n4. Sports Package Add-on: ₹299/month",
          isBot: true,
          timestamp: getCurrentTime(),
          options: [
            { text: "Upgrade Plan", onPress: () => handleUpgradePlan() },
            { text: "Main Menu", onPress: handleReset }
          ]
        });
        break;
      default:
        addMessage({
          text: "I'm not sure how to help with that. Let me show you our main menu.",
          isBot: true,
          timestamp: getCurrentTime(),
          options: [
            { text: "Main Menu", onPress: handleReset }
          ]
        });
    }
  };

  const handleRecentUsage = () => {
    addMessage({
      text: "Note:\n\n1. Your usage details are not real time and will have to check after few hours for recent data usage details\n2. Your Call/Data/SMS usage details cannot be deleted from 'Account Statement' or from MyJio App\n3. Currently, incoming call details are not available",
      isBot: true,
      timestamp: getCurrentTime(),
      options: [
        { text: "Main Menu", onPress: handleReset }
      ]
    });
  };

  const handleDownloadStatement = () => {
    addMessage({
      text: "Your statement has been sent to your registered email address.",
      isBot: true,
      timestamp: getCurrentTime(),
      options: [
        { text: "Main Menu", onPress: handleReset }
      ]
    });
  };

  const handlePayment = () => {
    addMessage({
      text: "To make a payment, please select your preferred method:",
      isBot: true,
      timestamp: getCurrentTime(),
      options: [
        { text: "Credit/Debit Card", onPress: () => handlePaymentMethod("card") },
        { text: "UPI", onPress: () => handlePaymentMethod("upi") },
        { text: "NetBanking", onPress: () => handlePaymentMethod("netbanking") },
        { text: "Main Menu", onPress: handleReset }
      ]
    });
  };

  const handlePaymentMethod = (method: string) => {
    addMessage({
      text: `${method.charAt(0).toUpperCase() + method.slice(1)} payment option selected. Please use our payment gateway to complete your transaction.`,
      isBot: true,
      timestamp: getCurrentTime(),
      options: [
        { text: "Main Menu", onPress: handleReset }
      ]
    });
  };

  const handleUseCoupon = () => {
    addMessage({
      text: "To use the FREEMONTH coupon, you need to upgrade to an annual subscription. Would you like to proceed?",
      isBot: true,
      timestamp: getCurrentTime(),
      options: [
        { text: "Yes, Upgrade", onPress: () => handleUpgradePlan() },
        { text: "No, Later", onPress: handleReset }
      ]
    });
  };

  const handleUpgradePlan = () => {
    addMessage({
      text: "To upgrade your plan, please contact our customer service.",
      isBot: true,
      timestamp: getCurrentTime(),
      options: [
        { text: "Contact Customer Care", onPress: handleCall },
        { text: "Main Menu", onPress: handleReset }
      ]
    });
  };

  const handleCall = () => {
    Linking.openURL('tel:9876543210');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        title="Chat Support"
        titleLeft={true}
        leftIcon="back"
      />

      {/* Customer Support Profile */}
      <View style={styles.profileContainer}>
        <SupportAvatar />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Cable Network Support</Text>
          <View style={styles.onlineContainer}>
            <View style={styles.onlineIndicator} />
            <Text style={styles.onlineText}>Online</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.callButton}
          onPress={handleCall}
        >
          <Image
            style={{ height: 20, width: 20, resizeMode: "contain" }}
            source={IMAGES.call}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.isBot ? styles.botMessageContainer : styles.userMessageContainer
            ]}
          >
            {message.isBot && <SupportAvatar />}

            <View style={styles.messageContentWrapper}>
              <View style={[
                styles.messageBubble,
                message.isBot ? styles.botBubble : styles.userBubble
              ]}>
                <Text style={[
                  styles.messageText,
                  message.isBot ? styles.botMessageText : styles.userMessageText
                ]}>
                  {message.text}
                </Text>
              </View>
              <Text style={[
                styles.timestamp,
                message.isBot ? styles.botTimestamp : styles.userTimestamp
              ]}>
                {message.timestamp}
              </Text>

              {message.options && (
                <View style={styles.optionsContainer}>
                  {message.options.map((option, optionIndex) => (
                    <TouchableOpacity
                      key={optionIndex}
                      style={[
                        styles.optionButton,
                        option.text === "Contact Customer Care" && styles.callOptionButton
                      ]}
                      onPress={option.onPress}
                    >
                      <Text style={[
                        styles.optionText,
                        option.text === "Contact Customer Care" && styles.callOptionText
                      ]}>
                        {option.text}
                      </Text>
                      {option.text === "Contact Customer Care" && (
                        <Image
                          source={IMAGES.call}
                          style={{height: 16, width: 16, marginLeft: 6, tintColor: COLORS.white}}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {!message.isBot && <UserAvatar />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: COLORS.card,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    ...FONTS.fontMedium,
  },
  actionBtn: {
    height: 35,
    width: 35,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    // position:'absolute',
    // left:10,
    // top:10,
    backgroundColor: COLORS.background,
  },
  subtitle: {
    fontSize: 18,
    ...FONTS.fontMedium,
    marginBottom: 15,
  },
  issueTitle: {
    fontSize: 18,
    ...FONTS.fontMedium,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  nextButtonText: {
    ...FONTS.fontMedium,
    color: COLORS.white,
    fontSize: 16,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 15,
  },
  messageContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    maxWidth: '90%',
  },
  messageContentWrapper: {
    flex: 1,
    marginHorizontal: 8,
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    marginBottom: 4,
    maxWidth: '100%',
  },
  botBubble: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 4,
  },
  messageText: {
    ...FONTS.fontRegular,
    fontSize: 15,
    lineHeight: 20,
  },
  botMessageText: {
    color: COLORS.title,
  },
  userMessageText: {
    color: COLORS.white,
  },
  timestamp: {
    ...FONTS.fontRegular,
    fontSize: 11,
    marginLeft: 2,
    marginTop: 2,
  },
  botTimestamp: {
    color: COLORS.text,
    alignSelf: 'flex-start',
  },
  userTimestamp: {
    color: COLORS.text,
    alignSelf: 'flex-end',
  },
  optionsContainer: {
    marginTop: 10,
    gap: 8,
  },
  optionButton: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callOptionButton: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  optionText: {
    ...FONTS.fontMedium,
    color: COLORS.primary,
    fontSize: 14,
  },
  callOptionText: {
    color: COLORS.white,
  },
  callButton: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: COLORS.success,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 'auto',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary + '20',
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  profileName: {
    ...FONTS.fontMedium,
    fontSize: 16,
    color: COLORS.title,
  },
  onlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
    marginRight: 5,
  },
  onlineText: {
    ...FONTS.fontRegular,
    fontSize: 12,
    color: COLORS.text,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportAvatarContainer: {
    backgroundColor: COLORS.success,
  },
});

export default Singlechat;
