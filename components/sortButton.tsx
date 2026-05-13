
import { useUserThemeColors } from '@/hooks/userThemesColors';
import React from 'react'
import { StyleSheet, View, Image } from 'react-native';
import { useState } from "react";

type Props = {
    value: "id" | "name",
    onChange: (value: "id" | "name") => void
}


export function SortButton({ value, onChange }: Props) {
    const colors = useUserThemeColors();
    const [sortKey, setSortKey] = useState<"id"|"name">("id");

    return (
        <View style={[stylesFilters.button, {backgroundColor: colors.grayWhite}]}>
            <Image
            source={
                sortKey === "id"
                ? require("@/assets/icons/hashtag.png")
                : require("@/assets/icons/alpha.png")
            }
            width={16}
            height={16}
            />
        </View>
    )
}

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
   /*  backdrop: {
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
    }, */
});