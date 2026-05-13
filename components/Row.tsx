//Pour ne pas mettre toujours des balise view on personnalise un composant Row qui va mettre les éléments en ligne, et qui va prendre une prop gap pour mettre un écart entre les éléments

import { View, ViewProps, ViewStyle } from "react-native";

type Props = ViewProps &{
    gap?: number,

}

export function Row({style, gap, ...rest}: Props) {
    return (
        /*  */
        <View style={[rowStyle, style, gap !== undefined ? { gap:gap } : undefined]} {...rest} />
    )
}


const rowStyle = {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
} satisfies ViewStyle;