import React, { useEffect, useState } from "react";
import BottomNavigation from "./BottomNavigation";
import DrawerMenu from "../layout/DrawerMenu";
import { View, Text } from "react-native";
import SideMenu from "react-native-side-menu-updated";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "../redux/actions/drawerAction";

function DrawerNavigation() {
  const { isOpen } = useSelector((state: any) => state.drawer);

  const dispatch = useDispatch();

  return (
    <View
      style={{
        flex: 1,
      }}>
      <SideMenu
        overlayColor={"rgba(9,42,96,.8)"}
        isOpen={isOpen}
        menu={<DrawerMenu />}
        onChange={(e) => {
          e === false ? dispatch(closeDrawer()) : null;
        }}>
        <BottomNavigation />
      </SideMenu>
    </View>
  );
}

export default DrawerNavigation;
