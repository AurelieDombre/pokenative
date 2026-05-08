import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserThemeColors } from "@/hooks/userThemesColors";
import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { getPokemonIdFromUrl } from "@/functions/pokemon";

export default function Index() {
  const colors = useUserThemeColors();
  // (_, k) =>({ name: `Pokémon name`, id: k + 1 }) est une fonction qui génère un objet avec un nom de pokémon et un id,
  // en fonction de l'index k du tableau généré par Array.from. Array.from({ length: 35 }) génère un tableau de 35 éléments, 
  // et (_, k) => ... est la fonction qui est appelée pour chaque élément du tableau, avec _ qui représente la valeur de l'élément (qui est undefined dans ce cas)
  // et k qui représente l'index de l'élément (de 0 à 34). En ajoutant 1 à k, on obtient des id de pokémon allant de 1 à 35.
  const {data} = useFetchQuery('/pokemon?limit=21'); // Récupérer les données de l'api pour les pokémons, avec une limite de 21 pokémons
  const pokemons = data?.results ?? [] // Récupérer les résultats de l'api, qui sont les pokémons, et les stocker dans une variable

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.tint }]}>

      <View style={styles.header}>
        <Image source={require('@/assets/images/pokeball.png')} width={24} height={24}/>
        <ThemedText variant="headline" color="grayLight">
          Pokédex
        </ThemedText>
      </View>
      <Card style={styles.cards}>
        <FlatList data={pokemons} 
                  numColumns={3}
                  columnWrapperStyle={styles.gridGap}
                  contentContainerStyle={[styles.gridGap, styles.list]}
                  renderItem={({ item }) => 
            // Afficher le nom et l'id du pokémon dans une vue, en utilisant le composant ThemedText pour le style du texte
            <PokemonCard name={item.name} id={getPokemonIdFromUrl(item.url)} style={{ flex: 1/3}}  /> } keyExtractor={(item) => item.url} 
          />
      </Card>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cards:{
    flex: 1,
  },
  gridGap:{
    gap: 8,
  },
  list: {
    padding: 12,
  }
});