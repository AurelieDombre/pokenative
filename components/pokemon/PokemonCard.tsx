import { ThemedText } from "@/components/ThemedText";
import { Image, ViewStyle, StyleSheet, View } from "react-native";
import { Card } from "../Card";
import { useUserThemeColors } from "@/hooks/userThemesColors";


type Props = {
    style: ViewStyle,
    name: string,
    id: number,
}

export function PokemonCard({ style, name, id }: Props) {

    const colors = useUserThemeColors();

    return (
        <Card style={[style, styles.card]}>
            <View style={[styles.shadow, { backgroundColor: colors.grayBackground }]} /> {/* Mettre une ombre sous le card, placer en premier car en dernier cela passe au-dessus des éléments */}
            {/* Met 3 zero avant le chiffre de l'id */}
            <ThemedText style={styles.id} variant="caption" color="grayMedium">#{id.toString().padStart(3, '0')}</ThemedText>
            <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` }} style={{ width: 72, height: 72 }} />
            <ThemedText variant="body3">{name}</ThemedText>
             {/* <View style={[styles.shadow, { backgroundColor: colors.grayBackground }]} /> Si on veut mettre cet élément à la fin il faut ajouter un z-index dans le style */}
        </Card>
    );
}


const styles = StyleSheet.create({
    card: {
        position: 'relative',
        alignItems: 'center',
        padding: 4,
    },
    id: {
        alignSelf: 'flex-end',
    },
    shadow: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 44,
        borderRadius: 7,
        /* zIndex: -1, */
    }
});