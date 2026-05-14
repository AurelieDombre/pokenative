import { Row } from "@/components/row";
import { useThemeColors } from "../hooks/useThemesColors";
import { Image, TextInput } from "react-native";

type Props = {
    value: string,
    onchange: (text: string) => void,
}

export function SearchBar({value, onchange}: Props) {

    const colors = useThemeColors();

    return (
    <Row gap={8} style={[stylesSearchBar.wrapper, {backgroundColor: colors.grayWhite}]}>
        <Image  source={require('@/assets/icons/search.png')} width={16} height={16}/>
        <TextInput onChangeText={onchange} value={value}  placeholder="Rechercher..." />
    </Row>
    )
}

const stylesSearchBar = {
    wrapper:{
        flex: 1,
        borderRadius: 16,
        height: 32,
        padding: 12,
        margin: 8,
        marginTop: 3,
    },
    input:{
        flex: 1,
        height: 16,
        fontSize: 10,
        lineHeight: 16, 
    },
    
}