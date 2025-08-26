const prisma = require('./prisma');
const userService = require('./userService');
require('dotenv').config();

const characterService = {
    async listCharactersFromUser(data) {
        try {
            const user = await userService.getOrCreateUser({discordUserId: data.userId});
            const characters = await prisma.character.findMany({
                where: {
                    userId: user.id 
                },
                select: {
                    name: true,
                    strength: true,
                    dexterity: true,
                    knowledge: true,
                    psyche: true,
                    face: true,
                    imageUrl: true,   
                },
            });

            return characters;
        } catch (error) {
            console.error("Error when listing characters:", error);
            return [];
        }
    },

    async createCharacter(characterData) {
        try {
            console.log(`Dados do personagem: ${characterData}`);
            const user = await userService.getOrCreateUser({discordUserId: characterData.userId});
            console.log(user.id);
            const character = await prisma.character.create({
                data: {
                    name: characterData.name,
                    imageUrl: process.env.DEFAULT_IMAGE_TEST,
                    strength: characterData.strength,
                    dexterity: characterData.dexterity,
                    knowledge: characterData.knowledge,
                    psyche: characterData.psyche,
                    face: characterData.face,
                    user: {
                        connect: {
                            id: user.id
                        }
                    }
                },
            });
            console.log(`Personagem criado: ${character}`);

            return character
        } catch (error) {
            console.error("Error when creating character:", error);
        }
    }
}

module.exports = characterService;