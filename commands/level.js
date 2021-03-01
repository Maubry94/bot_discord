const leveling = require("discord-leveling");

module.exports = {
  run: async (message, args) => {
    let user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.author;

    let output = await leveling.Fetch(user.id);
    message.channel.send(
      `Hey ${user}, tu es actuellement niveau ${output.level} avec ${output.xp} xp.`
    );
  },
  name: "level",
  help: {
    description: "Demande-moi si tu veux savoir ton niveau.",
    syntax: "[nom de l'utilisateur]",
  },
};
