const client = require('../index')

client.on('ready', () => {
   console.log(`${client.user.username}✅\n${client.guilds.cache.size} servers\n${client.users.cache.size} users. ✅`)

    client.user.setPresence({
        status: 'idle',
        activity: {
           name: `@Nexon`, // thing that comes after what u chose below
           type: "WATCHING", // whatever u want, can be playing, watching etc
       }
   })
})
