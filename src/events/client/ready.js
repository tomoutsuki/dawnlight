module.exports = {
    name: 'ready',
    onde: true,
    async execute(client) {
        console.log(`The bot is ready. ${client.user.tag} is logged in and online.`);
    }
}