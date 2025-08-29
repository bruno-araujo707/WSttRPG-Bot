const Helper = require('../core/Helper');

class Character {
    constructor(
        name,
        strength,
        dexterity,
        knowledge,
        psyche,
        face,
        userId
    ) {
        this.name = name;
        this.strength = strength;
        this.dexterity = dexterity;
        this.knowledge = knowledge;
        this.psyche = psyche;
        this.face = face;
        this.userId = userId;
        this.slug = function() {
            return Helper.slugify(this.name);
        }
        this.hp = function() {
            return 75 + (this.strength * 10)
        };
        this.sp = function() {
            return this.psyche * 5; 
        };
        this.defense = function() {
            let defense = this.dexterity + 2;
            if(defense < 6) {
                defense = 6;
            } 

            return defense;
        }
    }

    static fromPrisma(prismaCharacter) {
        if (!prismaCharacter) {
            return null;
        }

        return new Character(
            prismaCharacter.id,
            prismaCharacter.name,
            prismaCharacter.strength,
            prismaCharacter.dexterity,
            prismaCharacter.knowledge,
            prismaCharacter.psyche,
            prismaCharacter.face,
            prismaCharacter.userId
        );
    }
}

module.exports = Character;