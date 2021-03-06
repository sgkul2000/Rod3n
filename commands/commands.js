const axios = require("axios")
const Discord = require("discord.js")

const hellojson = require("../hello.json")

function getHelloPhrase(type) {
  return hellojson[type][Math.floor(Math.random() * hellojson[type].length)]
}

function MissingPermissions(message) {
  message.author
    .send(
      `**Permission missing.**
      i must be able to *Read/send/manage* messages.`
    )
    .then(() => {
      console.log("sent")
    })
    .catch((err) => {
      console.error(err)
    })
}

function errorHandler(err, message) {
  console.error(err)
  if (err.message === "Missing Permissions") {
    MissingPermissions(message)
  }
}

function hello(message, args) {
  var type = args[1] && args[1].toLowerCase() === "desi" ? "desi" : "default"
  message
    .delete()
    .then(async () => {
      var greeting = getHelloPhrase(type)
      return message.channel.send(`${greeting} ${args[0]}`, {
        tts: type === "default" ? true : false,
      })
    })
    .catch((err) => {
      errorHandler(err, message)
    })
}

function ping(message) {
  return message.channel.send("Pong!!")
}

function insult(message, args) {
  var tts = true
  if (args[1] === "notts") {
    tts = false
  }
  message
    .delete()
    .then(() => {
      axios
        // .get("https://insult.mattbas.org/api/insult")
        .get("https://evilinsult.com/generate_insult.php?lang=en&type=json")
        .then((res) => {
          let backfire = Math.floor(Math.random() * 2)
          if (args[0] && backfire === 0) {
            return message.channel.send(`${args[0]}, ${res.data.insult}`, {
              tts,
            })
          } else {
            message.channel.send(`${message.author}, ${res.data.insult}`, {
              tts,
            })
            // setTimeout(function () {
            //   message.channel.send(`${message.author} stop misusing me`)
            // }, 2000)
          }
        })
        .catch((err) => {
          errorHandler(err, message)
        })
    })
    .catch((err) => {
      errorHandler(err, message)
    })
}

function fuckoff(message, args) {
  var params = args.join("/")
  message
    .delete()
    .then(() => {
      axios
        .get(`http://foaas.com/${params}`)
        .then((res) => {
          return message.channel.send(
            `${res.data.message} ${res.data.subtitle}`
          )
        })
        .catch((err) => {
          console.error(err)
        })
    })
    .catch((err) => {
      errorHandler(err, message)
    })
}

function joke(message, args) {
  var url
  if (args.length === 0) {
    // return message.channel.send("Parameters missing hai BC")
    url = "Any"
  } else if (args[0].toLowerCase() === "any") {
    url = "Any"
  } else {
    for (var i = 0;i < args.length;i++) {
      args[i] = Capitalize(args[i])
    }
    url = args.join(",")
  }
  axios
    .get(`https://sv443.net/jokeapi/v2/joke/${url}`)
    .then((res) => {
      console.log(res.data)
      if (res.data.type === "single") {
        return message.reply(res.data.joke)
      } else {
        message.reply(res.data.setup)
        setTimeout(function () {
          message.channel.send(res.data.delivery)
        }, 3000)
      }
    })
    .catch((err) => {
      errorHandler(err, message)
    })
}

function amongus(message, args, client) {
  message
    .delete()
    .then(() => {
      const embed = new Discord.MessageEmbed()
        // Set the title of the field
        .setTitle("Amongus mode")
        // Set the color of the embed
        .setColor(0xff8008)
        // Set the main content of the embed
        .setDescription("Code: ABCDEF\nServer: Asia.")
      message.channel.send(embed).then((msg) => {
        msg.react("⏹️")
      }).catch(err => {
        errorHandler(err, message)
      })
    })
    .catch((err) => {
      errorHandler(err, message)
    })
}

function help(message, args) {
  var title
  var description
  message
    .delete()
    .then((message) => {
      if (args[0]) {
        if (args[0] === "hello") {
          title = "Say hello to your friends"
          description = `
				Usage : "_hello <tag-member>"
				Behavior : Greets the tagged member with a funny phrase
			`
        } else if (args[0] === "insult") {
          title = "Insult others."
          description = `
				Usage : "_insult <tag-member> <tts>"*
				Behavior : Insults the member tagged with a very explit phrase.
							be advised, you may endup insulting yourself.
							by default Text to speech is on. switch it off by sending "notts as the second parameter"
			`
        } else if (args[0] === "fuckoff") {
          title = "Get back at others with a very offensive 'fuckoff phrase'"
          description = `
				Usage : "_fuckoff type <tag-to-mmber> <tag--member>"
				Behavior : sends a fuckoff message to the person tagged
				examples:
					_fuckoff off <to> <from>
					_fuckoff shakespeare <to> <from>
					_fuckoff waste <to> <from>
					
				this is just the beginning.
				checkout the official API documentation at : https://www.foaas.com
			`
        } else if (args[0] === "joke") {
          title = "Get a joke"
          description = `
					usage : "_joke <space-seperated-types>"
					Behavior : Sends a really hilarious joke.
					types: Any, Programming, Dark, Pun, Miscellaneous (not case sensitive)
					examples: 
						_joke
						_joke any
						_joke programming
						_joke dark
					
					Checkout the full API documentation for more : https://sv443.net/jokeapi/v2/
				`
        } else if (args[0] === "amongus") {
          title = "Play among us"
          description = `
			Usage: "_amongus <code> <server>"
			Behavior : Send the code and server as parameter to instantly pin the message to the channel "among-us"
			* Server location is an optional parameter.
			
		`
        }
      } else {
        title = "Rod3n instruction manual"
        description = `
	  	Rod3n is a All in one bakchod bot.
		Invoke it using the following commands with the prefix "_":
			help
			hello
			joke
			insult
			fuckoff
		
		use the command "_help <command-name>" to get help on a specific command.
		Jai Bakchods.
	  `
      }
      const embed = new Discord.MessageEmbed()
        // Set the title of the field
        .setTitle(title)
        // Set the color of the embed
        .setColor(0xff0000)
        // Set the main content of the embed
        .setDescription(description)
      // Send the embed to the same channel as the message
      return message.channel
        .send(embed)
        .then((msg) => {
          msg.delete({
            timeout: 20000,
          })
        })
        .catch((err) => {
          errorHandler(err, message)
        })
    })
    .catch((err) => {
      errorHandler(err, message)
    })
}

function Capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
module.exports = { hello, ping, insult, fuckoff, joke, amongus, help }
