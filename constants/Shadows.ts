// Permet de gérer les ombres de notre application, en fonction de l'OS de l'utilisateur, car les ombres sont différentes entre iOS et Android
import {  ViewStyle } from "react-native";

export const Shadows = {
    dp2: {
        // iOS
        shadowOpacity: 0.2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,  
        },
        shadowRadius: 3,
        // Android
        elevation: 2, 
    }
}satisfies Record<string, ViewStyle>; // satisfies permet de vérifier que le type de Shadows est bien un Record<string, ReactNativeShadowStyle>, et que les propriétés sont valides pour une ombre, sinon il y aura une erreur de type.