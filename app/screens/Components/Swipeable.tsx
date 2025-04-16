import React, {useState} from 'react';
import { LayoutAnimation,  ScrollView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from '../../layout/Header';
import SwipeBox from '../../components/SwipeBox';
import { COLORS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';

// const SwipeData = [
//     {
//         id : "1",
//         title : "swipe content list item 1",
//     },
//     {
//         id : "2",
//         title : "swipe content list item 2",
//     },
//     {
//         id : "3",
//         title : "swipe content list item 3",
//     },
//     {
//         id : "4",
//         title : "swipe content list item 4",
//     },
//     {
//         id : "5",
//         title : "swipe content list item 5",
//     },
//     {
//         id : "6",
//         title : "swipe content list item 6",
//     },
//     {
//         id : "7",
//         title : "swipe content list item 7",
//     },
//     {
//         id : "8",
//         title : "swipe content list item 8",
//     },
//     {
//         id : "9",
//         title : "swipe content list item 9",
//     },
//     {
//         id : "10",
//         title : "swipe content list item 10",
//     },
// ]

const SwipeData = [
    {
        image: IMAGES.small1,
        title: "New Arrivals Alert!",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small2,
        title: "Flash Sale Announcement",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small3,
        title: "Exclusive Discounts Inside",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small4,
        title: "Limited Stock - Act Fast!",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small5,
        title: "Get Ready to Shop",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small6,
        title: "New Arrivals Alert!",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small7,
        title: "Flash Sale Announcement",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small2,
        title: "Don't Miss Out on Savings",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small3,
        title: "Limited Stock - Act Fast!",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small4,
        title: "Get Ready to Shop",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small5,
        title: "New Arrivals Alert!",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small6,
        title: "Flash Sale Announcement",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small7,
        title: "Exclusive Discounts Inside",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small2,
        title: "Limited Stock - Act Fast!",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small3,
        title: "Get Ready to Shop",
        date: "15 July 2023"
    },
]

const SwipeableScreen = () => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const [lists, setLists] = useState(SwipeData);

    const deleteItem = (index:any) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        const arr = [...lists];
        arr.splice(index, 1);
        setLists(arr);
    };
    return (
        <View style={{
            flex:1,
            backgroundColor:colors.card,
        }}>
            <View style={{flex:1,backgroundColor:colors.Card}}>
                <Header
                    leftIcon={'back'}
                    title ={'Swipeable'}
                    titleRight
                />
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{paddingBottom:50}}>
                        {lists.map((data:any,index) => {
                            return(
                                <View
                                    key={index}
                                >
                                    <SwipeBox data={data} colors={colors} handleDelete={() => deleteItem(index)} />
                                    {/* <View
                                        style={{
                                            height:1,
                                            width:'100%',
                                            backgroundColor:colors.border,
                                        }}
                                    /> */}
                                </View>
                            )
                        })}
                    </ScrollView>
                </GestureHandlerRootView>
            </View>
        </View>
    );
};

export default SwipeableScreen;
