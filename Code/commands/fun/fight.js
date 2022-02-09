module.exports = {
    name: 'fight',
    description: 'fight a user',
    category: "fun",
    run: async (client, message, args) => {
        const oppenent = message.mentions.users.first();
        if (!oppenent) return message.channel.send(`Please mention who you want to fight`);
        const { fight } = require('weky')
        const x = new fight({
            client: client,
            message: message,
            acceptMessage: 'Click to fight with <@' + message.author + '>',
            challenger: message.author,
            opponent: message.mentions.users.first(),
            hitButtonText: 'HIT',
            hitButtonColor: 'red',
            healButtonText: 'HEAL',
            healButtonColor: 'green',
            cancelButtonText: 'CANCEL',
            cancelButtonColor: 'blurple',
        })
        x.start()
    }
}
