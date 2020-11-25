import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from './FavoritesScreen';
import colors from '../../resources/colors';

const Stack = createStackNavigator();

const FavoritesStack = () => {
   return (
      <Stack.Navigator screenOptions={{
         headerStyle: {
           backgroundColor: colors.blackPearl,
           shadowColor: colors.blackPearl,
         },
         headerTintColor: colors.white,
       }}>
         <Stack.Screen name='Favorites' component={FavoritesScreen} />
      </Stack.Navigator>
   );
}

export default FavoritesStack;