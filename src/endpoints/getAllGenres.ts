import { Request, Response } from "express";
import connection from "../connection";
import { getTokenData, authenticationData } from "../services/authenticator";

export default async function getAllMusics(
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
            console.log(res.statusMessage)
        }
      
        const result = await connection("lamusic_genre").select("*");
        

        res.status(200).send(result)        

   } catch (error) {
        let message = error.sqlMessage || error.message
        res.statusCode = 400

        res.send({ message })
   }
}