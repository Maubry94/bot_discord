const Discord = require("discord.js");

const waifus = [
  {
    name: "ThieuMa-chan",
    image:
      "http://thieuma.synology.me/bot_discord/images/waifus/ThieuMa-chan.jpg",
  },
  {
    name: "Yoyo-chan",
    image: "http://thieuma.synology.me/bot_discord/images/waifus/Yoyo-chan.jpg",
  },
  {
    name: "NK-chan",
    image: "http://thieuma.synology.me/bot_discord/images/waifus/NK-chan.jpg",
  },
  {
    name: "Midou-chan",
    image:
      "http://thieuma.synology.me/bot_discord/images/waifus/Midou-chan.jpg",
  },
  {
    name: "Louis-chan",
    image:
      "http://thieuma.synology.me/bot_discord/images/waifus/Louis-chan.jpg",
  },
  {
    name: "Quentin-chan",
    image:
      "http://thieuma.synology.me/bot_discord/images/waifus/Quentin-chan.jpg",
  },
  {
    name: "Max-chan",
    image: "http://thieuma.synology.me/bot_discord/images/waifus/Max-chan.png",
  },
  {
    name: "Timo-chan",
    image: "http://thieuma.synology.me/bot_discord/images/waifus/Timo-chan.jpg",
  },
];

module.exports = {
  run: (message, args) => {
    let exist = true;
    if (args[0]) {
      for (let i = 0; i < waifus.length; i++) {
        if (args[0] == "list") {
          return message.channel.send(
            new Discord.MessageEmbed()
              .setTitle("Liste des waifus")
              .setDescription(`${waifus.map(waifu => `\`${waifu.name}\``)}`)
              .setFooter("Elles sont toutes à craquer 🤭")
          );
        }

        if (args[0] == waifus[i].name) {
          return message.channel.send(
            new Discord.MessageEmbed()
              .setTitle(`${waifus[i].name} #${i}`)
              .setImage(waifus[i].image)
          );
        } else {
          exist = false;
        }
      }
      if (!exist) return message.channel.send("Cette waifu n'existe pas.");
    } else {
      let i = Math.floor(Math.random() * waifus.length);
      message.channel.send(
        new Discord.MessageEmbed()
          .setTitle(`${waifus[i].name} #${i}`)
          .setImage(waifus[i].image)
      );
    }
  },
  name: "waifu",
  help: {
    description: "Je connais les plus belles waifus que tu n'ais jamais vu 😏",
    syntax: "list | [nom de la waifu]",
  },
};
