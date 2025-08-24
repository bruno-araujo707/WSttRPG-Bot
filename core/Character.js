class Character {
    constructor(
        name,
        strength,
        dexterity,
        knowledge,
        psyche,
        face,
        owner_id
    ) {
        this.name = name;
        this.strength = strength;
        this.dexterity = dexterity;
        this.knowledge = knowledge;
        this.psyche = psyche;
        this.face = face;
        this.owner_id = owner_id;
        this.hp = function() {
            return 50 + (this.strength * 10)
        };
        this.sp = function() {
            return this.psyche * 5; 
        };
    }
}