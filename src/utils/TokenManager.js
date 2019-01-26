import jwt from 'jsonwebtoken'
const JWTSECRET = "neyeyeyeyeyeyeyeyeeyeyeyeyeyeyeyeyeyeyeyeyeyeyeeyyeyeeyyey" 

const Token={
    generateToken(data){
        return jwt.sign(data, JWTSECRET,{expiresIn:'7 days'})
    },
    verifyToken(token){
        return jwt.verify(token, JWTSECRET);
    }
    
}


export {Token as default}