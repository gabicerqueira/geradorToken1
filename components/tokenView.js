import React, { useRef } from "react";
import { Text, StyleSheet, Pressable, Animated } from "react-native";
import { Ionicons } from '@expo/vector-icons/';
import * as Clipboard from 'expo-clipboard';

export function CaixaToken({ token, removerToken }) {
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const funcaoRemoverToken = async () => {
        setTimeout(() => {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                }
            ).start(() => {
                removerToken();
                fadeAnim.setValue(1);
            });
        }, 300);
    };

    async function copiarToken() {
        await Clipboard.setStringAsync(token);
        alert("Token copiado para área de transferência.");
    }

    return (
        <Animated.View style={[ESTILOS.animacao, { opacity: fadeAnim }]}>
            <Pressable style={ESTILOS.caixa} onLongPress={copiarToken}>
                <Text style={ESTILOS.text} selectable={false}>
                    {token}
                </Text>

                <Ionicons
                    size={25}
                    color={"#FFF"}
                    name="trash-outline"
                    onPress={funcaoRemoverToken}
                />
            </Pressable>
        </Animated.View>
    );
}

const ESTILOS = StyleSheet.create({
    caixa: {
        backgroundColor: "#0e0e0e",
        padding: 14,
        width: "100%",
        marginBottom: 14,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        color: "#fff",
        flex: 1
    },
    animacao: {
        opacity: 1
    }
});
