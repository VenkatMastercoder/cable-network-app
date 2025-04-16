import React ,{useState} from 'react'
import { View, Text ,ScrollView, Image, TouchableOpacity ,} from 'react-native'
import { useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { COLORS,FONTS, SIZES } from '../constants/theme';

const CheckoutItems = () => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const [itemQuantity, setItemQuantity] = useState(14);

  return (
    <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}
    >
        <TouchableOpacity
            onPress={() => itemQuantity > 1 && setItemQuantity(itemQuantity - 1)}
            style={{
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
             <Feather size={20} color={colors.text} name={'minus'} />
        </TouchableOpacity>
        <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title, width: 50, textAlign: 'center' }}>{itemQuantity}</Text>
        <TouchableOpacity
            onPress={() => setItemQuantity(itemQuantity + 1)}
            style={{
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Feather size={20} color={colors.text} name={'plus'} />
        </TouchableOpacity>
    </View>
  )
}

export default CheckoutItems