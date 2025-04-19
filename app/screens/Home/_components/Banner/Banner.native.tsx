import React from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";

const BannerSwiper = ({ bannerData }: any) => {
  const screenWidth = Dimensions.get("window").width;
  const aspectRatio = 800 / 450;
  const bannerHeight = screenWidth / aspectRatio;

  return (
    <View style={[styles.outerContainer, { height: bannerHeight }]}>
      <Swiper
        autoplay={true}
        autoplayTimeout={5}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        paginationStyle={styles.pagination}
        showsPagination={true}
      >
        {bannerData.map((data: any, index: number) => (
          <View key={index} style={styles.slideContainer}>
            <Image
              style={[styles.bannerImage, { height: bannerHeight }]}
              source={{ uri: data.app_banner_url }}
              resizeMode="cover"
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    marginRight: -15,
    marginTop: -15,
    position: 'relative',
    overflow: 'hidden',
  },
  slideContainer: {
    flex: 1,
  },
  bannerImage: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  dot: {
    height: 6,
    width: 6,
    backgroundColor: "#ccc",
    opacity: 0.2,
    borderRadius: 3,
  },
  activeDot: {
    height: 6,
    width: 6,
    backgroundColor: "#333",
    borderRadius: 3,
  },
  pagination: {
    bottom: 10,
  },
});

{
  /* {Platform.OS === "web" ? <View></View> : (
          <Swiper
            autoplay={true}
            autoplayTimeout={5}
            dotStyle={{
              height: 6,
              width: 6,
              backgroundColor: COLORS.card,
              opacity: 0.2,
            }}
            activeDotStyle={{
              height: 6,
              width: 6,
              backgroundColor: COLORS.card,
            }}
            paginationStyle={{ bottom: 10 }}
            showsPagination={Platform.OS === "android" ? true : false}>
            {bannerData.map((data: any, index: number) => {
              return (
                <View key={index} style={{ flex: 1 }}>
                  <Image
                    style={{
                      height: "auto",
                      width: "100%",
                      aspectRatio: 1 / 0.8,
                      resizeMode: "cover",
                    }}
                    source={IMAGES.test}
                  />
                </View>
              );
            })}
          </Swiper>
        )} */
}

export default BannerSwiper;
