const functions = require("../../functions")
const config = require("../../config.json")
var {
  getData,
  getPreview
} = require("spotify-url-info");
const DeezerPublicApi = require('deezer-public-api');
let deezer = new DeezerPublicApi();
module.exports = {
  name: "join",
  category: "MUSIC COMMANDS",
  aliases: ["connect", "summon"],
  cooldown: 5,
  useage: "join",
  description: "Joins the Voice Channel",
  run: async (client, message, args) => {
    //if user not connected return
    if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel to execute this command!")

    //if bot is connected somewhere return
    if (message.guild.me.voice.channel) return message.channel.send("I am connected in a different voice channel!")

    //if not allowed to CONNECT to the CHANNEL
    if (!message.guild.me.permissionsIn(message.member.voice.channel).has("CONNECT"))
      return message.channel.send("`" + message.author.tag + "`" + " I am not allowed to \`join\` your Channel")

    //try to join the channel
    message.member.voice.channel.join().catch(e => {
      return message.channel.send("`" + message.author.tag + "`" + " I am not allowed to \`join\` your Channel")
    })

    //send info msg
    message.channel.send("Joined your Channel");

  }
};
