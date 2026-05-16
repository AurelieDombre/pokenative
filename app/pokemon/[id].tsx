import { router, useLocalSearchParams } from 'expo-router'
import { StyleSheet, Image, Pressable, View } from 'react-native'
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
import { PokemonStat } from '@/components/pokemon/pokemonStat'
import { ScrollView } from 'react-native';
import {Audio} from 'expo-av'
import PagerView from 'react-native-pager-view'
import { useRef, useState } from 'react'


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

    rowArtwok:{
        position: 'absolute',
        top: -140,
        zIndex: 2,
        justifyContent: "space-between",
        left: 0,
        right: 0,
        paddingHorizontal:20,
    },

    artwork: {
        alignSelf: 'center',
        width: 200,
        height: 200,
    },
    body:{
        marginTop: 180,
    },
    card:{
        paddingTop: 56,
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 16,
        alignItems: 'center',
    },
    tags:{
        justifyContent: 'center',
    },
    stats:{
        width: '100%',
        gap: 8,
    }
})

export default function Pokemon(){
    const params = useLocalSearchParams() as {id: string}
    const [id, setid] = useState(parseInt(params.id, 10))
    const pager = useRef<PagerView>(null)
    //Créer une réf qui va permetre de connaitre l'offset sur lequel on est = par défaut la page 1
    const offset = useRef(1)
    //changer l'offset et l'appliquer à l'id que quand le scroll/swipe est fini
    const onPageSelected = (e: {nativeEvent: {position: number}}) => {
        offset.current = e.nativeEvent.position -1
    }
    //Permet de récupérer l'état du scroll
    const onChangePageScroll = (e: {nativeEvent: {pageScrollState: string}}) => {
        if (e.nativeEvent.pageScrollState !== 'idle') {
           return
        }
        //Permet de ne pas aller plus loin que le 1er pokémon
        if (offset.current === -1 && id === 2){
            return;
        }
        //Permet de ne pas aller plus loin que le dernier pokémon
        if (offset.current === 1 && id === 150){
            return;
        }
        if (offset.current !== 0){
            setid(id + offset.current)
            offset.current = 0;
            pager.current?.setPageWithoutAnimation(1)
        }
    }
    const onPrevious = () => {
        pager.current?.setPage(0)
    }
    const onNext = () => {
        pager.current?.setPage(2 + offset.current)
    }

    // Créer un swipe = toucher glisser avec le doit sur l'écran pour passer d'un pokémon à l'autre
    return(
        <PagerView
            ref={pager}
            onPageSelected={onPageSelected}
            onPageScrollStateChanged={onChangePageScroll}
            initialPage={1}
            style={{flex:1}}
        >
            <PokemonView key={id - 1} id={id-1} onNext={onNext} onPrevious={onPrevious} />
            <PokemonView key={id} id={id} onNext={onNext} onPrevious={onPrevious} />
            <PokemonView key={id + 1} id={id+1} onNext={onNext} onPrevious={onPrevious}/>
        </PagerView>
    )
}

type Props = {
    id: number,
    onPrevious: () => void,
    onNext: () => void,
}

function PokemonView({ id, onPrevious, onNext }: Props) {
    const colors = useThemeColors()
    // const params = useLocalSearchParams()as {id: string};
    const {data: pokemon} = useFetchQuery("/pokemon/[id]", {id: id})
    const {data: species} = useFetchQuery("/pokemon-species/[id]", {id: id})
    // Récupère la bio des pokémons via le language dans l'api ex: https://pokeapi.co/api/v2/pokemon-species/1/ "flavor_text": "A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.",
    const bio = species?.flavor_text_entries
        ?.find(({language}) => language.name === 'en')
        ?.flavor_text.replaceAll("\n",".")
    // Pour pouvoir changer la couleur en fonction du type de pokémon. Le type est récupérer dans l'api
    const mainType = pokemon?.types?.[0]?.type.name
    const colorType = mainType ? Colors.type[mainType] : colors.tint
    const typeOfPokemon = pokemon?.types ?? []
    // const pokemonStat = pokemon.stats
    const onImagePress = async () => {
        const cry = pokemon?.cries.latest
        if (!cry) return
    // "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg"
        const {sound} = await Audio.Sound.createAsync(
            { uri: cry },
            { shouldPlay : true }
        )
        await sound.playAsync();
    }


    const isFirst = id === 1
    const isLast = id === 150

    if (pokemon) {
        return (
            <ScrollView>
                <RootView backgroundColor={colorType}>
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
                                #{id.toString().padStart(3,'0')}
                            </ThemedText>

                        </Row>
                        <View style={styleDetailPokemon.body}>
                            <Row style={styleDetailPokemon.rowArtwok}>
                                {/*Si l'id est = 1 alors n'affiche pas le chevron */}
                                {isFirst ?(
                                    <View style={{ width: 24, height: 24 }}></View>
                                ) : (
                                    <Pressable onPress={onPrevious}>
                                        <Image
                                            source={require('@/assets/icons/detail_pokemon/chevron_left.png')}
                                            width={24} height={24}
                                        />
                                    </Pressable>
                                )}

                                <Pressable onPress={onImagePress}>
                                    <Image
                                        style={styleDetailPokemon.artwork}
                                        source={{ uri: getPokemonArtwork(id) }}
                                    />
                                </Pressable>
                                {isLast ?(
                                    <View style={{ width: 24, height: 24 }}></View>
                                ) : (
                                    <Pressable onPress={onNext}>
                                        <Image
                                            source={require('@/assets/icons/detail_pokemon/chevron_right.png')}
                                            width={24} height={24}
                                        />
                                    </Pressable>
                                )}
                            </Row>

                            {/* Card */}
                            <Card style={styleDetailPokemon.card}>
                                <Row style={[styleDetailPokemon.tags, { height: 20 }]}>
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
                                <View style={styleDetailPokemon.stats}>
                                    {/* Récupere via l'api le nom et la valeur de la stat mais le nom est en entier */}
                                    {pokemon?.stats.map(stat =>
                                        <PokemonStat key={stat.stat.name} nameStat={stat.stat.name} value={stat.base_stat} color={colorType} />
                                    )}
                                </View>

                            </Card>
                        </View>
                    </View>
                </RootView>
            </ScrollView>
        );
    }
}

