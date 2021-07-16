import { Request, Response } from "express";
import connection from "../connection";
import { getTokenData, authenticationData } from "../services/authenticator";
import { generateId } from "../services/idGenerator";
import { music, album } from "../types";
import { createHash, compareHash} from "../services/hashManager"

export default async function createMusic(
   req: Request,
   res: Response
): Promise<void> {
   try {    
        const { title, file_string, id_genre, id_album } = req.body

        const token = req.headers.authorization as string;
        const verifiedToken: authenticationData = getTokenData(token);


        if ( !title || !file_string || !id_genre || !id_album ) {
            res.statusCode = 422
            throw new Error("Fill in the fields 'title', 'file', 'genres' e 'album'")
        }

        if(!verifiedToken){
            res.statusCode = 403
            res.statusMessage = "Você não está logado"
            throw new Error()
        }
      
        const [music] = await connection('lamusic_music')
            .where({ title })

        if (music) {
            res.statusCode = 409
            throw new Error('Music already registered')
        }

        const idsGenres_String = id_genre.toString()
        
        const id: string = generateId();
        const newMusic: music = { id, title, author_id: verifiedToken.id, file_string, album_id: id_album, ids_genres: idsGenres_String }
        await connection('lamusic_music')
            .insert(newMusic)

        
        id_genre.forEach(async (genre: any) => {
            await connection.raw(`
            INSERT INTO lamusic_music_genres
            VALUES ("${id}", "${genre}");`)
        });

            
        // for (var i = 0; i < id_genre.length; i++) {
        //     await connection.raw(`
        //     INSERT INTO lamusic_music_genres
        //     VALUES ("${id}", "${id_genre[i]}");
        // `)}
        

        let message = "Music created successfully"

        res.status(201).send({ message, newMusic })
        

   } catch (error) {
        let message = error.sqlMessage || error.message
        res.statusCode = 400

        res.send({ message })
   }
}