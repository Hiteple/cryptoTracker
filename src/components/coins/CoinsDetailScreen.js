import React, {Component} from 'react';
import {View, Text} from 'react-native';

class CoinsDetailScreen extends Component {
  state = {
    coin: {},
  };
  componentDidMount() {
    const {coin} = this.props.route.params;
    this.props.navigation.setOptions({title: coin.symbol});
    this.setState({coin});
  }
  render() {
    return (
      <View>
        <Text>Coin detail screen</Text>
      </View>
    );
  }
}

export default CoinsDetailScreen;
