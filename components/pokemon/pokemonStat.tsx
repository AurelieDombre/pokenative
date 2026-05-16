import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import {Row} from "@/components/row"
import { ThemedText } from '@/components/ThemedText'
import { useThemeColors } from '@/hooks/useThemesColors'
import * as Progress from 'react-native-progress';

type Props = ViewProps & {
    color?: string
    nameStat?: string
    value?: number
}

const statLabels: Record<string, string> = {
    hp: 'HP',
    attack: 'ATK',
    defense: 'DEF',
    'special-attack': 'SPE ATK',
    'special-defense': 'SPE DEF',
    speed: 'SPD',
};


export function PokemonStat({style, nameStat, value, color, ...rest}: Props) {
    const colors = useThemeColors();
    //progress.Bar attend une valeur entre 0 et 1
    // il faut donc calculer le pourcentage
    //Ex : 45/255 = 0.176 soit 17.6%
    const progress = Math.min(Math.max((value ?? 0) / 255, 0), 1);
    const shortName = statLabels[nameStat ?? ''] ?? nameStat;

    return (
        <Row style={[style, styles.root]} {...rest}>
            <View style={[styles.nameStat,{borderColor: colors.grayLight, borderStyle: "solid"}]}>
                <ThemedText variant={"subtitle3"} style={{color: color}}>
                    {shortName}
                </ThemedText>
            </View>
            <View style={styles.value}>
                <ThemedText style={{color: colors.grayDark}}>{value?.toString().padStart(3,"0")}</ThemedText>
            </View>
            <View style={styles.progress}>
                <Progress.Bar
                    progress={progress}
                    width={null}
                    height={8}
                    borderWidth={0}
                    color={color}
                    unfilledColor={colors.grayLight}
                />
            </View>
            {/*<Row style={styles.bar}>*/}
            {/*    <View*/}
            {/*        style={[styles.barInner, { backgroundColor: color }]}*/}
            {/*        animate={{*/}
            {/*            flex: value,*/}  {/* on se sert du pourcentage de flex pour mettre à l'échelle la valeur de la progressBar*/}
            {/*        }}*/}
            {/*        transition={{*/}
            {/*            type: "timing",*/}
            {/*            duration: 1000,*/}
            {/*        }}*/}
            {/*    />*/}
            {/*    <View*/}
            {/*        style={[*/}
            {/*            styles.barInner,*/}
            {/*            styles.barBackground,*/}
            {/*            { backgroundColor: color },*/}
            {/*            { flex: 255 - value },*/} {/* 255 étant le max, on soustrait la valeur pour mettre à l'échelle*/}
            {/*        ]}*/}
            {/*    />*/}
            {/*</View>*/}
        </Row>
    )
}

const styles = StyleSheet.create({
    root: {
        gap: 8,
        width: '100%',
        padding: 8,
    },
    nameStat: {
        width: 45,
        paddingRight: 8,
        borderRightWidth: 1,
    },
    value:{
        width:23,
        paddingRight: 4,
    },
    progress: {
        flex: 1,
    }
    //Sans le package progress bar :
    // bar: {
    //     flexDirection: "row",
    //     height: 4,
    //     flex: 1,
    //     borderRadius: 20,
    //     overflow: "hidden",
    // },
    // barInner: {
    //     flex: 1,
    //     top: 0,
    //     left: 0,
    //     height: "100%",
    // },
    // barBackground: {
    //     flex: 1,
    //     width: "100%",
    //     opacity: 0.24,
    // },
})
