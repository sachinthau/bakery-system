import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Lottie from 'lottie-react-native';
import Colors from '../theme';
import APIs from '../constants';
import Axios from 'axios';
import {centsFormat, dollarFormat} from '../utils';
import BakeryItemEditView from './view/BakeryItemEditView';

const App = () => {
  const [bakeryItems, setBakeryItems] = useState([]);
  const [noData, setNoData] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showEditView, setShowEditView] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  let renderView = null;

  const getBakeryItems = () => {
    Axios.get(`${APIs.BASE_URL}/bakery-items`, {
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        setLoading(false);
        const data = [...response.data, ...response.data];

        if (Array.isArray(data) && data.length <= 0) {
          setNoData(true);
        }

        setBakeryItems(data);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getBakeryItems();
  }, [isLoading, noData]);

  const loadingView = (
    <View style={styles.loaderContainer}>
      <Lottie
        style={styles.loader}
        source={require('../../asserts/lotties/chef-loader.json')}
        autoPlay
        loop
      />
    </View>
  );

  const noDataView = (
    <View style={styles.noDataContainer}>
      <Lottie
        style={styles.noData}
        source={require('../../asserts/lotties/no-data.json')}
        autoPlay
        loop
      />
    </View>
  );

  const onPressItem = item => {
    setSelectedItem(item);
    setShowEditView(true);
  };

  const onPressAdd = () => {
    setSelectedItem(null);
    setShowEditView(true);
  };

  const onCloseModalView = () => {
    setShowEditView(false);
    setSelectedItem(null);
    getBakeryItems();
  };

  const renderBakeryItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressItem(item)}
        style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.itemName}</Text>
        <Text style={styles.itemPrice}>
          <Text>USD ${dollarFormat(item.itemPrice)}</Text>
          <Text style={styles.centText}>{centsFormat(item.itemPrice)}</Text>
        </Text>
      </TouchableOpacity>
    );
  };

  const bakeryItemListView = (
    <View style={styles.listViewContainer}>
      <FlatList
        style={styles.listView}
        keyExtractor={(_, index) => index}
        data={bakeryItems}
        renderItem={renderBakeryItem}
      />
    </View>
  );

  if (isLoading) {
    renderView = loadingView;
  } else if (noData) {
    renderView = noDataView;
  } else {
    renderView = bakeryItemListView;
  }

  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar />
      <View style={styles.flex1}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Hello !</Text>
          <Text style={styles.headerDescription}>Life is what you bake it</Text>
        </View>
        {renderView}
      </View>
      {showEditView && (
        <BakeryItemEditView
          selectedItem={selectedItem}
          visible={showEditView}
          onCloseModalView={onCloseModalView}
        />
      )}
      <TouchableOpacity onPress={onPressAdd} style={styles.addFABContainer}>
        <Text style={styles.addFABText}>{'+ Add'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
    backgroundColor: Colors.background.YELLOW,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text.BLACK,
  },
  headerDescription: {
    marginTop: 4,
    fontSize: 16,
    color: Colors.text.GRAY,
  },
  loaderContainer: {
    flex: 1,
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {width: 140, height: 140},
  noDataContainer: {
    flex: 1,
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noData: {width: 140, height: 140},
  listViewContainer: {
    flex: 1,
  },
  listView: {
    paddingTop: 16,
  },
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.text.GRAY,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  itemName: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.text.BLACK,
  },
  itemPrice: {
    marginTop: 8,
    fontSize: 16,
    color: Colors.text.GREEN,
  },
  centText: {fontSize: 12},
  addFABContainer: {
    position: 'absolute',
    right: 16,
    backgroundColor: Colors.background.YELLOW_DARK,
    height: 64,
    width: 64,
    borderRadius: 32,
    bottom: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
  },
  addFABText: {fontSize: 12, fontWeight: 'bold', color: Colors.text.WHITE},
});

export default App;
