import { Button, Input, Text } from 'galio-framework';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../constants/colors';
import { GlobalStyles } from '../styles/global';
import { ScreenProps } from '../constants/types';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { createUserApi } from '../redux/actions/user.actions';
import { useToast } from 'react-native-toast-notifications';
const Register = ({ navigation }: ScreenProps) => {
    const toast = useToast();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            password: '',
            phoneNumber: '',
        },
    });
    const dispatch = useDispatch();
    const onSubmit = (data: any) => {

        //@ts-ignore
        dispatch(createUserApi(data,toast))
    }
    const handleLogin = () => {
        navigation.pop();
    };
    return (
        <View style={GlobalStyles.container}>
            <Image source={require('../assets/imgs/logo.png')} style={styles.logo} />
            <ScrollView style={styles.innerScroll}>
                <Controller
                    control={control}
                    name="lastName"

                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Nom"
                            style={GlobalStyles.inputStyle}
                            label="Nom"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors && errors.lastName && (
                    <Text color="red" style={styles.errorLabel}>
                        Nom obligatoire
                    </Text>
                )}
                <Controller
                    control={control}
                    name="firstName"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Prénom"
                            style={GlobalStyles.inputStyle}
                            label="Prénom"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {
                    errors.firstName && <Text color="red" style={styles.errorLabel}>
                        Prénom obligatoire
                    </Text>
                }
                <Controller
                    control={control}
                    name="address"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input

                            placeholder="Adresse"
                            style={GlobalStyles.inputStyle}
                            label="Adresse"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {
                    errors.address && <Text color="red" style={styles.errorLabel}>
                        Adresse obligatoire
                    </Text>
                }
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        minLength: 8, required: true, pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Entered value does not match email format"
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Email"
                            style={GlobalStyles.inputStyle}
                            label="Email"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {
                    errors.email && <Text color="red" style={styles.errorLabel}>
                        Email Invalide
                    </Text>
                }
                <Controller
                    control={control}
                    name="password"
                    rules={{ minLength: 8, required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Mot de passe"
                            style={GlobalStyles.inputStyle}
                            label="Mot de passe"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {
                    errors.password && <Text color="red" style={styles.errorLabel}>
                        Mot de passe invalide
                    </Text>
                }

                <Button onPress={handleSubmit(onSubmit)}
                    color={colors.main}
                    shadowless
                    style={GlobalStyles.mainBtnStyles}>

                    Inscrivez Vous
                </Button>
                <View style={styles.forgotPass}>
                    <Text>Déja inscrit ? </Text>
                    <TouchableOpacity onPress={handleLogin}>
                        <Text bold color={colors.main}>
                            Se Connecter
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default Register;

const styles = StyleSheet.create({
    forgotPass: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        rowGap: 10,
        width: '100%',
        marginVertical: 10,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'center',
    },
    innerScroll: {
        display: 'flex',
        flex: 1,
        width: '100%',
    },
    errorLabel: {
        alignSelf: 'flex-start',
    },
});
