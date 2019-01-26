import bcrypt from 'bcryptjs'

const crypto={
    hashPassword(password){
        return bcrypt.hash(password, 10)
    },
    matchPassword(password,hash){
        return bcrypt.compare(password, hash)
    }
}

export {crypto as default}