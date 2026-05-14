
import { Colors } from '@/constants/Colors'
import { View, ViewStyle } from 'react-native'
import { ThemedText } from '@/components/ThemedText'

const stylesTypePokemon = {
    flex: 0,
    height: 20,
    paddingHorizontal: 8,
    borderRadius: 8,
}satisfies ViewStyle

type Props = {
    //On récupère les couleurs en fonciton du type de pokémon
    name: keyof (typeof Colors)["type"];
}

export function PokemonType({name}: Props) {
    return (
        <View
            style={[stylesTypePokemon,
            {backgroundColor: Colors.type[name] }]}
        >
            <ThemedText variant={"subtitle3"} color={"grayWhite"}>
                {name}
            </ThemedText>
        </View>
    )
}