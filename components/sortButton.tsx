
import { useThemeColors } from '../hooks/useThemesColors';
import React from 'react'
import { StyleSheet, View, Image, Pressable, Modal } from 'react-native'
import { useState } from "react";
import { ThemedText } from '@/components/ThemedText'
import { Card } from '@/components/card'
import { Row } from '@/components/row'
import { Radio } from '@/components/radio'


const stylesFilters = StyleSheet.create({
    button: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        borderRadius: 32,
        flex: 0,
        zIndex: 6,
    },
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    popup: {
        position: "absolute",
        elevation: 2,
        gap: 16,
        padding: 4,
        paddingTop: 16,
        top: 0,
        right: 0,
        width: 113,
        borderRadius: 12,
    },
    title: {
        marginLeft: 20,
    },
    card: {
        paddingVertical: 16,
        paddingLeft: 20,
        gap: 16,
        alignItems: "flex-start",
    },
});

type Props = {
    value: "id" | "name",
    onChange: (value: "id" | "name") => void
}


export function SortButton({ value, onChange }: Props) {
    const colors = useThemeColors();
    const [sortKey, setSortKey] = useState<"id" | "name">("id");
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const onOpen = () => {
        setModalVisible(true);
    }
    const onClose = () => {
        setModalVisible(false);
    }

    // Bouton radio pour le modal
    const options = [
        { label: "Number", value: "id" },
        { label: "Name", value: "name" },
    ] as const

    return (
        <>
            <Pressable onPress={onOpen}>
                <View style={[stylesFilters.button, { backgroundColor: colors.grayWhite }]}>
                    <Image
                        source={
                            sortKey === "id"
                                ? require("@/assets/icons/hashtag.png")
                                : require("@/assets/icons/alpha.png")
                        }
                        style={{ width: 16, height: 16 }}
                    />
                </View>
            </Pressable>
            <Modal transparent visible={isModalVisible} onRequestClose={onClose}>
                <Pressable style={stylesFilters.backdrop} onPress={onClose} />
                <View style={[stylesFilters.popup, {backgroundColor: colors.tint}]}>
                    <ThemedText style={stylesFilters.title} variant={"subtitle2"} color={"grayWhite"}>Sort by : </ThemedText>
                    <Card style={stylesFilters.card}>
                        {options.map((option) => (
                            <Pressable
                                onPress={() => {
                                    setSortKey(option.value);
                                    onChange(option.value);
                                }}
                                key={option.value}
                            >
                                <Row key={option.value} gap={8}>
                                    <Radio checked={value === option.value} />
                                    <ThemedText variant="body3">{option.label}</ThemedText>
                                </Row>
                            </Pressable>
                        ))}
                    </Card>
                </View>
            </Modal>
        </>
    )
}

