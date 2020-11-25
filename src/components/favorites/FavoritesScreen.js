import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../resources/colors';
import FavoritesEmpty from './FavoritesEmpty';

class FavoritesScreen extends Component {
   render() {
      return (
         <View style={styles.container}>
            <FavoritesEmpty />
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.charade,
      flex: 1
   }
});

export default FavoritesScreen;