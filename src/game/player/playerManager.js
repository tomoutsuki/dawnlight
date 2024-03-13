const PlayerData = require('./playerClass');

module.exports = {
    createPlayer: (
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
    ) => {
        const Player = new PlayerData(
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
        );
    },
    changeHp: (Player) => {

    },
    changeMp: (Player) => {

    },
}
