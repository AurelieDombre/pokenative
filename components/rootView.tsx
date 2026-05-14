import { ViewProps, ViewStyle } from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import { useThemeColors } from '@/hooks/useThemesColors'


const stylesRoot = {
    flex: 1,
    padding: 4,
    gap: 16,
}satisfies ViewStyle;

type Props = ViewProps


export function RootView({style, ...rest}: Props) {
    const colors = useThemeColors()
    return (
        <SafeAreaView
            style={[stylesRoot, { backgroundColor: colors.tint }, style]}
            {...rest}
        />
    )

}