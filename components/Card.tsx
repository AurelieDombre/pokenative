import { Shadows } from "@/constants/Shadows";
import { useThemeColors } from "../hooks/useThemesColors";
import { View, ViewProps, ViewStyle } from "react-native";

type Props = ViewProps

//dans la fonction card, j'extrait le style des props, pour pouvoir l'envoyer à la view, et je passe le reste des props à la view aussi, pour pouvoir utiliser les autres props de view comme "onPress" ou "children"
export function Card({style, ...rest}: Props) {
    // Récupérer els couleurs du thème
    const colors = useThemeColors();
    return (
        <View style={[style, styles, {backgroundColor: colors.grayWhite}]} {...rest} />
    )
}



const styles = {
    borderRadius: 8,
    marginTop: 16,
    overflow: 'hidden',
    ...Shadows.dp2, // j'applique l'ombre dp2 à ma card, en utilisant le spread operator pour ajouter les propriétés de l'ombre à mon style
} satisfies ViewStyle; // satisfies permet de vérifier que le type de styles est bien un ViewStyle, et que les propriétés sont valides pour une view, sinon il y aura une erreur de type.