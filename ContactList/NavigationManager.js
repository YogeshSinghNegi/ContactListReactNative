import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Favorites from './screens/Favorites';
import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import User from './screens/User';
import Options from './screens/Options';

import colors from './utils/colors';

const getTabBarIcon = (icon) => {
  return <Icon name={icon} size={26} style={{ color: colors.blue }} />
};

const ContactsStack = createNativeStackNavigator();
const ContactsStackScreen = () => {
  return (
    <ContactsStack.Navigator>
      <ContactsStack.Screen name="Contacts" component={Contacts} />
      <ContactsStack.Screen name="Profile" component={Profile} />
    </ContactsStack.Navigator>
  );
}

const FavoritesStack = createNativeStackNavigator();
const FavoritesStackScreen = () => {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="Favorites" component={Favorites} />
      <FavoritesStack.Screen name="Profile" component={Profile} />
    </FavoritesStack.Navigator>
  );
}

const UserStack = createNativeStackNavigator();
const UserStackScreen = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="User" component={User} />
      <UserStack.Screen name="Profile" component={Options} />
    </UserStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const NavigationManager = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [{ "display": "flex", "backgroundColor": colors.greyLight }],
        activeTintColor: colors.blue,
        inactiveTintColor: colors.greyDark
      }} >
        <Tab.Screen name="Contact" component={ContactsStackScreen} options={{ tabBarIcon: () => getTabBarIcon('list') }} />
        <Tab.Screen name="Favorite" component={FavoritesStackScreen} options={{ tabBarIcon: () => getTabBarIcon('star') }} />
        <Tab.Screen name="Setting" component={UserStackScreen} options={{ tabBarIcon: () => getTabBarIcon('person') }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavigationManager;