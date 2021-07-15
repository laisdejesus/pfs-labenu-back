import * as jwt from "jsonwebtoken";
import { config } from "dotenv"

config()

export type authenticationData = {
   id: string

};

export function generateToken(payload: authenticationData
   ): string {
      return jwt.sign(
         payload,
         process.env.JWT_KEY as string,
         {
            expiresIn: process.env.JWT_EXPIRES_IN as string
         }
      )
}

export function getTokenData(   token: string
   ): authenticationData {
      const result: any = jwt.verify(
         token,
         process.env.JWT_KEY as string
      )
      
   return { id: result.id, }
}

   
     

// export function getTokenData(token: string): authenticationData {

//    const result: authenticationData = jwt.verify(
//       token,
//       process.env.JWT_KEY!
//    ) as authenticationData;

//    return result;
// }

// export function generateToken(payload: authenticationData): string {

//    return jwt.sign(
//       payload,
//       process.env.JWT_KEY!,
//       {
//          expiresIn: "48h"
//       });
// }