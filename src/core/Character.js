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
        this.hp = function() {
            return 50 + (this.strength * 10)
        };
        this.sp = function() {
            return this.psyche * 5; 
        };
    }
}