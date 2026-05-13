//Permet de nous renvoyer les couleurs de notre thème, en fonction du thème actuel de l'utilisateur

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

// Un hook qui nous renvoie les couleurs de notre thème, en fonction du thème actuel de l'utilisateur
export function useThemeColors() {
    const theme = useColorScheme();
    
    // Si le thème de l'utilisateur est "dark", on renvoie les couleurs du thème dark, sinon on renvoie les couleurs du thème light
    return theme === "dark"
        ? Colors.dark
        : Colors.light;
}