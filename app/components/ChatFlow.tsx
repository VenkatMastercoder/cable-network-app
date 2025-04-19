import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

interface ChatFlowProps {
  steps: string[];
  currentStep: number;
}

const ChatFlow = ({ steps, currentStep }: ChatFlowProps) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View
          key={index}
          style={[
            styles.step,
            index <= currentStep ? styles.activeStep : styles.inactiveStep
          ]}
        >
          <Text style={[
            styles.stepText,
            index <= currentStep ? styles.activeStepText : styles.inactiveStepText
          ]}>
            {`${index + 1}. ${step}`}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
  },
  step: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  activeStep: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  inactiveStep: {
    backgroundColor: COLORS.background,
    opacity: 0.7,
  },
  stepText: {
    ...FONTS.fontRegular,
    fontSize: 15,
  },
  activeStepText: {
    color: COLORS.title,
  },
  inactiveStepText: {
    color: COLORS.text,
  },
});

export default ChatFlow;