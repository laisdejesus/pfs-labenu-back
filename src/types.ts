export type user = {
    id: string,
    name: string,
    nickname: string,
    email: string,
    password: string,
}

 
export type music = {
    id: string,
    title: string,
    author_id: string,
    file_string: string,
    album_id: string,
    names_genres: string[]
}

export type album = {
    id_album: string,
    name_album: string
}

export type genre = {
    id_genre: string,
    name_genre: string
}

export type musicGenre = {
    music_id: string,
    genre_id: string,
    id_genre: string,
    name_genre: string
    // music_id2: string,
    // genre_id2: string,
    // id_genre2: string,
    // name_genre2: string
    // id_genre2: string,
    // name_genre2: string,
    // id_genre3: string,
    // name_genre3: string
}
export type musicGenres = music & genre