import { ViewProps, ViewStyle, View  } from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import { useThemeColors } from '@/hooks/useThemesColors'
import Animated, {
    interpolateColor,
    ReduceMotion,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Easing
} from 'react-native-reanimated'
import { useEffect } from 'react'


const stylesRoot = {
    flex: 1,
    padding: 4,
    gap: 16,
}satisfies ViewStyle;

type Props = ViewProps & {
    backgroundColor?: string,
}


export function RootView({style,backgroundColor, ...rest}: Props) {
    const colors = useThemeColors()
    const changeBackG = useSharedValue(0)
    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                changeBackG.value,
                [0, 1],
                [colors.tint, backgroundColor ?? colors.tint]
            ),
        };
    });

    useEffect(() => {
        if (backgroundColor) {
            changeBackG.value = 0;
            changeBackG.value =
                withTiming(1, {
                duration: 700,
                easing: Easing.out(Easing.quad),
                reduceMotion: ReduceMotion.System,
            });
        }
    });

    if (!backgroundColor) {
        return (
            <SafeAreaView
                style={[stylesRoot, { backgroundColor: colors.tint }, style]}
                {...rest}
            />
        )
    }
    return (
        <Animated.View style={[{flex:1}, animatedStyle, style]} >
            <SafeAreaView style={stylesRoot} {...rest}/>
        </Animated.View>
    )
}