import React, {Component} from 'react';
import Http from 'cryptoTracker/src/libs/http';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import CoinsItem from './CoinsItem';
import CoinsSearch from './CoinsSearch';
import colors from 'cryptoTracker/src/resources/colors';

class CoinsScreen extends Component {
  state = {
    coins: [],
    allCoins: []
  };

  componentDidMount = () => {
    this.getCoins();
  };

  getCoins = async () => {
   const res = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    this.setState({coins: res.data, allCoins: res.data});
  }

  handlePress = (coin) => {
    this.props.navigation.navigate('CoinsDetail', {coinObj: coin});
  };

  handleSearch = (query) => {
      const {allCoins} = this.state;

      const coinsFiltered = allCoins.filter(coin => {
         return coin.name.toLowerCase().includes(query.toLowerCase()) || coin.symbol.toLowerCase().includes(query.toLowerCase())
      });

      this.setState({coins: coinsFiltered});
  }

  render() {
    const {coins} = this.state;
    return (
      <View style={styles.container}>
      <CoinsSearch onChange={this.handleSearch} />
        <FlatList
          data={coins}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => this.handlePress(item)} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
    paddingTop: 10,
    paddingBottom: 10,
  },
  titleText: {
    color: '#fff',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'green',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default CoinsScreen;
