// Va permettre de récupérer dynamiquement mes noms des pokémons et leurs id, pour les afficher dans ma flatlist, en utilisant l'api pokeapi.co. 
// Il faut installer le package : npm i @tanstack/react-query
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Colors } from '@/constants/Colors'

const endpoint = 'https://pokeapi.co/api/v2'; // L'endpoint de l'api pour récupérer les pokémons, avec une limite de 35 pokémons

// Définir les points d'entrée de l'API. Je vais lui donner les résultats que je veux obtenir
type API ={
    '/pokemon?limit=21': {
        count: number;
        next: string | null;
        results: {name: string, url: string}[]
    };
    "/pokemon/[id]": {
        id: number;
        name: string;
        url: string;
        weight: number;
        height: number;
        moves: { move: { name: string } }[];
        stats: {
            base_stat: number;
            stat: {
                name: string;
            };
        }[];
        cries: {
            latest: string;
        };
        types: {
            type: {
                name: keyof (typeof Colors)["type"];
            };
        }[];
    };
}

// <T extends keyof API> signifie que la fonction useFetchQuery prend un paramètre de type T qui doit être une clé de l'interface API, c'est à dire une des routes de l'api que j'ai définie dans l'interface API, 
// et que la fonction retourne les données correspondantes à cette route,
//  en utilisant le type défini dans l'interface API pour cette route. Par exemple,
//  si je passe '/pokemon?limit=21' comme argument à la fonction useFetchQuery, elle va retourner un objet avec les propriétés count, 
// next et results, qui sont définies dans l'interface API pour la route '/pokemon?limit=21'.

//? localUrl => params ?? {} Si params vaut null ou undefined, on utilise {} à la place pour éviter une erreur.
//?Object.entries(...) Transforme l’objet params en tableau de paires clé/valeur.
// Exemple :
// params = { id: 25, name: "pikachu" }
// devient :
// [["id", 25], ["name", "pikachu"]]
//? .reduce(...) Parcourt chaque paire [key, value] pour transformer progressivement path
//?acc.replaceAll([${key}], value) Remplace dans le chemin tous les placeholders du type [id], [name], etc. par leur valeur.
// Exemple :
// path = "/pokemon/[id]/[name]"
// params = { id: 25, name: "pikachu" }
// devient :
// "/pokemon/25/pikachu"
export function useFetchQuery<T extends keyof API>(path: T, params?: Record< string, string | number >) {
    //
    const localUrl =
        endpoint +
        Object.entries(params ?? {}).reduce<string>(
            (acc, [key, value]) =>
                acc.replaceAll(`[${key}]`, String(value)),
            path
        );
    return useQuery({
        queryKey: [localUrl],
        queryFn: async () => {
            await wait(1); // Simuler un délai de 1 seconde pour le chargement des données
            return fetch(localUrl,{
                headers: {
                    Accept: 'application/json'
                }
            }).then(res => res.json() as Promise<API[T]>); // Récupérer les données de l'api et les convertir en json, puis les retourner en utilisant le type défini dans l'interface API pour la route correspondante

        }
    });
}

export function useInfiniteFetchQuery<T extends keyof API>(path: T) {
    return useInfiniteQuery({
        queryKey: [path],
        initialPageParam: endpoint + path,
        // queryFn est une fonction qui récupère les données de l'api en fonction du paramètre pageParam, qui est l'url de la page à récupérer, et les convertit en json, puis les retourne
        queryFn: async ({ pageParam }) => {
            await wait(1);
            return fetch(pageParam, {
                headers: {
                    Accept: 'application/json'
                }
            }).then(res => res.json() as Promise<API[T]>);
        },
        // getNextPageParam est une fonction qui récupère l'url de la page suivante à partir des données de la page actuelle, en utilisant la propriété next de l'objet retourné par l'api, et la retourne
        getNextPageParam: (lastPage) => {
            if ("next" in lastPage){
                return lastPage.next;
            }
                return null; // Si il n'y a pas de page suivante, retourner null pour indiquer que la pagination est terminée
        }
    })
}

function wait(duration: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, duration * 1000);
    });
}