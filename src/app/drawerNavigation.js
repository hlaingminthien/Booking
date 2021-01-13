// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Screens
import HomeScreen from './homescreen';
import CustomSidebarMenu from './sidebar';
import NavigationDrawerHeader from '../Service/common';
import {
  Image
} from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const homeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: props => <LogoTitle {...props} /> , //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  );
};

function LogoTitle() {
  return (
    <Image style={{width: 60, height: 50}}
          source={require('../Image/T&P.png')}
        />
  );
}
const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        // activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: { color: 'white'},
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={{headerShown: false}}
      drawerContent={CustomSidebarMenu}>
       <Drawer.Screen
        name="homeScreenStack"
        options={{drawerLabel: ()=> null }}
        component={homeScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;