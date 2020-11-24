import React, {Component} from 'react';
import Http from 'cryptoTracker/src/libs/http';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import CoinsItem from './CoinsItem';
import colors from 'cryptoTracker/src/resources/colors';

class CoinsScreen extends Component {
  state = {
    coins: [],
  };

  componentDidMount = async () => {
    const res = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    this.setState({coins: res.data});
  };

  handlePress = (coin) => {
    this.props.navigation.navigate('CoinsDetail', {coin});
  };
  render() {
    const {coins} = this.state;

    return (
      <View style={styles.container}>
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
