import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
//import FeatherIcon from 'react-native-vector-icons/Feather';
import { Feather } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { useTheme } from "@react-navigation/native";

const AccordionHighlight = () => {
  const { colors }: { colors: any } = useTheme();

  const [activeSections, setActiveSections] = useState([0]);
  const setSections = (sections: any) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const SECTIONS = [
    {
      title: "Who Can Benefit from Ecommerce?",
      content:
        "Global Reach: Ecommerce allows businesses to reach a global customer base. With an online store, you can sell your products or services to customers anywhere in the world.",
    },
    {
      title: "10 Ways to Maximize Your Profits.",
      content:
        "Global Reach: Ecommerce allows businesses to reach a global customer base. With an online store, you can sell your products or services to customers anywhere in the world.",
    },
    {
      title: "Exploring the Benefits of Ecommerce",
      content:
        "Global Reach: Ecommerce allows businesses to reach a global customer base. With an online store, you can sell your products or services to customers anywhere in the world.",
    },
    {
      title: "The Impact of Ecommerce on Business",
      content:
        "Global Reach: Ecommerce allows businesses to reach a global customer base. With an online store, you can sell your products or services to customers anywhere in the world.",
    },
  ];

  const AccordionHeader = (item: any, _: any, isActive: any) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: SIZES.radius_sm,
          backgroundColor: isActive ? COLORS.primary : colors.background,
        }}>
        <Text
          style={[
            FONTS.font,
            FONTS.fontMedium,
            { color: isActive ? COLORS.white : colors.title, flex: 1 },
          ]}>
          {item.title}
        </Text>
        <View
          style={[
            {
              height: 24,
              width: 24,
              backgroundColor: colors.card,
              borderRadius: 24,
              alignItems: "center",
              justifyContent: "center",
            },
            isActive && {
              backgroundColor: "rgba(255,255,255,0.30)",
            },
          ]}>
          <Feather
            size={24}
            color={colors.title}
            name={isActive ? "minus" : "plus"}
          />
          {/* <Feather size={18} color={isActive ? COLORS.white : colors.title} name={isActive ? 'minus' : 'plus'}/> */}
        </View>
      </View>
    );
  };
  
  const AccordionBody = (item: any, _: any, isActive: any) => {
    return (
      <View style={{ marginBottom: 15, marginTop: 10, paddingHorizontal: 15 }}>
        <Text style={[FONTS.fontSm, { color: colors.text, lineHeight: 20 }]}>
          {item.content}
        </Text>
      </View>
    );
  };

  return (
    <>
      <Accordion
        sections={SECTIONS}
        sectionContainerStyle={{ marginBottom: 6 }}
        duration={300}
        activeSections={activeSections}
        onChange={setSections}
        touchableComponent={TouchableOpacity}
        renderHeader={AccordionHeader}
        renderContent={AccordionBody}
      />
    </>
  );
};

export default AccordionHighlight;
