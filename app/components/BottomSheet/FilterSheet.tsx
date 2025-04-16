import React, {  useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import Button from '../Button/Button';
import { useNavigation, useTheme } from '@react-navigation/native';
import ButtonOutline from '../Button/ButtonOutline';



const brandData = [
  {
      title:'Nike',
      image:IMAGES.brand1
  },
  {
      title:'Adidas',
      image:IMAGES.brand2
  },
  {
      title:'Reebok',
      image:IMAGES.brand3
  },
  {
      title:'Puma',
      image:IMAGES.brand4
  },
  {
      title:'Bata',
      image:IMAGES.brand5
  },
  {
      title:'Nike',
      image:IMAGES.brand6
  },
  {
      title:'Adidas',
      image:IMAGES.brand7
  },
  {
      title:'Reebok',
      image:IMAGES.brand8
  },
  {
      title:'Puma',
      image:IMAGES.brand9
  },
  {
      title:'Bata',
      image:IMAGES.brand10
  },
]

type Props = {
    sheetRef ?: any;
}

const FilterSheet2 = ({sheetRef} : Props) => {

  const theme = useTheme();
  const { colors } : {colors : any} = theme;

  const navigation = useNavigation();

  // const brandData = ["Adidas", "Reebok", "Zara", "Gucci", "Vogue"];

  // const [activeSize, setActiveSize] = useState(brandData[0]);

  const categoriesData = ["All", "Face Wash", "Cleanser", "Scrubs", "Makeup Remover", "Hand Cream",];

  const [active1Size, setActive1Size] = useState(categoriesData[0]);

  const sizeData = ["S", "M", "L", "XL", "2XL"];

  const [active2Size, setActive2Size] = useState(sizeData[0]);

  const [active3Size, setActive3Size] = useState(brandData[0]);

  const [multiSliderValue, setMultiSliderValue] = useState([200, 270])

  const multiSliderValuesChange = (values:any) => setMultiSliderValue(values)


  const [values, setValues] = useState<any>([0, 50]); // Initial values for the range

  const handleValuesChange = (newValues:any) => {
    setValues(newValues);
  };

  return (
      <View style={[GlobalStyleSheet.container, { paddingTop: 0,backgroundColor:theme.dark ? colors.background :colors.card }]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
              paddingBottom: 10,
              paddingTop:10,
              marginHorizontal: -15,
              paddingHorizontal: 15
            }}
          >
            <Text style={[FONTS.fontMedium, { color: colors.title, fontSize: 16 }]}>Filters</Text>
            <TouchableOpacity
              style={{ height: 38, width: 38, backgroundColor: colors.card, borderRadius: 38, alignItems: 'center', justifyContent: 'center' }}
              onPress={() => sheetRef.current.close()}
            >
              <Image
                style={{ width: 18, height: 18, resizeMode: 'contain', tintColor: colors.title }}
                source={IMAGES.close}
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title }}>Brand</Text>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => sheetRef.current.close()}
                >
                  <Text style={{ ...FONTS.fontRegular, fontSize: 13, color:COLORS.primary }}>See All</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop:10,flexDirection:'row',flexWrap:'wrap',gap:10}}>
                  {brandData.map((data:any,index) => {
                      return(
                        <TouchableOpacity activeOpacity={0.8}   onPress={() => setActive3Size(data)} key={index} style={{alignItems:'center'}}>
                            <View 
                              style={[{
                                height:45,
                                width:45,
                                borderRadius:50,
                                borderWidth:1,
                                borderColor:COLORS.primaryLight,
                                alignItems:'center',
                                justifyContent:'center'
                                },active3Size === data && {
                                  borderColor:COLORS.primary
                                }]}
                              >
                                <Image
                                    style={{height:30,width:30,resizeMode:'contain',borderRadius:30}}
                                    source={data.image}
                                />
                            </View>
                            {/* <Text style={[FONTS.fontMedium,{fontSize:14,color:colors.title,marginTop:10}]}>{data.title}</Text> */}
                        </TouchableOpacity>
                      )
                  })}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title }}>Categories:</Text>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => sheetRef.current.close()}
                >
                  <Text style={{ ...FONTS.fontRegular, fontSize: 13, color:COLORS.primary }}>See All</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 10 }}>
                {categoriesData.map((data, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => setActive1Size(data)}
                      key={index}
                      style={[{
                        //backgroundColor:theme.dark ? 'rgba(255,255,255,0.10)': colors.background,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        //borderRadius: 8,
                        borderWidth: 1,
                        borderColor:COLORS.primaryLight,
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        marginBottom: 5
                      }, active1Size === data && {
                        backgroundColor:COLORS.primary,
                        borderColor: COLORS.primary,
                      }]}
                    >
                      <Text style={[{ ...FONTS.fontMedium, fontSize: 13, color: colors.title }, active1Size === data && {  color:theme.dark ? COLORS.white : COLORS.white }]}>{data}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title }}>Size:</Text>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => sheetRef.current.close()}
                >
                  <Text style={{ ...FONTS.fontRegular, fontSize: 13, color:COLORS.primary }}>See All</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 10 }}>
                {sizeData.map((data, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => setActive2Size(data)}
                      key={index}
                      style={[{
                        //backgroundColor:theme.dark ? 'rgba(255,255,255,0.10)': colors.background,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        //borderRadius: 8,
                        borderWidth: 1,
                        borderColor: COLORS.primaryLight,
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        marginBottom: 5,
                      }, active2Size === data && {
                        backgroundColor:COLORS.primary,
                        borderColor: COLORS.primary,
                      }]}
                    >
                      <Text style={[{ ...FONTS.fontMedium, fontSize: 13, color: colors.title }, active2Size === data && { color:theme.dark ? COLORS.white : COLORS.white }]}>{data}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
              <View style={{ flexDirection: 'row', gap: 10, paddingRight: 10, marginTop: 20,marginBottom:30 }}>
                <View style={{ width: '50%' }}>
                  <ButtonOutline
                    title={"Reset"}
                    color={COLORS.primaryLight}
                    text={COLORS.primary}
                    onPress={() => sheetRef.current.close()}
                  />
                </View>
                <View style={{ width: '50%' }}>
                  <Button
                    title={"Apply"}
                    text={ COLORS.white}
                    color={COLORS.primary}
                    onPress={() => sheetRef.current.close()}
                  />
                </View>
              </View>
          </ScrollView>
      </View>
  )
}

export default FilterSheet2