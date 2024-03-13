const State = require.main.require('./game/eventHandlers/stateManager');

module.exports = {
    name: "guildMemberAdd",
    async execute(member, client) {
        console.log(member.joinedTimestamp)
        const joinedTimestamp = new Date(member.joinedTimestamp);
        const formatedTime = "["+
            joinedTimestamp.getDate()+"-"+
            ('0'+(joinedTimestamp.getMonth()+1)).slice(-2)+"-"+
            joinedTimestamp.getFullYear()+" "+
            joinedTimestamp.getHours()+":"+
            joinedTimestamp.getMinutes()+":"+
            joinedTimestamp.getSeconds()+"]"
        ;
        console.log(formatedTime, member.user.username, "slipped into Dawnlight");
        await State.initRegister(member);
    }
}