import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => {

    return bcrypt.hash(password,10);

};

export const comparePassword = (

    password:string,

    hashed:string

)=>{

    return bcrypt.compare(password,hashed);

}