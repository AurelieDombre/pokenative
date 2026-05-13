import { ThemedText } from "@/components/ThemedText";
import { useUserThemeColors } from "@/hooks/userThemesColors";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { Card } from "../card";


type Props = {
    style: ViewStyle,
    name: string,
    id: number,
}

 //Permet de rendre le card cliquable pour accéder à la page de détails du pokémon, en utilisant le composant Link de expo-router
// android_ripple Permet d'ajouter un effet de ripple lors du clic sur le card, en utilisant le composant Pressable de react-native 
// //!\\ Coller les balises  surtout pas d'espace entre sinon il ne capte pas l'enfant
export function PokemonCard({ style, name, id }: Props) {

    const colors = useUserThemeColors();

    return (
        <Link href={`/pokemon/${id}`} asChild>
            <Pressable android_ripple={{color: colors.tint, foreground: true}} style={{ flex: 1 / 3 }}> 
                <Card style={[styles.card]}>
                    <View style={[styles.shadow, { backgroundColor: colors.grayBackground }]} /> {/* Mettre une ombre sous le card, placer en premier car en dernier cela passe au-dessus des éléments */}
                    {/* Met 3 zero avant le chiffre de l'id */}
                    <ThemedText style={styles.id} variant="caption" color="grayMedium">#{id.toString().padStart(3, '0')}</ThemedText>
                    <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` }} style={{ width: 72, height: 72 }} />
                    <ThemedText variant="body3">{name}</ThemedText>
                    {/* <View style={[styles.shadow, { backgroundColor: colors.grayBackground }]} /> Si on veut mettre cet élément à la fin il faut ajouter un z-index dans le style */}
                </Card>
            </Pressable>
        </Link>
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