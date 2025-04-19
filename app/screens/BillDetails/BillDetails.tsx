import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../../layout/Header';
import { getBillDetailsDataApi } from '../../api/bills/queries';
import { useQuery } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/MaterialIcons';

type RootStackParamList = {
  Bills: undefined;
  BillDetails: { billNo: string };
};

type BillDetailsRouteProp = RouteProp<RootStackParamList, 'BillDetails'>;
type BillDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BillDetails'>;

// Define API response types
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

interface BillData {
  bill_no: string;
  bill_date: string;
  bill_amount: number;
  plan_id: string;
  payment_id: string;
  user_id: string;
  plan: BillPlan;
  payment: BillPayment;
}

interface BillDetailsApiResponse {
  success: boolean;
  message: string;
  data: BillData;
}

export default function BillDetails() {
    const navigation = useNavigation<BillDetailsNavigationProp>();
    const route = useRoute<BillDetailsRouteProp>();
    const theme = useTheme();
    const { colors } = theme;

    const { data, isLoading, error } = useQuery<BillDetailsApiResponse>({
        queryKey: ['billDetails', route.params.billNo],
        queryFn: () => getBillDetailsDataApi(route.params.billNo),
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Header
                    title="Bill Details"
                    titleLeft={true}
                    leftIcon="back"
                />
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                    <Text style={[FONTS.fontMedium, { marginTop: 10 }]}>Loading bill details...</Text>
                </View>
            </View>
        );
    }

    if (error || !data) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Header
                    title="Bill Details"
                    titleLeft={true}
                    leftIcon="back"
                />
                <View style={styles.loaderContainer}>
                    <Icon name="error-outline" size={50} color={COLORS.danger} />
                    <Text style={[FONTS.fontMedium, { marginTop: 10, color: COLORS.danger }]}>
                        Error loading bill details
                    </Text>
                </View>
            </View>
        );
    }

    const billData = data.data;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header
                title="Bill Details"
                titleLeft={true}
                leftIcon="back"
            />

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Status Card */}
                <View style={[styles.card, { backgroundColor: colors.card }]}>
                    <View style={styles.statusContainer}>
                        <Text style={[FONTS.h4, { color: COLORS.success }]}>
                            {billData.payment.status === 'SUCCESS' ? 'PAID' : billData.payment.status}
                        </Text>
                        <Text style={[FONTS.fontLg, { color: colors.text }]}>₹{billData.bill_amount.toFixed(2)}</Text>
                    </View>

                    <View style={styles.divider} />

                    {/* Bill Details */}
                    <View style={styles.detailsContainer}>
                        <DetailRow label="Bill Number" value={billData.bill_no} />
                        <DetailRow label="Payment ID" value={billData.payment.payment_id} />
                        <DetailRow label="Payment Date" value={formatDate(billData.payment.paid_on)} />
                        <DetailRow label="Payment Mode" value={billData.payment.method} />
                        <DetailRow label="Bill Date" value={formatDate(billData.bill_date)} />
                    </View>
                </View>

                {/* Package Details Card */}
                <View style={[styles.card, { backgroundColor: colors.card }]}>
                    <Text style={[FONTS.h5, { color: COLORS.black }]}>Package Details</Text>
                    <DetailRow label="Plan Name" value={billData.plan.plan_name} />
                    <DetailRow label="Total Channels" value={billData.plan.total_no_of_channel.toString()} />
                    <DetailRow label="Plan Price" value={`₹${billData.plan.plan_price.toFixed(2)}`} />
                </View>

                {/* Charges Breakdown Card */}
                <View style={[styles.card, { backgroundColor: colors.card }]}>
                    <Text style={[FONTS.h5, { color: COLORS.black }]}>Payment Summary</Text>
                    <DetailRow label="Plan Price" value={`₹${billData.plan.plan_price.toFixed(2)}`} />
                    <DetailRow label="Taxes & Fees" value={`₹${(billData.bill_amount - billData.plan.plan_price).toFixed(2)}`} />
                    <View style={styles.divider} />
                    <DetailRow
                        label="Total Amount"
                        value={`₹${billData.bill_amount.toFixed(2)}`}
                        labelStyle={FONTS.fontBold}
                        valueStyle={FONTS.fontBold}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const DetailRow = ({
    label,
    value,
    labelStyle = {},
    valueStyle = {}
}: {
    label: string;
    value: string;
    labelStyle?: any;
    valueStyle?: any;
}) => {
    const theme = useTheme();
    const { colors } = theme;
    return (
        <View style={styles.detailRow}>
            <Text style={[styles.label, { color: COLORS.text }, labelStyle]}>{label}</Text>
            <Text style={[styles.value, { color: COLORS.title }, valueStyle]}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: SIZES.padding,
    },
    card: {
        borderRadius: SIZES.radius_lg,
        padding: SIZES.padding,
        marginBottom: SIZES.padding,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statusContainer: {
        alignItems: 'center',
        marginBottom: SIZES.padding,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.light,
        marginVertical: SIZES.padding,
    },
    detailsContainer: {
        gap: 10,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        ...FONTS.fontRegular,
    },
    value: {
        ...FONTS.fontMedium,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});