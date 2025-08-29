const Helper = require('../core/Helper');

class Attack {
    constructor(
        name,
        power,
        totalCoins,
        coinPower,
        coinDamage,
        characterId
    ) {
        this.name = name;
        this.power = power;
        this.totalCoins = totalCoins;
        this.coinPower = coinPower;
        this.coinDamage = coinDamage;
        this.characterId = characterId;
        this.slug = function() {
            return Helper.slugify(this.name);
        }
    }

    static fromPrisma(prismaAttack) {
        if (!prismaAttack) {
            return null;
        }
        return new Attack(
            prismaAttack.name,
            prismaAttack.power,
            prismaAttack.totalCoins,
            prismaAttack.coinPower,
            prismaAttack.coinDamage,
            prismaAttack.slug,
        );
    }

    useAttack()
    {
        return Attack.flipCoins(
            this.totalCoins,
            this.power,
            this.coinPower,
            this.coinDamage
        );
    }

    static flipCoins(totalCoins, basePower, coinPower, coinDamage) {
        let headCoins = 0;
        let damage = basePower;
        let hitValue = basePower;

        for (let i = 0; i < totalCoins; i++) {
            let isHead = (Math.floor(Math.random() * 2) == 0);
            if (isHead) {
                headCoins++;
                damage += coinDamage;
                hitValue += coinPower;
            }
        }

        return {
            headTotal: headCoins,
            tailsTotal: totalCoins - headCoins,
            damage: damage,
            hitValue: hitValue,
        };
    }
}

module.exports = Attack;