const { Calculator } = require('weky');
module.exports = {
    name: 'calculator',
    description: 'math calculator :smirk:',
    aliases: ["calcu", "calci"],
    category: "fun",
    run: async (client, message, args) => {
        await Calculator(message)
    }
}