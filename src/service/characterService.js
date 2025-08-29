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
                    slug: true,
                    imageUrl: true,
                    maxHp: true,
                    maxSp: true,
                    currentHp: true,
                    currentSp: true,
                    strength: true,
                    dexterity: true,
                    knowledge: true,
                    psyche: true,
                    face: true,
                },
            });

            return characters;
        } catch (error) {
            console.error("Erro ao buscar personagem:", error);
            return [];
        }
    },

    async createCharacter(characterInstance) {
        try {
            console.log(`Dados do personagem: ${characterInstance}`);
            const user = await userService.getOrCreateUser({discordUserId: characterInstance.userId});
            console.log(user.id);
            const character = await prisma.character.create({
                data: {
                    name: characterInstance.name,
                    slug: characterInstance.slug(),
                    imageUrl: process.env.DEFAULT_IMAGE_TEST,
                    strength: characterInstance.strength,
                    dexterity: characterInstance.dexterity,
                    knowledge: characterInstance.knowledge,
                    psyche: characterInstance.psyche,
                    face: characterInstance.face,
                    maxHp: characterInstance.hp(),
                    currentHp: characterInstance.hp(),
                    maxSp: characterInstance.sp(),
                    currentSp: characterInstance.sp(),
                    user: {
                        connect: {
                            id: user.id
                        }
                    }
                },
            });
            console.log(`Personagem criado: ${character}`);

            return character;
        } catch (error) {
            console.error("Erro ao buscar personagem:", error);
        }
    },

    async findCharacter(slug) {
        try {
            const character = await prisma.character.findFirst({
                where: {
                    slug: slug 
                },
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    imageUrl: true,
                    maxHp: true,
                    maxSp: true,
                    currentHp: true,
                    currentSp: true,
                    strength: true,
                    dexterity: true,
                    knowledge: true,
                    psyche: true,
                    face: true,
                },
            });
            console.log(`Personagem encontrado: ${character}`);

            return character;
        } catch (error) {
            console.error("Erro ao buscar personagem:", error);
        }
    },

    async getMainCharacter() {
        try {
            const character = await prisma.character.findFirst({
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    imageUrl: true,
                    maxHp: true,
                    maxSp: true,
                    currentHp: true,
                    currentSp: true,
                    strength: true,
                    dexterity: true,
                    knowledge: true,
                    psyche: true,
                    face: true,
                },
            });
            console.log(`Personagem encontrado: ${character}`);

            return character;
        } catch (error) {
            console.error("Erro ao buscar personagem:", error);
        }
    },
}

module.exports = characterService;