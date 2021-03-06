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
    ids_genres: string[]
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
    id_genre1: string,
    id_genre2: string,
    id_genre3: string,
    id_genre4: string
}

export type musicGenres = music & genre