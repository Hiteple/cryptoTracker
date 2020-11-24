import React from 'react';
import {View, Text, Image, Pressable, StyleSheet, Platform} from 'react-native';
import ArrowUp from 'cryptoTracker/src/assets/images/arrowUp.png';
import ArrowDown from 'cryptoTracker/src/assets/images/arrowDown.png';
import colors from '../../resources/colors';

const CoinsItem = ({item, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.symbolText}>{item.name}</Text>
          <Text style={styles.nameText}>{item.symbol}</Text>
          <Text style={styles.priceText}>{`$ ${item.price_usd}`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.percentText}>{item.percent_change_1h}</Text>
          <Image
            style={styles.imageIcon}
            source={item.percent_change_1h > 0 ? ArrowUp : ArrowDown}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: colors.zircon,
    borderBottomWidth: 1,
    marginLeft: Platform.OS == 'ios' ? 0 : 16,
    marginLeft: Platform.OS == 'ios' ? 16 : 0,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 12,
  },
  priceText: {
    color: '#fff',
    fontSize: 14,
  },
  percentText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 8,
  },
  imageIcon: {
    width: 18,
    height: 18,
  },
});

export default CoinsItem;
