const inlineReply = require('discord-reply');
const { Collection, Client, Discord } = require('discord.js')
const { MessageEmbed } = require('discord.js')
const DisTube = require("distube");
const fs = require('fs')
const recon = require('@reconlx/discord.js');
const Topgg = require('@top-gg/sdk')
const api = new Topgg.Api('your_api_token_here')
setInterval(() => {
  api.postStats({
    serverCount: client.guilds.cache.size
  })
}, 1800000)


const client = new Client({
  disableEveryone: true,
  partials: ["CHANNEL", "MESSAGE", "REACTION"]
})
require('discord-buttons')(client);

const mongoose = require('mongoose');

mongoose.connect('your_mongo_url', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(console.log('Connected to MongoDB'))






const prefixSchema = require('./models/prefix')

module.exports = client;

const config = require('./config.json')
const topgg = config.TOPGG
const prefix = config.prefix
const token = config.token







client.commands = new Collection();
client.aliases = new Collection();
client.queue = new Map();
module.exports = client;


const https = require('https-proxy-agent');
const proxy = 'http://123.123.123.123:8080';
const agent = https(proxy);
client.distube = new DisTube(client, {
  youtubeCookie: config.cookie,
  requestOptions: {
    agent
  },
  searchSongs: true,
  emitNewSongOnly: true,
  highWaterMark: 1024 * 1024 * 64,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  leaveOnStop: true,
  searchSongs: false,
  youtubeDL: true,
  updateYouTubeDL: false,
  customFilters: config.customs
})
client.setMaxListeners(0);
require('events').defaultMaxListeners = 0;


client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
/**
 * @param {Client} client
 */

client.prefix = async function (message) {
  let custom;

  const data = await prefixSchema.findOne({ Guild: message.guild.id })
    .catch(err => console.log(err))

  if (data) {
    custom = data.Prefix;
  } else {
    custom = prefix;
  }
  return custom;
}

client.on('guildDelete', async (guild) => {
  prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      prefixSchema.findOneAndDelete({ Guild: guild.id }).then(console.log('deleted data.'))
    }
  })
})


// const Levels = require("discord-xp");

// Levels.setURL("your_mongo_url");
// client.on("message", async (message) => {
//   if (!message.guild) return;
//   if (message.author.bot) return;
//   const randomAmountOfXp = Math.floor(Math.random() * 9) + 1; // Min 1, Max 30
//   const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
//   // if (hasLeveledUp) {
//   //   const user = await Levels.fetch(message.author.id, message.guild.id);
//   //   message.lineReplyNoMention(`You just levelled up to ${user.level}.`)
//   //     .then(message => message.delete({ timeout: 5000 }))

//   // }

// });



client.login(token)
