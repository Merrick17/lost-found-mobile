import { Button, Input, Text } from 'galio-framework';
import React from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';
import { GlobalStyles } from '../styles/global';
import { ScreenProps } from '../constants/types';
import { useForm, Controller } from 'react-hook-form';

const Login = ({ navigation }: ScreenProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = (data: any) => console.log('Daata', data);
    const handleRegister = () => {
        navigation.navigate('Register');
    };
    const handleLogin = () => {
        handleSubmit(onSubmit);
        console.log('Errors', errors);
        //navigation.navigate('Main');
        // if (errors) {
        //     Alert.alert('Erreur de saisie');
        // }
    };
    return (
        <View style={GlobalStyles.container}>
            <Image source={require('../assets/imgs/logo.png')} style={styles.logo} />
            <Controller
                name="email"
                control={control}
                rules={{
                    required: true,
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format"
                    }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="Email"
                        style={GlobalStyles.inputStyle}
                        label="Email"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors && errors.email && (
                <Text color="red" style={styles.errorLabel}>
                    Email Invalide
                </Text>
            )}
            <Controller
                name="password"
                rules={{ required: true, minLength: 8 }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        password
                        placeholder="Mot de passe"
                        style={GlobalStyles.inputStyle}
                        label="Mot de passe"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.password && (
                <Text color="red" style={styles.errorLabel}>
                    Mot de passe Invalide
                </Text>
            )}

            <View style={styles.forgotPass}>
                <Text>Mot de passe oublie ? </Text>
                <TouchableOpacity>
                    <Text bold color={colors.main}>
                        Cliquez ici
                    </Text>
                </TouchableOpacity>
            </View>
            <Button
                color={colors.main}
                shadowless
                style={GlobalStyles.mainBtnStyles}
                onPress={handleSubmit(onSubmit)}>
                Se Connecter
            </Button>
            <View style={styles.forgotPass}>
                <Text>Pas encore inscrit ? </Text>
                <TouchableOpacity onPress={handleRegister}>
                    <Text bold color={colors.main}>
                        Insrivez vous ici
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;

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
    errorLabel: {
        alignSelf: 'flex-start',
    },
});
