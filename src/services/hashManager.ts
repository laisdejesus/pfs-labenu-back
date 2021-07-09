import { genSaltSync, hashSync, compareSync } from "bcryptjs"

export const createHash = (
   plainText: string
): string => {
   const salt: string = genSaltSync(Number(process.env.BCRYPT_COST))
   const hash: string = hashSync(plainText, salt)
   return hash
}

export const compareHash = (
   plaintText:string,
   cypherText:string
):boolean=>{
   return compareSync(plaintText, cypherText)
}