import React, { useState, useEffect } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";

const BannerSwiper = ({ bannerData }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenWidth = Dimensions.get("window").width;
  const aspectRatio = 800 / 450;
  const bannerHeight = screenWidth / aspectRatio;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === bannerData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [bannerData.length]);

  return (
    <View style={[styles.outerContainer, { height: bannerHeight }]}>
      {bannerData.map((data: any, index: number) => (
        <Image
          key={index}
          style={[
            styles.bannerImage,
            {
              height: bannerHeight,
              opacity: index === currentIndex ? 1 : 0,
            }
          ]}
          source={{ uri: data.app_banner_url }}
          resizeMode="cover"
        />
      ))}
      <View style={styles.pagination}>
        {bannerData.map((_: any, index: number) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.activeDot
            ]}
          />
        ))}
      </View>
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
  bannerImage: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    zIndex: 1,
  },
  dot: {
    height: 6,
    width: 6,
    backgroundColor: "#ccc",
    opacity: 0.2,
    borderRadius: 3,
  },
  activeDot: {
    backgroundColor: "#333",
    opacity: 1,
  },
});

export default BannerSwiper;
