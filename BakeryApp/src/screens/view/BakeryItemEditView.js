import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import Axios from 'axios';
import Colors from '../../theme';
import {centsFormat, dollarFormat} from '../../utils';
import APIs from '../../constants';

const BakeryItemEditView = props => {
  const selectedItem = props.selectedItem;
  const isEdit = props.selectedItem || false;
  const [showEditView, setShowEditView] = useState(isEdit ? false : true);
  const [name, onChangeName] = React.useState(
    isEdit ? selectedItem.itemName : '',
  );
  const [price, onChangePrice] = React.useState(
    isEdit ? selectedItem.itemPrice : '',
  );

  const [nameError, setNameError] = React.useState(false);
  const [priceError, setPriceError] = React.useState(false);

  const onChangeNameTxtInput = text => {
    onChangeName(text);
    setNameError(false);
  };

  const onChangePriceTxtInput = text => {
    onChangePrice(text);
    setPriceError(false);
  };

  const deleteItem = () => {
    Axios.delete(`${APIs.BASE_URL}/bakery-item`, {
      headers: {'Content-Type': 'application/json'},
      data: {
        uuid: selectedItem.uuid,
        itemName: name,
        itemPrice: price,
      },
    })
      .then(response => {
        Alert.alert('Successfully', response.data.message, [
          {text: 'OK', onPress: () => props.onCloseModalView()},
        ]);
      })
      .catch(error => {
        console.error(error);
        const message =
          error && error.response && error.response.message
            ? error.response.data.message
            : 'Something went wrong.';
        Alert.alert('Error', message, [{text: 'OK'}]);
      });
  };

  const addItem = () => {
    if (name.trim() === '') {
      setNameError(true);
      return;
    }

    if (price.trim() === '') {
      setPriceError(true);
      return;
    }

    Axios.post(`${APIs.BASE_URL}/bakery-item`, {
      headers: {'Content-Type': 'application/json'},
      itemName: name,
      itemPrice: price,
    })
      .then(response => {
        Alert.alert('Successfully', response.data.message, [
          {text: 'OK', onPress: () => props.onCloseModalView()},
        ]);
      })
      .catch(error => {
        console.error(error);
        const message =
          error && error.response && error.response.message
            ? error.response.data.message
            : 'Something went wrong.';
        Alert.alert('Error', message, [{text: 'OK'}]);
      });
  };

  const editItem = () => {
    if (name.trim() === '') {
      setNameError(true);
      return;
    }

    if (price.trim() === '') {
      setPriceError(true);
      return;
    }

    Axios.put(`${APIs.BASE_URL}/bakery-item`, {
      headers: {'Content-Type': 'application/json'},
      uuid: selectedItem.uuid,
      itemName: name,
      itemPrice: price,
    })
      .then(response => {
        Alert.alert('Successfully', response.data.message, [
          {text: 'OK', onPress: () => props.onCloseModalView()},
        ]);
      })
      .catch(error => {
        console.error(error);
        const message =
          error && error.response && error.response.message
            ? error.response.data.message
            : 'Something went wrong.';
        Alert.alert('Error', message, [{text: 'OK'}]);
      });
  };

  let actionText = 'Save';
  let actionOnPress = addItem;

  let renderPatialView = (
    <View style={styles.editViewContainer}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeNameTxtInput}
          value={name}
          placeholder="Enter product name"
        />
        {nameError && <Text style={styles.errorText}>Invalid Name</Text>}
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangePriceTxtInput}
          value={price}
          placeholder="Enter product price"
          keyboardType="numeric"
        />
        {priceError && <Text style={styles.errorText}>Invalid Price</Text>}
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={isEdit ? editItem : addItem}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );

  if (isEdit) {
    if (!showEditView) {
      actionText = 'Edit';
      actionOnPress = () => setShowEditView(true);

      renderPatialView = (
        <View style={styles.detailContainer}>
          <Text style={styles.itemName}>{selectedItem.itemName}</Text>
          <Text style={styles.itemPrice}>
            <Text>USD ${dollarFormat(selectedItem.itemPrice)}</Text>
            <Text style={styles.centText}>
              {centsFormat(selectedItem.itemPrice)}
            </Text>
          </Text>
        </View>
      );
    } else {
      actionText = 'Details';
      actionOnPress = () => setShowEditView(false);
    }
  }

  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <SafeAreaView style={styles.flex1}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={props.onCloseModalView}>
            <Text style={styles.closeTextStyle}>Close</Text>
          </TouchableOpacity>
          {isEdit && (
            <View style={styles.rightActionContainer}>
              <TouchableOpacity onPress={actionOnPress}>
                <Text style={styles.actionTextStyle}>{actionText}</Text>
              </TouchableOpacity>
              {!showEditView && (
                <TouchableOpacity onPress={deleteItem}>
                  <Text style={styles.deleteTextStyle}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
        {renderPatialView}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    backgroundColor: Colors.background.WHITE,
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  rightActionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  closeTextStyle: {
    padding: 16,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.GRAY,
  },
  actionTextStyle: {
    padding: 16,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.LINK_BLUE,
  },
  deleteTextStyle: {
    padding: 16,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.RED,
  },
  detailContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
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
  editViewContainer: {
    marginTop: 100,
    marginHorizontal: 16,
  },
  textInputContainer: {
    margin: 12,
  },
  textInput: {
    height: 44,
    borderWidth: 1,
    borderColor: Colors.text.GRAY,
    padding: 10,
    borderRadius: 10,
  },
  errorText: {
    marginLeft: 4,
    marginTop: 4,
    color: Colors.text.RED,
    fontSize: 10,
  },
  saveButton: {
    backgroundColor: Colors.background.YELLOW_DARK,
    borderRadius: 10,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },
  saveButtonText: {fontWeight: 'bold', color: Colors.text.WHITE},
});

export default BakeryItemEditView;
