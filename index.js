// Initialisation
const Discord = require("discord.js"),
  client = new Discord.Client({
    fetchAllMembers: true,
  }),
  config = require("./config.json"),
  fs = require("fs");

client.login(config.token);
client.commands = new Discord.Collection();

// Fonction lancée au démarrage du bot
client.on("ready", () => {
  console.log("I am ready!");
  const statuses = [
    () => `faire du thé.`,
    // () =>
    //   `se faire vénérer par ses ${client.guilds.cache.reduce(
    //     (acc, guild) => acc + guild.memberCount,
    //     0
    //   )} fidèles`,
  ];
  let i = 0;
  setInterval(() => {
    client.user.setActivity(statuses[i](), { type: "PLAYING" });
    i = ++i % statuses.length;
  }, 1e4);
});

// Parcourt des commandes
fs.readdir("./commands", (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  });
});

// Détection des commandes
client.on("message", message => {
  if (message.type !== "DEFAULT" || message.author.bot) return;

  const args = message.content.trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  if (!commandName.startsWith(config.prefix)) return;
  const command = client.commands.get(commandName.slice(config.prefix.length));
  if (!command) return;
  command.run(message, args, client);
});

// Message de bienvenue
client.on("guildMemberAdd", member => {
  member.guild.channels.cache
    .get(config.greeting.channel)
    .send(
      new Discord.MessageEmbed()
        .setDescription(
          `Bienvenue à toi ${member}. Mon culte compte maintenant ${member.guild.memberCount} membres ! ✨`
        )
        .setColor("#00ff00")
    );
  // member.roles.add(config.greeting.role);
});

// Message de départ
client.on("guildMemberRemove", member => {
  member.guild.channels.cache
    .get(config.greeting.channel)
    .send(
      new Discord.MessageEmbed()
        .setDescription(
          `${member.user.tag} n'aura plus le droit à mon thé ! ☕`
        )
        .setColor("#ff0000")
    );
});

// Système de level
const leveling = require("discord-leveling");

client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;

  let profile = await leveling.Fetch(message.author.id);
  leveling.AddXp(message.author.id, 15);

  if (profile.xp + 15 > 150) {
    leveling.AddLevel(message.author.id, 1);
    leveling.SetXp(message.author.id, 0);
    message.channel.send(
      `Félicitation <@${message.author.id}>, tu es passé niveau ${
        profile.level + 1
      } !`
    );
  }
});
