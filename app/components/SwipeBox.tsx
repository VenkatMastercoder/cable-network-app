import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    TouchableOpacity,
    Image,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { COLORS, FONTS } from '../constants/theme';
import { IMAGES } from '../constants/Images';

const SCREEN_WIDTH = Dimensions.get('window').width;


export default class SwipeBox extends Component {
    
  rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [45, 90],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={() => { this.close(); this.props.handleDelete() }} activeOpacity={0.6}>
        <View style={[styles.deleteBox, { backgroundColor: COLORS.title}]}>
          <Animated.View>
            <Image
              style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: COLORS.white }}
              source={IMAGES.delete}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  };

  updateRef = ref => {
    this._swipeableRow = ref;
  };
  close = () => {
    this._swipeableRow.close();
  };

  render(){
    
      return (
        // <Swipeable
        //           ref={this.updateRef}
        //           friction={2}
        //       renderLeftActions={this.leftSwipe}>
        //   <View style={[styles.container,{backgroundColor:this.props.colors.cardBg}]}>
        //       <Text style={{...FONTS.font,color:this.props.colors.title,fontSize:16}}>{this.props.data.title}</Text>
        //   </View>
        // </Swipeable>
         <Swipeable
            ref={this.updateRef}
            friction={2}
            renderRightActions={this.rightSwipe}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                borderBottomWidth: 1,
                borderBottomColor:COLORS.primaryLight,
                marginHorizontal: -15,
                paddingHorizontal: 30,
                paddingBottom: 15,
                paddingTop: 15,
                marginRight: 5,
              }}
            >
              <Image
                style={{ height: 45, width: 45, borderRadius: 10 }}
                source={this.props.data.image}
              />
              <View>
                <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: this.props.colors.title }}>{this.props.data.title}</Text>
                <Text style={{ ...FONTS.fontRegular, fontSize: 13, color: this.props.colors.title }}>{this.props.data.date}</Text>
              </View>
            </View>
          </Swipeable>
        );
    }
};
const styles = StyleSheet.create({
  container: {
    height: 80,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    padding: 20,
  },
  deleteBox: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 75,
    right: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
});
