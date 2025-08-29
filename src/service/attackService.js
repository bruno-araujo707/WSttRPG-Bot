const prisma = require('./prisma');
const characterService = require('./characterService');
const userService = require('./userService');
const Attack = require('../core/Attack');
require('dotenv').config();

const attackService = {
    async listAttacksFromCharacter(character) {
        try {
            const attacks = await prisma.attack.findMany({
                where: {
                    characterId: character.id 
                },
                select: {
                    name: true,
                    imageUrl: true,
                    power: true,
                    totalCoins: true,
                    coinDamage: true,
                    coinPower: true,
                    slug: true,
                },
            });

            return attacks;
        } catch (error) {
            console.error("Error when listing attacks:", error);
            return [];
        }
    },

    async createAttack(attackInstance, characterSlug) {
        try {
            console.log(`Dados do ataque: ${attackInstance}`);
            const character = await characterService.findCharacter(characterSlug);
            const attack = await prisma.attack.create({
                data: {
                    name: attackInstance.name,
                    slug: attackInstance.slug(),
                    power: attackInstance.power,
                    totalCoins: attackInstance.totalCoins,
                    coinPower: attackInstance.coinPower,
                    coinDamage: attackInstance.coinDamage,
                    character: {
                        connect: {
                            id: character.id
                        }
                    }
                },
            });
            console.log(`Ataque criado: ${attack}`);

            return attack
        } catch (error) {
            console.error("Erro ao criar ataque:", error);
            return null;
        }
    },

    async findAttack(slug, characterSlug) {
        try {
            const character = await characterService.findCharacter(characterSlug);
            const attack = await prisma.attack.findFirst({
                where: {
                    characterId: character.id,
                    slug: slug 
                },
                select: {
                    id: true,
                    name: true,
                    power: true,
                    totalCoins: true,
                    coinDamage: true,
                    coinPower: true,
                    slug: true,
                },
            });
            console.log(`Ataque encontrado: ${attack}`);

            return Attack.fromPrisma(attack);;
        } catch (error) {
            console.error("Erro ao buscar ataque:", error);
        }
    },

    async getMainAttack(character) {
        try {
            const attack = await prisma.attack.findFirst({
                where: {
                    characterId: character.id,
                },
                select: {
                    id: true,
                    name: true,
                    power: true,
                    totalCoins: true,
                    coinDamage: true,
                    coinPower: true,
                    slug: true,
                },
            });
            console.log(`Ataque encontrado: ${attack}`);

            return Attack.fromPrisma(attack);
        } catch (error) {
            console.error("Erro ao buscar ataque:", error);
        }
    },
}

module.exports = attackService;