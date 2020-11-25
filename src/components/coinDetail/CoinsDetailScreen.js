import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  SectionList,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import CoinMarketItem from '../coinDetail/CoinMarketItem';
import colors from '../../resources/colors';
import Http from '../../libs/http';
import Storage from '../../libs/storage';

class CoinsDetailScreen extends Component {
  state = {
    coin: {},
    markets: [],
    isFavorite: false
  };

  getSymbolIcon = (name) => {
    if (name) {
      const symbol = name.toLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  getSections = (coin) => {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24hs',
        data: [coin.volume24],
      },
      {
        title: 'Change 24hs',
        data: [coin.percent_change_24h],
      },
    ];

    return sections;
  };

  getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);

    this.setState({markets});
  };

  toggleFavorite = () => {
     if (this.state.isFavorite) {
        //this.removeFavorite();
     } else {
        //this.addFavorite();
     }
  }

  /*
  getFavorite = async () => {
     try {
      const key = `favorite-${this.state.coin.id}`;

      const string = await Storage.instance.get(key);
     } catch (err) {
        console.log(err);
     }
  }

  removeFavorite = async () => {
   const key = `favorite-${this.state.coin.id}`;

   await Storage.instance.remove(key);

   this.setState({isFavorite: false});
  }

  addFavorite = async () => {
      const coin = JSON.stringify(this.state.coin);
      const key = `favorite-${this.state.coin.id}`;

      const stored = await Storage.instance.store(key, coin);

      if (stored) {
         this.setState({isFavorite: true});
      }
  }
  */

  componentDidMount() {
    const {coinObj} = this.props.route.params;
    this.props.navigation.setOptions({title: coinObj.symbol});
    this.getMarkets(coinObj.id);
    this.setState({coin: coinObj}, () => this.getFavorite());
  }

  render() {
    const {coin, markets, isFavorite} = this.state;
    return (
      <View style={styles.container}>
         <View style={styles.subHeader}>
            <View style={styles.row}>
               <Image
                  style={styles.symbolStyle}
                  source={{uri: this.getSymbolIcon(coin.name)}}
               />
               <Text style={styles.titleText}>{coin.name}</Text>
            </View>
          
            <Pressable
               style={[styles.favoriteBtn, isFavorite ? styles.favoriteBtnRemove : styles.favoriteBtnAdd]}
               onPress={this.toggleFavorite}
            >
               <Text style={styles.favoriteText}>{isFavorite ? 'Remove favorite' : 'Add favorite'}</Text>
            </Pressable>
        </View>

        <SectionList
          style={styles.section}
          sections={this.getSections(coin)}
          keyExtractor={(item) => item}
          renderItem={({item}) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          )}
        />

        <Text style={styles.marketTitle}>Markets</Text>
        <FlatList
          style={styles.marketList}
          horizontal={true}
          data={markets}
          renderItem={({item}) => <CoinMarketItem item={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  row: {
     flexDirection: 'row'
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  symbolStyle: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketList: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  marketTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  favoriteBtn: {
     padding: 8,
     borderRadius: 8
  },
  favoriteText: {
     color: colors.white
  },
  favoriteBtnAdd: {
     backgroundColor: colors.picton
  },
  favoriteBtnRemove: {
     backgroundColor: colors.carmine
  }
});

export default CoinsDetailScreen;
