import { View, StyleSheet, ViewProps, type ImageSourcePropType, Image } from 'react-native'
import { Row } from '@/components/row'
import { ThemedText } from '@/components/ThemedText'


const styles = StyleSheet.create({
    root:{
        flex: 1,
        gap: 4,
        alignItems: 'center',
    }
})

type Props = ViewProps & {
    title: string,
    description: string,
    icon?: ImageSourcePropType,
}

export function PokemonSpec({style,icon, title,description, ...rest}: Props){
    return (
        <View style={[style, styles.root]} {...rest }>
            <Row >
                {/* Si l'icon existe alors on l'affiche */}
                {icon && <Image source={icon} width={16} height={16} />}
                <ThemedText variant={"body3"} color={'grayDark'}>
                    {title}
                </ThemedText>
            </Row>
            <ThemedText variant={'caption'} color={'grayMedium'}>
                {description}
            </ThemedText>
        </View>
    )
}