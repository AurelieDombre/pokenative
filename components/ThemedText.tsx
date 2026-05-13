import { TextProps, Text, StyleSheet } from "react-native"
import { useThemeColors } from "../hooks/useThemesColors";
import { Colors } from "@/constants/Colors";

const styles = StyleSheet.create({
    //Nom de variante de typographie https://www.figma.com/design/XG6KM390At1gLV1Hru4w0y/Pok%C3%A9dex--Community-?node-id=913-238&p=f&t=VaHTrY2xfWd09QXP-0
    headline: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: "bold",
    },
    caption:{
        fontSize: 8,
        lineHeight: 12,
    },
    subtitle1:{
        fontSize: 14,
        lineHeight: 16,
        fontWeight: "bold",
    },
    subtitle2:{
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "bold",
    },
    subtitle3:{
        fontSize: 10,
        lineHeight: 16,
        fontWeight: "bold",
    },
    body1: {
        fontSize: 14,
        lineHeight: 16,
    },
    body2: {
        fontSize: 12,
        lineHeight: 16,
    },
    body3: {
        fontSize: 10,
        lineHeight: 16,
    }
})

// Accepte les mêmes props que Text, mais aussi une prop "variant" pour choisir le style de texte et une prop "color" pour choisir la couleur du texte
type Props = TextProps & {
    //Utiliser les clé de styles comme valeur de variant, pour choisir le style de texte
    variant?: keyof typeof styles,
    color?: keyof typeof Colors.light;
};

// Un composant qui affiche un texte avec un thème, en fonction de la prop "variant" et "color" le ""...rest" permet de passer toutes les autres props à Text, comme "style" ou "numberOfLines"
export function ThemedText({variant, color, style, ...rest}: Props) {

    // Récupérer les couleurs du thème de l'utilisateur
    const colors = useThemeColors();

    return (
        //Appliquer un style en fonctione de la prop "variant" que je reçois, et la couleur en fonction de la prop "color" que je reçois, sinon utiliser les valeurs par défaut
        <Text style={[styles[variant ?? 'body3'], { color: colors[color ?? 'grayDark']}, style]} {...rest} >

        </Text>

    );
}

