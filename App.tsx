import React from 'react';
import 'react-native-gesture-handler';
import Route from './app/navigation/Route';
import { useFonts } from 'expo-font';
import { useTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux'
import store from './app/redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import Tickets from './app/screens/Tickets/Tickets';

export default function App() {


  const theme = useTheme();
  const { colors } : {colors : any} = theme;

  const [loaded] = useFonts({
    JostBold: require('./app/assets/fonts/Jost-Bold.ttf'),
    JostSemiBold : require('./app/assets/fonts/Jost-SemiBold.ttf'),
    JostLight : require('./app/assets/fonts/Jost-Light.ttf'),
    JostMedium : require('./app/assets/fonts/Jost-Medium.ttf'),
    JostRegular : require('./app/assets/fonts/Jost-Regular.ttf'),
    JostExtraLight : require('./app/assets/fonts/Jost-ExtraLight.ttf'),
  });

  if(!loaded){
    return null;
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            //paddingTop: Platform.OS === 'android' ? 25 : 0,
            //backgroundColor:COLORS.primary ,
          }}>
            <StatusBar style="dark" />
            <Provider store={store}>
              <Route/>
            </Provider>
        </SafeAreaView>
      </SafeAreaProvider>

    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
