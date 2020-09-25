const Discord = require("discord.js");
const axios = require("axios");
const client = new Discord.Client();
const commands = require("./commands/commands");
const prefix = "_";

const express = require("express");
const BodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) {
    if (
      message.mentions &&
      message.mentions.members.first().id === "758658107756380201"
    ) {
      message.react("🇱");
      message.react("🇴");
      message.react("🇩");
      message.react("🇺");
      // message.react("🇬");
      // message.react("🇦");
      // message.react("🇳");
      // message.react("🇩");
      // message.react("🇲");
      // message.react("🇷");
      // message.react("🇦");
      return;
    }
    return;
  }
  // if(message.)
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();
  console.log(command);
  console.log(args);
  console.log(message.author.id);
  if (command === "hello") {
    commands.hello(message, args);
  } else if (command === "ping") {
    commands.ping(message);
  } else if (command === "insult") {
    commands.insult(message, args);
  } else if (command === "fuckoff") {
    commands.fuckoff(message, args);
  } else if (command === "joke") {
    commands.joke(message, args);
  } else if (command === "amongus") {
    commands.amongus(message, args, client);
  } else {
    commands.help(message, args, commands === "help");
  }
  // console.log(message);
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // client.user.setPresence({
  //   status: "idle", // You can show online, idle... Do not disturb is dnd
  //   game: {
  //     name: "your mom", // The message shown
  //     type: "STREAMING", // PLAYING, WATCHING, LISTENING, STREAMING,
  //   },
  // });
  client.user
    .setPresence({
      afk: true,
      activity: {
        name: "your mom",
        type: "STREAMING",
        url: "https://www.twitch.tv/halcyonbomb",
      },
      status: "online",
    })
    .then((data) => {
      // console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

client.login(process.env.BOT_TOKEN);

const app = express();

// logger for incoming requests
const logger = morgan("dev");

app.use(logger);

app.use(cors());
app.use(BodyParser.json());

// setting static folder to "public"
app.use(express.static("public"));

// view route
app.get("/", (req, res) => {
  app.render("/index.html");
});

// setting port
port = process.env.PORT || 8000;

// establishing server
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
