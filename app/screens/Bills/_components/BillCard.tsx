import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';

export interface BillTransaction {
  transactionId: string;
  paymentDate: string;
  paymentMode: string;
  billAmount: number;
  planName?: string;
}

interface BillCardProps {
  transaction: BillTransaction;
  onDownload?: () => void;
  onEmail?: () => void;
  onClick?: () => void;
}

export const BillCard: React.FC<BillCardProps> = ({
  transaction,
  onDownload,
  onEmail,
  onClick,
}) => {
  return (
    <Pressable
      onPress={onClick}
      android_ripple={null}
      style={() => ({ opacity: 1 })} // No opacity change on press
    >
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Payment ID</Text>
          <Text style={styles.value}>{transaction.transactionId}</Text>
        </View>
        {transaction.planName && (
          <View style={styles.row}>
            <Text style={styles.label}>Plan</Text>
            <Text style={styles.value}>{transaction.planName}</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>Payment on</Text>
          <Text style={styles.value}>{transaction.paymentDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment mode</Text>
          <Text style={styles.value}>{transaction.paymentMode}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.value}>₹ {transaction.billAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.viewDetails}>
          <Text style={styles.viewDetailsText}>View Details</Text>
          <Icon name="arrow-forward-ios" size={14} color={COLORS.primary} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius_lg,
    padding: SIZES.padding,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    ...FONTS.fontRegular,
    color: COLORS.text,
  },
  value: {
    ...FONTS.fontMedium,
    color: COLORS.title,
  },
  viewDetails: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  viewDetailsText: {
    ...FONTS.fontMedium,
    color: COLORS.primary,
    marginRight: 5,
  },
});