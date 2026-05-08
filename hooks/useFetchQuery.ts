// Va permettre de récupérer dynamiquement mes noms des pokémons et leurs id, pour les afficher dans ma flatlist, en utilisant l'api pokeapi.co. 
// Il faut installer le package : npm i @tanstack/react-query
import { useQuery } from "@tanstack/react-query";

const endpoint = 'https://pokeapi.co/api/v2'; // L'endpoint de l'api pour récupérer les pokémons, avec une limite de 35 pokémons

export function useFetchQuery(path: string) {
    return useQuery({
        queryKey: [path],
        queryFn: async () => {
            await wait(1); // Simuler un délai de 1 seconde pour le chargement des données
            return fetch(endpoint + path).then(res => res.json()); // Récupérer les données de l'api et les convertir en json, puis les retourner
            
        }
    });
}


function wait(duration: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, duration * 1000);
    });
}