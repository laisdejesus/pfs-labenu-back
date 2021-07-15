import { Request, Response } from "express";
import connection from "../connection";
import { getTokenData, authenticationData } from "../services/authenticator";
import { generateId } from "../services/idGenerator";
import { music, album, genre } from "../types";
import { createHash, compareHash} from "../services/hashManager"

export default async function createRecipe(
   req: Request,
   res: Response
): Promise<void> {
   try {    
        const { title, file_string, name_genre, name_album } = req.body

        const token = req.headers.authorization as string;
        const verifiedToken: authenticationData = getTokenData(token);


        if ( !title || !file_string || !name_genre || !name_album ) {
            res.statusCode = 422
            throw new Error("Fill in the fields 'title', 'file', 'genre' e 'album'")
        }
      
        const [music] = await connection('lamusic_music')
            .where({ title })

        // const [genre] = await connection('lamusic_genres')
        //     .where({ name_genre })

        // const [album] = await connection('lamusic_album')
        //     .where({ name_album })

        if (music) {
            res.statusCode = 409
            throw new Error('Music already registered')
        }


        const id_genre: string = generateId();
        const newGenre: genre = { id_genre, name_genre }
        await connection('lamusic_genre')
            .insert(newGenre)

        const id_album: string = generateId();
        const newAlbum: album = { id_album, name_album }
        await connection('lamusic_album')
            .insert(newAlbum)
        
        const id: string = generateId();
        const newMusic: music = { id, title, author_id: verifiedToken.id, file_string, album_id: id_album }
        await connection('lamusic_music')
            .insert(newMusic)

        res.status(201).send("Music created successfully")
        
        // const table_complete = await connection.raw(`
        //     SELECT *
        //     FROM lamusic_music
        //     JOIN lamusic_genre
        //     ON lamusic_music.id =
        //     lamusic_genre.id;
        // `)
        

   } catch (error) {
        let message = error.sqlMessage || error.message
        res.statusCode = 400

        res.send({ message })
   }
}