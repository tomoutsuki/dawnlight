class PlayerData {
    constructor
    (
        user_id,
        join_date,
        language,
        faction,
        nickname,
        level,
        stamina,
        location,
        xp,
        vital_point,
        mana_point,
    ) {
        this.user_id = user_id;
        this.join_date = join_date;
        this.language = language;
        this.faction = faction;
        this.nickname = nickname;
        this.level = level;
        this.stamina = stamina;
        this.location = location;
        this.xp = xp;
        this.vital_point = vital_point;
        this.mana_point = mana_point;
    }
  
    setParameterValue(parameter, value) {
        if (this.hasOwnProperty(parameter)) {
            this[parameter] = value;
            return true;
        } else {
            return false; // Parameter doesn't exist in the Player model
        }
    }
}
  
module.exports = PlayerData;