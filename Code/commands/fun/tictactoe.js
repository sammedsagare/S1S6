module.exports = {
    name: 'tictactoe',
    category: "fun",
    description: 'tictactoe game',
    aliases: ["ttt"],
    run: async (client, message, args) => {
        const opponent = message.mentions.users.first();
        if (!opponent) return message.channel.send(`Please mention who you want to challenge at tictactoe.`);
        const { TicTacToe } = require('weky')
        const game = new TicTacToe({
            message: message,
            opponent: opponent, //opponent
            xColor: 'red', //x's color
            oColor: 'blurple', //zero's color
            xEmoji: '❌',  //the x emoji
            oEmoji: '⭕',//the zero emoji
        })
        game.start()
    }
}