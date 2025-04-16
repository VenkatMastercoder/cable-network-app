import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useTheme } from '@react-navigation/native';

const LikeBtn = ({onPress,inWishlist,id}: any) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    return (
        <Pressable
            accessible={true}
            accessibilityLabel="Like Btn"
            accessibilityHint="Like this item"
            onPress={() =>  onPress ? onPress() : ""}
            style={{
                height: 50,
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {inWishlist().includes(id) ?
                <FontAwesome size={16} color={COLORS.danger} name="heart" />
                :
                <FontAwesome size={16} color={colors.text} name="heart" />
            }
        </Pressable>
    );
}

export default LikeBtn;