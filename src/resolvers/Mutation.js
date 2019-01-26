import crypto from '../utils/hash'
import getUserId from '../utils/getUserId'
import Token from '../utils/TokenManager'
const Mutation = {
    async createUser(parent, args, { prisma }, info) {

        if (args.data.password.length < 8) {
            throw new Error("Password should be 8 or more characters long")
        }


        const emailTaken = await prisma.exists.User({ email: args.data.email })
        if (emailTaken) {
            throw new Error('the email is already taken')
        }

        const password = await crypto.hashPassword(args.data.password)

        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        })

        return {
            user,
            token: Token.generateToken({ userId: user.id })
        }

    },
    async loginUser(parent, args, { prisma }, info) {

        if (args.data.password.length < 8) {
            throw new Error("Password should be 8 or more characters long")
        }
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        })

        if (!user) {
            throw new Error("login failed")
        }

        const match = await crypto.matchPassword(args.data.password, user.password)

        if (!match) {
            throw new Error("Login failed")
        }

        return {
            user,
            token: Token.generateToken({ userId: user.id })
        }

    },
    async deleteUser(parent, args, { prisma, request }, info) {

        const userId = getUserId(request)

        const userExists = await prisma.exists.User({ id: userId })
        if (!userExists) {
            throw new Error('the user does not exist')
        }
        var user = await prisma.mutation.deleteUser({
            where: {
                id: userId
            }
        }, info)
        return user
    },
    async updateUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const userExists = await prisma.exists.User({ id: userId })
        if (!userExists) {
            throw new Error('the user does not exist')
        }

        if (typeof args.data.email === 'string') {

            const emailTaken = await prisma.query.User({ where: { email: args.data.email } })
            if (emailTaken) {
                throw new Error('the email is already taken')
            }
            console.log(emailTaken)
        }
        console.log(args)



        if (typeof args.data.password === 'string') {
            if (args.data.password.length < 8) {
                throw new Error("Password should be 8 or more characters long")
            }
            args.data.password = await crypto.hashPassword(args.data.password)
        }

        var user = await prisma.mutation.updateUser({
            data: args.data,
            where: {
                id: userId
            }
        }, info)
        return user

    }
}


export { Mutation as default }