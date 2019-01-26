import getUserId from '../utils/getUserId'
const Query = {
    me(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        return prisma.query.user({
            where: {
                id: userId
            }
        }, info)
    },
    users(parent, args, { prisma }, info) {
        const optArgs = {
            first: args.first,
            skip: args.skip
        };

        if (args.query) {
            optArgs.where = {
                OR: [{
                    name_contains: args.query,
                }]
            }
        }
        return prisma.query.users(optArgs, info);
    }
}

export { Query as default }