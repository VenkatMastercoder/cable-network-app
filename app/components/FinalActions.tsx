import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Image } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { IMAGES } from '../constants/Images';

interface FinalActionsProps {
  onResolve: () => void;
  isResolved: boolean;
}

const FinalActions = ({ onResolve, isResolved }: FinalActionsProps) => {
  const handleCallSupport = () => {
    Linking.openURL('tel:9876543210');
  };

  if (isResolved) {
    return (
      <View style={styles.container}>
        <Text style={styles.resolvedText}>Thanks for resolving the issue!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.resolveButton} onPress={onResolve}>
        <Text style={styles.buttonText}>Resolved</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.supportButton} onPress={handleCallSupport}>
        <Text style={styles.buttonText}>Still Not Resolved</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.callButton} onPress={handleCallSupport}>
        <Text style={styles.callButtonText}>Contact Customer Care</Text>
        <Image
          source={IMAGES.call}
          style={{ height: 16, width: 16, marginLeft: 8, tintColor: COLORS.white }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
  },
  resolveButton: {
    backgroundColor: COLORS.success,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  supportButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: COLORS.success,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  buttonText: {
    ...FONTS.fontMedium,
    color: COLORS.white,
    fontSize: 16,
  },
  callButtonText: {
    ...FONTS.fontMedium,
    color: COLORS.white,
    fontSize: 14,
  },
  resolvedText: {
    ...FONTS.fontMedium,
    color: COLORS.success,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default FinalActions;