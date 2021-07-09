import { Request, Response } from "express"
import connection from "../connection"
import { generateToken } from "../services/authenticator"
import { generateId } from "../services/idGenerator"
import { createHash } from "../services/hashManager"
import { user } from "../types";

export default async function signup(
    req: Request,
    res: Response
 ): Promise<void> {;
    try {
 
       const { name, nickname, email, password } = req.body
 
       if (!name || !nickname || !email || !password ) {
          res.statusCode = 422
          throw new Error("Preencha os campos 'name', 'nickname', 'email' e 'password'")
       }
       if (!email.includes("@") ) {
          throw new Error("O campo de email precisa de um '@'")
       }
 
       if ( password.length <= 6 ) {
         throw new Error("Password deve ter no minímo 6 caracteres")
       }
 
       const [user] = await connection('lamusic_users')
          .where({ email, name })
 
       if (user) {
          res.statusCode = 409
          throw new Error('Nome ou Email já cadastrado')
       }
 
       const id: string = generateId();
 
       const newUser: user = { id, name, nickname, email, password: createHash(password) }
 
       await connection('lamusic_users')
          .insert(newUser)
 
       const token: string = generateToken(
          {
             id: newUser.id
          }
       )
 
       res.status(201).send({ token })
 
    } catch (error) {
       res.status(400).send({ message: error.message})
 
    }
 }
