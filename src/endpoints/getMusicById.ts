import { Request, Response } from "express";
import connection from "../connection";
import { getTokenData, authenticationData } from "../services/authenticator";
import { generateId } from "../services/idGenerator";
import { album, music, musicGenre, musicGenres } from "../types";
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
            names_genres: musicResult[0].names_genres

        }

        const genreMusicResult: any = await connection.raw(`
            SELECT * FROM lamusic_music_genres
            JOIN lamusic_genre
            ON lamusic_music_genres.genre_id = lamusic_genre.id_genre
            WHERE lamusic_music_genres.music_id = "${ id }";        
        `)

        const genreMusic: musicGenre = {
            music_id: genreMusicResult[0].music_id,
            genre_id: genreMusicResult[0].genre_id,
            id_genre: genreMusicResult[0].id_genre,
            name_genre: genreMusicResult[0].name_genre,
            // music_id2: genreMusicResult[0].music_id2,
            // genre_id2: genreMusicResult[0].genre_id2,
            // id_genre2: genreMusicResult[0].id_genre2,
            // name_genre2: genreMusicResult[0].name_genre2,
            // id_genre2: genreMusicResult[0].id_genre2,
            // name_genre2: genreMusicResult[0].name_genre2,
            // id_genre3: genreMusicResult[0].id_genre3,
            // name_genre3: genreMusicResult[0].name_genre3
        }

        const albumMusicResult: any = await connection.raw(`
            SELECT * FROM lamusic_music
            JOIN lamusic_album
            ON lamusic_album.id_album = lamusic_music.album_id
            WHERE lamusic_music.id = "${ id }";        
        `)

        const albumMusic: album = {
            id_album: albumMusicResult[0][0].id_album,
            name_album: albumMusicResult[0][0].name_album
        }
        console.log(albumMusicResult)

        res.status(200).send({ message, music, albumMusic, genreMusicResult })
        

   } catch (error) {
        let message = error.sqlMessage || error.message
        res.statusCode = 400

        res.send({ message })
   }
}