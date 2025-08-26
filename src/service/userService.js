const prisma = require('./prisma');

const userService = {
    async createUser(userData) {
        try {
            const user = await prisma.user.create({
                data: {
                    discordUserId: userData.discordUserId,
                },
            });
            return user;
        } catch (error) {
            console.error("Error when creating user:", error);
            return null;
        }
    },

    async getUserByDiscordId(discordId) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    discordUserId: discordId,
                },
            });
            return user;
        } catch (error) {
            console.error("Error when getting user:", error);
            return null;
        }
    },

    async getOrCreateUser(userData) {
        try {
            const existingUser = await this.getUserByDiscordId(userData.discordUserId);

            if (existingUser) {
                return existingUser;
            }
            
            return await this.createUser(userData);
        } catch (error) {
            console.error("Error in getOrCreateUser:", error);
            return null;
        }
    }
};

module.exports = userService;