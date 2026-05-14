import { useThemeColors} from '@/hooks/useThemesColors'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    //Bouton radio (cercle rouge)
    radio: {
        width: 14,
        height: 14,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    //rond rouge à l'intérieur du cercle
    radioInner: {
        borderRadius: 6,
        width: 6,
        height: 6,
    },
})

type Props = {
    checked: boolean,
}

export function Radio({ checked }: Props) {
    const colors = useThemeColors()
    return (
        <View style={[styles.radio, {borderColor: colors.tint}]}>
            {checked && <View style={[styles.radioInner, {backgroundColor: colors.tint}]}/>}
        </View>
    )
}