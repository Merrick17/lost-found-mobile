import { Button, Input, Text } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../constants/colors';
import { ModalProps } from '../constants/types';
import { updateUserApi } from '../redux/actions/user.actions';
import { GlobalStyles } from '../styles/global';
const UpdateUserModal = ({ isOpen, handleClose }: ModalProps) => {
    const { token, user } = useSelector(({ auth }: any) => auth);
    const toast = useToast();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setAddress(user.address);
            setEmail(user.email);
            setPhoneNumber(user.phoneNumber);
        }
    }, [user]);
    const handleConfirm = () => {
        dispatch(
            //@ts-ignore
            updateUserApi(
                {
                    firstName,
                    lastName,
                    address,
                    email,
                    phoneNumber,
                }, token,
                toast,
            ),
        );
        handleClose();
    };

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
                        <Text style={styles.modalText}>Modifier Profil</Text>

                        <Input
                            style={GlobalStyles.inputStyle}
                            placeholder="Nom"
                            label="Nom"
                            value={lastName}
                            onChangeText={txt => setLastName(txt)}
                        />
                        <Input
                            style={GlobalStyles.inputStyle}
                            placeholder="Prénom"
                            label="Prénom"
                            value={firstName}
                            onChangeText={txt => setFirstName(txt)}
                        />
                        <Input
                            style={GlobalStyles.inputStyle}
                            placeholder="Email"
                            label="Email"
                            value={email}
                            onChangeText={txt => setEmail(txt)}
                        />
                        <Input
                            style={GlobalStyles.inputStyle}
                            placeholder="Adresse"
                            label="Adresse"
                            value={address}
                            onChangeText={txt => setAddress(txt)}
                        />
                        <Input
                            style={GlobalStyles.inputStyle}
                            placeholder="Numéro Téléphone"
                            label="Numéro Téléphone"
                            value={phoneNumber}
                            onChangeText={txt => setPhoneNumber(txt)}
                        />

                        <View style={styles.modalBottom}>
                            <Button size={'small'} onPress={() => handleClose()}>
                                Annuler
                            </Button>
                            <Button
                                color={colors.main}
                                size={'small'}
                                onPress={() => handleConfirm()}>
                                Confirmer
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default UpdateUserModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 22,
        height: 500,
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
        height: 650,
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
        zIndex: 1,
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
    categoryInput: {
        width: '100%',
        height: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,

        backgroundColor: '#f7f8fa',
        borderRadius: 10,
        marginTop: 20,
    },
});
