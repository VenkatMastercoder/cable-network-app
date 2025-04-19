import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ticket } from './types';
import { COLORS, FONTS } from '../../../constants/theme';

interface TicketCardProps {
  ticket: Ticket;
}

export const TicketCard = ({ ticket }: TicketCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.issueType}>{ticket.issueType}</Text>
        <Text style={[
          styles.status,
          ticket.status === 'open' ? styles.statusOpen : styles.statusClosed
        ]}>
          {ticket.status.toUpperCase()}
        </Text>
      </View>
      <Text style={styles.message}>{ticket.message}</Text>
      <View style={styles.footer}>
        <Text style={styles.date}>
          Raised on: {formatDate(ticket.createdAt)}
        </Text>
        <Text style={styles.ticketNo}>
          #{ticket.id.substring(0, 8)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  issueType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    ...FONTS.fontSemiBold,
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
    ...FONTS.fontMedium,
  },
  statusOpen: {
    backgroundColor: '#ffebe6',
    color: COLORS.danger,
  },
  statusClosed: {
    backgroundColor: '#e6f7ed',
    color: COLORS.success,
  },
  message: {
    fontSize: 14,
    color: '#4a4a4a',
    marginBottom: 12,
    ...FONTS.font,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#8f8f8f',
    ...FONTS.fontSm,
  },
  ticketNo: {
    fontSize: 12,
    color: '#8f8f8f',
    ...FONTS.fontSm,
  }
});