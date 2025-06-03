import bcrypt from "bcrypt"
const ROUND = 10;

export function harshPw(password){
    const salt = bcrypt.genSaltSync(ROUND);
    return bcrypt.hashSync(password, salt);
}
export function comparePw(plain, harsh){
    return bcrypt.compareSync(plain, harsh);
}