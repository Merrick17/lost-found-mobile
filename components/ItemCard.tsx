import { Button } from 'galio-framework';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

type ItemCardType = {
    title: string;
    description: string;
    id: string;
    createdAt: string;
    photos: string[];
    ind: number;
};
const ItemCard = ({
    title,
    description,
    id,
    createdAt,
    photos,
    ind,
}: ItemCardType) => {
    return (
        <View style={styles.card}>
            <View style={styles.itemCounter}>
                <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 20 }}>
                    {ind}
                </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "80%" }}>
                <View>
                    <Text style={{ fontWeight: '700', fontSize: 20 }}>{title}</Text>
                    <Text style={{ fontWeight: '500', fontSize: 14 }}>{description}</Text>
                </View>
                <View style={styles.itemButtons}>
                    <Button
                        onlyIcon
                        icon="delete"
                        iconFamily="antdesign"
                        iconSize={20}
                        color="red"
                        iconColor="#fff"
                        style={{ width: 40, height: 40 }}>
                        warning
                    </Button>
                    <Button
                        onlyIcon
                        icon="tags"
                        iconFamily="antdesign"
                        iconSize={30}
                        color={colors.main}
                        iconColor="#fff"

                        style={{ width: 40, height: 40 }}>
                        warning
                    </Button>
                </View>
            </View>
        </View>
    );
};

export default ItemCard;

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 70,
        padding: 5,
        marginVertical: 10,
        backgroundColor: colors.input,
        elevation: 1,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20,

        borderColor: colors.hover,
    },
    cardImageRadius: {
        height: '78%',
        width: '30%',
        resizeMode: 'contain',
    },
    itemCounter: {
        backgroundColor: colors.main,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    itemButtons: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        paddingHorizontal: 10
    },
});
