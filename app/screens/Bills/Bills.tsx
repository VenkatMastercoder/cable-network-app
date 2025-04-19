import React from "react";
import { ScrollView, Alert, View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { BillCard } from "./_components/BillCard";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/RootStackParamList";
import Header from '../../layout/Header';
import { getBillsDataApi } from "../../api/bills/queries";
import { useQuery } from "@tanstack/react-query";
import { COLORS, FONTS } from "../../constants/theme";

type BillsScreenNavigationProp = StackScreenProps<RootStackParamList, 'Bills'>;

// Define the API response types
interface BillPlan {
  plan_id: string;
  plan_name: string;
  plan_price: number;
  total_no_of_channel: number;
}

interface BillPayment {
  payment_id: string;
  user_id: string;
  amount: number;
  method: string;
  status: string;
  paid_on: string;
}

interface Bill {
  bill_no: string;
  bill_date: string;
  bill_amount: number;
  plan_id: string;
  payment_id: string;
  user_id: string;
  plan: BillPlan;
  payment: BillPayment;
}

interface BillsApiResponse {
  success: boolean;
  message: string;
  data: Bill[];
}

const Bills = ({ navigation }: BillsScreenNavigationProp) => {
  const theme = useTheme();
  const { colors } = theme;

  const handleDownload = (billNo: string) => {
    Alert.alert("Download", `Downloading bill ${billNo}`);
  };

  const handleEmail = (billNo: string) => {
    Alert.alert("Email", `Sending bill ${billNo} via email`);
  };

  const handleClick = (billNo: string) => {
    navigation.navigate("BillDetails", { billNo });
  };

  const { data, isLoading, error } = useQuery<BillsApiResponse>({
    queryKey: ['bills'],
    queryFn: () => getBillsDataApi('cm9l7ni44000j1269k3f7uo3q'),
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        title="Bills"
        titleLeft={true}
        leftIcon="back"
      />

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={[styles.loaderText, { color: colors.text }]}>Loading bills...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>Could not load bills. Please try again later.</Text>
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1, backgroundColor: '#f5f5f5' }}
          showsVerticalScrollIndicator={false}
        >
          {data?.data && data.data.length > 0 ? (
            data.data.map((bill) => (
              <BillCard
                key={bill.bill_no}
                transaction={{
                  transactionId: bill.payment.payment_id,
                  paymentDate: formatDate(bill.payment.paid_on),
                  paymentMode: bill.payment.method,
                  billAmount: bill.bill_amount,
                  planName: bill.plan.plan_name
                }}
                onDownload={() => handleDownload(bill.bill_no)}
                onEmail={() => handleEmail(bill.bill_no)}
                onClick={() => handleClick(bill.bill_no)}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.text }]}>No bills found.</Text>
            </View>
          )}
        </ScrollView>
      )}
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

export default Bills;
