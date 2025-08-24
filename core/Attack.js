class Attack {
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