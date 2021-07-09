import * as jwt from "jsonwebtoken";
import { config } from "dotenv"

config()

export type authenticationData = {
   id: string

};

export function generateToken(payload: authenticationData): string {

   return jwt.sign(
      payload,
      process.env.JWT_KEY!,
      {
         expiresIn: "48h"
      });
}

export function getTokenData(token: string): authenticationData {

   const result: authenticationData = jwt.verify(
      token,
      process.env.JWT_KEY!
   ) as authenticationData;

   return result;
}