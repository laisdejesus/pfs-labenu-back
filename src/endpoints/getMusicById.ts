import { Request, Response } from "express";
import connection from "../connection";
import { getTokenData, authenticationData } from "../services/authenticator";
import { generateId } from "../services/idGenerator";
import { music, musicGenre, musicGenres } from "../types";
import { createHash, compareHash} from "../services/hashManager"

export default async function getMusicById(
   req: Request,
   res: Response
): Promise<void> {
   try {    
        const token = req.headers.authorization as string;
        const verifiedToken: authenticationData = getTokenData(token);

        const { id } = req.params

        if(!verifiedToken){
            res.statusCode = 403
            res.statusMessage = "Você não está logado"
            throw new Error()
        }

        let message = "Success!"
      
        const musicResult: any = await connection("lamusic_music")
            .select("*")
            .where({ id })

        if (!musicResult[0]) {
            res.statusCode = 404
            message = "Music not found"
            throw new Error(message)
        }

        const music: music = {
            id: musicResult[0].id,
            title: musicResult[0].title,
            author_id: musicResult[0].author_id,
            file_string: musicResult[0].file_string,
            album_id: musicResult[0].album_id,
            ids_genres: musicResult[0].ids_genres

        }

        

        // const genreMusicResult: any = await connection.raw(`
        //     SELECT *
        //     FROM lamusic_music_genres
        //     JOIN lamusic_music
        //     ON lamusic_music_genres.music_id = lamusic_music.id
        //     JOIN lamusic_genre
        //     ON lamusic_music_genres.genres_id = lamusic_genre.id_genre;
        // `) 

        const genreMusicResult: any = await connection.raw(`
            SELECT genre_id
            FROM lamusic_music_genres
            WHERE lamusic_music_genres.music_id = "${ id }"
            
        `)

        // const genreMusicResult: any = await connection("lamusic_music_genres")
        //     .select("*")
        //     .where("music_id" = { id })

        if (!genreMusicResult[0]) {
            res.statusCode = 404
            message = "Music not found"
            throw new Error(message)
        }

        const genreMusic: musicGenre = {
            id_genre1: genreMusicResult[0].id_genre1,
            id_genre2: genreMusicResult[0].id_genre2,
            id_genre3: genreMusicResult[0].id_genre3,
            id_genre4: genreMusicResult[0].id_genre4

        }

        // const genreMusic: musicGenres = {
        //     id: genreMusicResult[0].id,
        //     title: genreMusicResult[0].title,
        //     author_id: genreMusicResult[0].author_id,
        //     ids_genres: genreMusicResult[0].ids_genres,
        //     file_string: genreMusicResult[0].file_string,
        //     album_id: genreMusicResult[0].album_id,
        //     id_genre: genreMusicResult[0].id_genre,
        //     name_genre: genreMusicResult[0].name_genre

        // }

        res.status(200).send({ message, music, genreMusicResult })
        

   } catch (error) {
        let message = error.sqlMessage || error.message
        res.statusCode = 400

        res.send({ message })
   }
}