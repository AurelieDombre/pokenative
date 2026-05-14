
// Fonction pour récupérer l'id qui est dans les url des pokémons, pour pouvoir les afficher dans les cartes de la flatlist
export function getPokemonIdFromUrl(url: string): number {
    const parts = url.split('/'); // Séparer l'url en parties, en utilisant le caractère "/" comme séparateur
    const id = parts[parts.length - 2]; // Récupérer l'avant-dernière partie de l'url, qui est l'id du pokémon
    return parseInt(id); // Convertir l'id en nombre entier et le retourner
}

// Récupère les image des pokémons
export function getPokemonArtwork(id: number | string): string {
    return (
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    )
}

export function formatWeight(weight?: number): string {
    if (!weight) {
        return '';
    }
    return (
        (weight/10).toString().replace('.',',') + 'kg'
    )
}

export function formatHeight(height?: number): string {
    if (!height) {
        return '';
    }
    return (
        (height/10).toString().replace('.',',') + 'm'
    )
}