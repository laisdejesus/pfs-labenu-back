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
        const { title, file_string, names_genres, id_album } = req.body

        const token = req.headers.authorization as string;
        const verifiedToken: authenticationData = getTokenData(token);

        if(!verifiedToken){
            res.statusCode = 403
            res.statusMessage = "Você não está logado"
            throw new Error()
        }


        if ( !title || !file_string || !names_genres || !id_album ) {
            res.statusCode = 422
            throw new Error("Fill in the fields 'title', 'file', 'genres' e 'album'")
        }
      
        const [music] = await connection('lamusic_music')
            .where({ title })

        if (music) {
            res.statusCode = 409
            throw new Error('Music already registered')
        }

        // const id_genre = await connection("lamusic_genre")
        //     .select("id_genre")
        //     .where({name_genre});
        

        const namesGenres_String = names_genres.toString()
        
        const id: string = generateId();
        const newMusic: music = { id, title, author_id: verifiedToken.id, file_string, album_id: id_album, names_genres: namesGenres_String }
        await connection('lamusic_music')
            .insert(newMusic)
            
            
        // names_genres.forEach(async (genre: any) => {
        //     await connection("lamusic_genre")
        //     .select("id_genre")
        //     .where({name_genre})
    
                
        //     });

        let message = "Music created successfully"

        res.status(201).send({ message,  newMusic })
        

   } catch (error) {
        let message = error.sqlMessage || error.message
        res.statusCode = 400

        res.send({ message })
   }
}