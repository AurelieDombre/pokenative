
import { useThemeColors } from '../hooks/useThemesColors';
import React, { useRef } from 'react'
import { StyleSheet, View, Image, Pressable, Modal, Dimensions } from 'react-native'
import { useState } from "react";
import { ThemedText } from '@/components/ThemedText'
import { Card } from '@/components/card'
import { Row } from '@/components/row'
import { Radio } from '@/components/radio'
import { Shadows } from '@/constants/Shadows'


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
        elevation: 2, // ou shadows si IOS
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

// Bouton radio pour le modal
const options = [
    { label: "Number", value: "id" },
    { label: "Name", value: "name" },
] as const

export function SortButton({ value, onChange }: Props) {
    const colors = useThemeColors();
    const [sortKey, setSortKey] = useState<"id" | "name">("id");
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    // Sauvegarde l'emplacement du modal
    const buttonRef = useRef<View>(null);
    const [position, setPosition] = useState < null | {
        top: number
        right: number
    } >(null)
    // Quand on ouvre le bouton il faut générer la valeur de position avec measureInWindow qui permet de mesurer l'élément dans la fenêtre
    const onOpen = () => {
        buttonRef.current?.measureInWindow((x, y, width, height) => {
            setPosition({
                top: y + height,
                //On veut la position par rapport à la droite de la fenetre, donc on get la taille de la fenetre, on récup la largeur auquel on retire x et la largeur de l'élément
                right: Dimensions.get("window").width - x - width,
            })
            setModalVisible(true);
        })
        setModalVisible(true);
    }
    const onClose = () => {
        setModalVisible(false);
    }



    return (
        <>
            <Pressable onPress={onOpen}>
                <View
                    ref={buttonRef}
                    style={[stylesFilters.button, { backgroundColor: colors.grayWhite }]}>
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
            <Modal animationType={'fade'} transparent visible={isModalVisible} onRequestClose={onClose}>
                <Pressable style={stylesFilters.backdrop} onPress={onClose} />
                <View style={[stylesFilters.popup, {backgroundColor: colors.tint, ...position }]}>
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

