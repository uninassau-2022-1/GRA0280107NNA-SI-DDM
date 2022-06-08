import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CityCouncilor, { CouncilorDrawerContent } from '../screens/CityCouncilor';
import Mayor, { MayorDrawerContent } from '../screens/Mayor';
import NewSimulation from '../screens/NewSimulation';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CityCouncilorDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={() => <CouncilorDrawerContent />} screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="CityCouncilorDrawer" component={CityCouncilor} />
    </Drawer.Navigator>
  );
};
const MayorDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={() => <MayorDrawerContent />} screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="MayorDrawer" component={Mayor} />
    </Drawer.Navigator>
  );
};

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='CityCouncilor'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='CityCouncilor' component={CityCouncilorDrawer} />
        <Stack.Screen name='Mayor' component={MayorDrawer} />
        <Stack.Screen name='NewSimulation' component={NewSimulation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRoutes;
