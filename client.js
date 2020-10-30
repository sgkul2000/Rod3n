const Discord = require('discord.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const commands = require('./commands/commands')
const prefix = '!'

client.on('message', async (message) => {
  if (message.author.bot) return
  if (!message.content.startsWith(prefix)) {
    try {
      if (message.mentions && message.mentions.has('758658107756380201')) {
        message.react('🇱')
        message.react('🇴')
        message.react('🇩')
        message.react('🇺')
        // message.react("🇬");
        // message.react("🇦");
        // message.react("🇳");
        // message.react("🇩");
        // message.react("🇲");
        // message.react("🇷");
        // message.react("🇦");
        return
      }
    } catch (err) {
      console.error(err)
    }
    return
  }
  // if(message.)
  const commandBody = message.content.slice(prefix.length)
  const args = commandBody.split(' ')
  const command = args.shift().toLowerCase()
  console.log(command)
  console.log(args)
  console.log(message.author.id)
  if (command === 'hello') {
    commands.hello(message, args)
  } else if (command === 'ping') {
    commands.ping(message)
  } else if (command === 'insult') {
    commands.insult(message, args)
  } else if (command === 'fuckoff') {
    commands.fuckoff(message, args)
  } else if (command === 'joke') {
    commands.joke(message, args)
  } else if (command === 'amongus') {
    commands.amongus(message, args, client)
  } else {
    commands.help(message, args)
  }
  // console.log(message);
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user}!`)
  client.user
    .setPresence({
      afk: true,
      activity: {
        name: 'your mom',
        type: 'STREAMING',
        url: 'https://www.twitch.tv/halcyonbomb',
      },
      status: 'online',
    })
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.error(err)
    })
})

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.partial) {
    // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
    try { 
      await reaction.fetch()
    } catch (error) {
      console.error('Something went wrong when fetching the message: ', error)
      // Return as `reaction.message.author` may be undefined/null
      return
    }
  }
//   // Now the message has been cached and is fully available
  console.log(
    `${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`
  )
//   // The reaction is now also fully available and the properties will be reflected accurately:
//   console.log(
//     `${reaction.count} user(s) have given the same reaction to this message!`
//   )

  if(reaction.message.author === client.user && reaction.message.embeds[0].title === "Amongus mode"){
      console.log(reaction.message.guild.member(user).voice)
      if(typeof reaction.message.guild.member(user).voice.name === "undefined"){
          reaction.message.channel.send(`${user}, Please enter a voice channel and try again.`).then((mssg) => {
              mssg.delete({
                  timeout: 10000
              })
          }).catch(err => {
              console.error(err)
          })
      } else {
          console.log(reaction.emoji)
      }
  }
})

module.exports = client
