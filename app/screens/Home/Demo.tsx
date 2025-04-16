import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { CountryButton, CountryPicker } from 'react-native-country-codes-picker';


const Demo = () => {

  const theme = useTheme();
  const { colors } : {colors : any} = theme;

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');

  const [countryflag, setCountryflag] = useState('');

  return (
      <View style={[GlobalStyleSheet.container,{backgroundColor:colors.card,flex:1}]}>
          <CountryButton 
              onPress={() => setShow(true)}
              item={{
                dial_code: countryCode ? countryCode : "+91", 
                flag: countryflag ? countryflag : "🇮🇳",
              }}
              style={{
                countryButtonStyles : {
                  height : 48,
                  backgroundColor:'transparent',
                  width:65,
                  paddingHorizontal:0,
                  paddingVertical:0,
                },
                dialCode: {
                  flex:1,
                },
                flag: {
                  flex:0,
                  width:20,
                  marginRight:5,
                },
                countryName: {
                  display:'none',
                }
              }}
          />
          <CountryPicker
            show={show}
            // when picker button press you will get the country object with dial code
            pickerButtonOnPress={(item) => {
              // console.log(item);
              setCountryflag(item.flag);
              setCountryCode(item.dial_code);
              setShow(false);
            }}
            style={{
              modal: {
                height: 500,
                backgroundColor: colors.card
              },
            }}
          />
      </View>
  )
}

export default Demo