import { router, useLocalSearchParams } from 'expo-router'
import { StyleSheet, Image, Pressable, View, Text } from 'react-native'
import { RootView } from '@/components/rootView'
import { Row } from '@/components/row'
import { ThemedText } from '@/components/ThemedText'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { Colors } from '@/constants/Colors'
import { useThemeColors } from '@/hooks/useThemesColors'
import { formatHeight, formatWeight, getPokemonArtwork } from '@/functions/pokemon'
import { Card } from '@/components/card'
import { PokemonType } from '@/components/pokemon/pokemonType'
import { PokemonSpec } from '@/components/pokemon/pokemonSpec'

const styleDetailPokemon = StyleSheet.create({

    header:{
        margin: 20,
        justifyContent: "space-between",
    },
    pokeball:{
        opacity: 0.1,
        position: 'absolute',
        right: 8,
        top: 8,
    },

    artwork: {
        position: 'absolute',
        top: -140,
        alignSelf: 'center',
        width: 200,
        height: 200,
        zIndex: 2,
    },
    body:{
        marginTop: 180,
    },
    card:{
        paddingTop: 56,
        paddingHorizontal: 20,
        gap: 16,
        alignItems: 'center',
    },
    tags:{
        justifyContent: 'center',
    }
})

export default function Pokemon() {
    const colors = useThemeColors()
    const params = useLocalSearchParams()as {id: string};
    const {data: pokemon} = useFetchQuery("/pokemon/[id]", {id: params.id})
    const {data: species} = useFetchQuery("/pokemon-species/[id]", {id: params.id})
    // Récupère la bio des pokémons via le language dans l'api ex: https://pokeapi.co/api/v2/pokemon-species/1/ "flavor_text": "A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.",
    const bio = species?.flavor_text_entries
        ?.find(({language}) => language.name === 'en')
        ?.flavor_text.replaceAll("\n",".")
    // Pour pouvoir changer la couleur en fonction du type de pokémon. Le type est récupérer dans l'api
    const mainType = pokemon?.types?.[0]?.type.name
    const colorType = mainType ? Colors.type[mainType] : colors.tint
    const typeOfPokemon = pokemon?.types ?? []


    if (pokemon) {
        return (
            <RootView style={{ backgroundColor: colorType }}>
                <View>
                    <Image style={styleDetailPokemon.pokeball} source={require('@/assets/icons/detail_pokemon/pokeball-background.png')} width={208} height={208} />
                    <Row style={styleDetailPokemon.header}>
                        <Pressable onPress={router.back}>
                            <Row gap={8}>
                                <Image source={require('@/assets/icons/detail_pokemon/arrow_back.png')} width={32} height={32} />
                                <ThemedText variant={'headline'} color={'grayWhite'}>
                                    {pokemon?.name}
                                </ThemedText>
                            </Row>
                        </Pressable>

                        <ThemedText variant={'subtitle2'} color={'grayWhite'}>
                            #{params.id.padStart(3,'0')}
                        </ThemedText>

                    </Row>
                    <View style={styleDetailPokemon.body}>
                        {/* Image flottante */}
                        <Image
                            style={styleDetailPokemon.artwork}
                            source={{ uri: getPokemonArtwork(params.id) }}
                        />

                        {/* Card */}
                        <Card style={styleDetailPokemon.card}>
                            <Row style={styleDetailPokemon.tags}>
                                {typeOfPokemon.map((pokemonType) => (
                                    <PokemonType
                                        name={pokemonType.type.name as keyof typeof Colors.type}
                                        key={pokemonType.type.name}
                                    />
                                ))}
                            </Row>
                            <ThemedText variant={'subtitle1'} style={{ color: colorType }}>
                                About
                            </ThemedText>
                            <Row>
                                <PokemonSpec title={formatWeight(pokemon?.weight)} description={'Weight'} icon={require('@/assets/icons/detail_pokemon/weight.png')} style={{
                                    borderStyle: "solid",
                                    borderRightWidth: 1,
                                    borderColor: colors.grayLight
                                }}/>
                                <PokemonSpec title={formatHeight(pokemon?.height)} description={'Height'} icon={require('@/assets/icons/detail_pokemon/straighten.png')} style={{
                                    borderStyle: "solid",
                                    borderRightWidth: 1,
                                    borderColor: colors.grayLight
                                }}/>
                                <PokemonSpec title={pokemon?.moves.slice(0,2).map(move => move.move.name).join("\n")} description={'Moves'} />
                            </Row>
                            <ThemedText>
                                {bio}
                            </ThemedText>

                            <ThemedText variant={'subtitle1'} style={{ color: colorType }}>
                                Base Stats
                            </ThemedText>

                        </Card>
                    </View>
                </View>
            </RootView>
        );
    }


}

