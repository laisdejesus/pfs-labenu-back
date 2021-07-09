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
    author: string,
    date: Date,
    file_string: string,
}

export type album = {
    id: string,
    name: string
}

export type genre = {
    id: string,
    name: string
}