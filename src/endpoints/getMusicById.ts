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
        const token = req.headers.authorization as string;
        const verifiedToken: authenticationData = getTokenData(token);

        if(!verifiedToken){
            res.statusCode = 403
            res.statusMessage = "Você não está logado"
            throw new Error()
        }
      
        const result = await connection("lamusic_music").select("title");

        res.status(201).send(result)
        
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