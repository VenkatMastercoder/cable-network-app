import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "./BottomTabParamList";
import WishlistScreen from "../screens/Wishlist/Wishlist";
import MyCartScreen from "../screens/MyCart/MyCart";
import HomeScreen from "../screens/Home/Home";
import BillsScreen from "../screens/Bills/Bills";
import TicketsScreen from "../screens/Tickets/Tickets";
import ChatScreen from "../screens/Chat/Chat";
import BottomMenu from "../layout/BottomMenu";
import Singlechat from "../screens/Chat/Singlechat";

const Tab = createBottomTabNavigator<BottomTabParamList>();



const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: any) => <BottomMenu {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bills" component={BillsScreen} />
      <Tab.Screen name="Tickets" component={TicketsScreen} />
      <Tab.Screen name="Support" component={Singlechat} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
