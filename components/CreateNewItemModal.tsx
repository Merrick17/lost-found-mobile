import {Button, Icon, Input} from 'galio-framework';
import React, {useRef, useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {GlobalStyles} from '../styles/global';
import {colors} from '../constants/colors';
import {ModalProps} from '../constants/types';

const CreateNewItemModal = ({isOpen, handleClose}: ModalProps) => {
  const [category, setCategory] = useState('categ1');
  const categoryActionSheetRef = useRef<ActionSheetRef>(null);
  const subCategoryActionSheet = useRef<ActionSheetRef>(null);
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Ajouter nouvelle publication</Text>
            <Input
              style={GlobalStyles.inputStyle}
              placeholder="Titre"
              label="Titre"
            />
            <Input
              style={GlobalStyles.inputStyle}
              placeholder="Description"
              label="Description"
            />
            <Input
              style={GlobalStyles.inputStyle}
              placeholder="Category"
              label="Category"
              value={category}
              aria-disabled={true}
              onPressIn={() => {
                categoryActionSheetRef.current?.show();
              }}
            />
            <Input
              style={GlobalStyles.inputStyle}
              placeholder="Category"
              label="Category"
              value={category}
              aria-disabled={true}
              onPressIn={() => {
                subCategoryActionSheet.current?.show();
              }}
            />
            <View style={styles.imageContainer}>
              <Button onlyIcon color={colors.main} icon="camera" iconFamily="Entypo" />
              <Button
              onlyIcon
                color={colors.main}
                icon="attachment"
                iconFamily="Entypo"
              />
            </View>
            <View style={styles.modalBottom}>
              <Button size={'small'} onPress={() => handleClose()}>
                Annuler
              </Button>
              <Button
                color={colors.main}
                size={'small'}
                onPress={() => handleClose()}>
                Confirmer
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <ActionSheet ref={categoryActionSheetRef}>
        <View style={styles.actionSheetList}>
          <TouchableOpacity
            style={styles.actionSheetItem}
            onPress={() => {
              setCategory('categ1');
              categoryActionSheetRef.current?.hide();
            }}>
            <Text style={styles.actionText}>test 1</Text>
            <Icon name="chevron-thin-right" color="#000" family="Entypo" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionSheetItem}
            onPress={() => {
              setCategory('categ2');
              categoryActionSheetRef.current?.hide();
            }}>
            <Text style={styles.actionText}>test 2</Text>
            <Icon name="chevron-thin-right" color="#000" family="Entypo" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionSheetItem}
            onPress={() => {
              setCategory('categ3');
              categoryActionSheetRef.current?.hide();
            }}>
            <Text style={styles.actionText}>test 3</Text>
            <Icon name="chevron-thin-right" color="#000" family="Entypo" />
          </TouchableOpacity>
        </View>
      </ActionSheet>
      <ActionSheet ref={subCategoryActionSheet}>
        <View style={styles.actionSheetList}>
          <TouchableOpacity
            style={styles.actionSheetItem}
            onPress={() => {
              setCategory('categ1');
              subCategoryActionSheet.current?.hide();
            }}>
            <Text style={styles.actionText}>test 1</Text>
            <Icon name="chevron-thin-right" color="#000" family="Entypo" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionSheetItem}
            onPress={() => {
              setCategory('categ2');
              subCategoryActionSheet.current?.hide();
            }}>
            <Text style={styles.actionText}>test 2</Text>
            <Icon name="chevron-thin-right" color="#000" family="Entypo" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionSheetItem}
            onPress={() => {
              setCategory('categ3');
              subCategoryActionSheet.current?.hide();
            }}>
            <Text style={styles.actionText}>test 3</Text>
            <Icon name="chevron-thin-right" color="#000" family="Entypo" />
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </>
  );
};

export default CreateNewItemModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 5,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'flex-start',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalBottom: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    alignSelf: 'flex-start',
    fontSize: 17,
    fontWeight: '500',
  },
  actionSheetList: {
    display: 'flex',
    height: 150,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
    padding: 20,
    width: '100%',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  actionSheetItem: {
    fontWeight: '700',
    fontSize: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionText: {
    fontSize: 22,
    fontWeight: '600',
  },
});
