import React from 'react';

// Stacks
import CoinsStack from 'cryptoTracker/src/components/coins/CoinsStack';
import FavoritesStack from './src/components/favorites/FavoritesStack';

// From React-Native
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

// Assets & utilities
import Bank from 'cryptoTracker/src/assets/images/bank.png';
import Star from 'cryptoTracker/src/assets/images/star.png';
import colors from './src/resources/colors';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator tabBarOptions={{
         tintColor: '#fefefe',
         activeTintColor: '#fff',
         style: {
            backgroundColor: colors.blackPearl
         }
      }}>
         <Tabs.Screen
            name='Coins'
            component={CoinsStack} 
            options={{
               tabBarIcon: ({size, color}) => (
                  <Image
                     style={{tintColor: color, width: size, height: size}}
                     source={Bank}
                  />
               )
            }}
         />
         <Tabs.Screen
            name='Favorites'
            component={FavoritesStack} 
            options={{
               tabBarIcon: ({size, color}) => (
                  <Image
                     style={{tintColor: color, width: size, height: size}}
                     source={Star}
                  />
               )
            }}
         />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
