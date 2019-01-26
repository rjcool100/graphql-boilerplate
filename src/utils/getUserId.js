import Token from './TokenManager'

const getUserID = (request, requireAuth = true) => {
    const header = request.request.headers.authorization
    if (header) {
        const token = header.replace('Bearer ', '')
        const decodedData =  Token.verifyToken(token);
        return decodedData.userId
    }
    if (requireAuth)
        throw new Error("Authentication required")
    else
        return null

}

export { getUserID as default }