import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

interface ChatBotOptionProps {
  title: string;
  onPress: () => void;
}

const ChatBotOption = ({ title, onPress }: ChatBotOptionProps) => {
  return (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <Text style={styles.optionText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
  },
  optionText: {
    ...FONTS.fontMedium,
    color: COLORS.white,
    fontSize: 16,
  },
});

export default ChatBotOption;