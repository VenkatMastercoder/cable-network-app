import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

type Props = {
    title : string,
    onPress ?: (e : any) => void,
    color ?: any,
    style ?: object,
    size ?: any,
    text ?: any,
}

const Button = ({
    title,
    onPress,
    color,
    style,
    size,
    text,
}: Props) => {
    return (
        <TouchableOpacity 
            activeOpacity={.8}
            onPress={onPress}
        >
            <View
                style={[styles.button,color && {
                    backgroundColor:color,
                },size === 'sm' && {
                    height:36,
                    paddingHorizontal:10
                },size === 'lg' && {
                    height:55,
                    paddingHorizontal:30,
                },style && {...style}]}
            >
                <Text style={[styles.buttnTitle,size === 'sm' && {
                        fontSize:14,
                    },size === 'lg' && {
                        fontSize:18,
                    },color && {color : COLORS.white},text && {color : (text)}]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button : {
        backgroundColor:COLORS.secondary,
        height:48,
        borderRadius:SIZES.radius,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:20,
    },
    buttnTitle : {
        ...FONTS.fontMedium,
        fontSize:18,
        color : '#000',
        lineHeight:24,
    }
});

export default Button;