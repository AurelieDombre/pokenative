import { Card } from "@/components/card";
import { PokemonCard } from "@/components/pokemon/pokemonCard";
import { Row } from "@/components/row";
import { SearchBar } from "@/components/searchBar";
import { SortButton } from "@/components/sortButton";
import { ThemedText } from "@/components/ThemedText";
import { getPokemonIdFromUrl } from "@/functions/pokemon";
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "../hooks/useThemesColors";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const colors = useThemeColors();
  // (_, k) =>({ name: `Pokémon name`, id: k + 1 }) est une fonction qui génère un objet avec un nom de pokémon et un id,
  // en fonction de l'index k du tableau généré par Array.from. Array.from({ length: 35 }) génère un tableau de 35 éléments, 
  // et (_, k) => ... est la fonction qui est appelée pour chaque élément du tableau, avec _ qui représente la valeur de l'élément (qui est undefined dans ce cas)
  // et k qui représente l'index de l'élément (de 0 à 34). En ajoutant 1 à k, on obtient des id de pokémon allant de 1 à 35.

  // Récupérer les données de l'api pour les pokémons, avec une limite de 21 pokémons 
// const {data, isFetching} = useFetchQuery('/pokemon?limit=21');  
// Récupérer les donnée de l'api pour les pokémons, avec une pagination infinie, en utilisant la fonction useInfiniteFetchQuery qui utilise la fonction useInfiniteQuery de react-query pour gérer la pagination, et en affichant un loader pendant le chargement des données
  const { data, isFetching, fetchNextPage } = useInfiniteFetchQuery('/pokemon?limit=21');
  // isFetching est une variable qui indique si les données sont en train d'être récupérées, pour afficher un loader pendant le chargement des données
  //fetchNextPage est une fonction qui permet de récupérer la page suivante de données, en l'appelant lorsque l'on atteint la fin de la liste dans la flatlist grâce à onEndReached.

  // Récupérer les résultats de l'api, qui sont les pokémons, et les stocker dans une variable
  /* const pokemons = data?.results ?? []  => si on fait avec la limitation de résultats*/
  // Réceptionner les pages pour avoir un effet infinite scroll, et les aplatir pour avoir un tableau de pokémons à afficher dans la flatlist
  //.map(results => ({name: results.name, id: getPokemonIdFromUrl(results.url) => renvoi un nouvel objet avec nom du Pokémon et son id
  const pokemons = data?.pages.flatMap(page => page.results.map(results => ({name: results.name, id: getPokemonIdFromUrl(results.url)}))) ?? [];
  //? SearchBar
  const [search, setSearch] = useState('');
   // Défini le filtre par id ou name, id par defaut
  const [sortKey, setSortKey] = useState<"id"|"name">("id")
  // On ne peux pas faire appel à l'api pour la recherche alors on va filtrer la liste des pokémons en fonction de ce que l'ont tape dans la searchBar. Pour que le filtre fonctionne on transforme en tableau les pokémons 
  const filteredPokemons =[...(search ?
      pokemons.filter(pokemons => pokemons.name.includes(search.toLocaleLowerCase()) ||
      pokemons.id.toString() === search) : pokemons)].sort((a,b) => (a[sortKey] < b[sortKey] ? -1 : 1));
 


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.tint }]}>

      <Row style={styles.header} >
        <Image source={require('@/assets/images/pokeball.png')} width={24} height={24}/>
        <ThemedText variant="headline" color="grayLight">
          Pokédex
        </ThemedText>
      </Row>
      <Row gap={16} style={styles.form}>
         {/* //? SearchBar */}
        <SearchBar value={search} onchange={setSearch} />
        <SortButton value={sortKey} onChange={setSortKey} />
      </Row>
      <Card style={styles.cards}>
        <FlatList
            data={filteredPokemons}
            numColumns={3}
            columnWrapperStyle={styles.gridGap}
            contentContainerStyle={[styles.gridGap, styles.list]}
            /* Affiche un petit loader pendant le chargement des datas */
            ListFooterComponent={
              isFetching ? <ActivityIndicator color={colors.tint} /> : null
            }
            /* Permet de détecter lorsqu'on atteint la fin de la liste, pour charger les pages suivantes sauf si on a une recherche */
            onEndReached={search ? undefined : () => {
              if (!isFetching) {
                fetchNextPage();
              }
            }}
            renderItem={({ item }) =>
              // Afficher le nom et l'id du pokémon dans une vue, en utilisant le composant ThemedText pour le style du texte
            <PokemonCard name={item.name} id={item.id} style={{ flex: 1/3}}  /> } keyExtractor={(item) => item.id.toString()}
        />
      </Card>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    gap: 16,
  },
  header: {
 /* Maintenatn qu'on passe de View à Row plus besoin de :
    flexDirection: 'row',
    alignItems: 'center', */
    gap: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    marginTop: 8,
  },
  body:{
    flex: 1,
    marginTop: 16,
  },
  cards:{
    flex: 1,
  },
  gridGap:{
    gap: 8,
  },
  list: {
    padding: 12,
  },
  form:{
    paddingHorizontal: 12,
  }
});