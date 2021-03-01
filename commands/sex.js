module.exports = {
  run: message => {
    if (message.author == 174172045721075712) {
      message.channel.send(`... 😳`);
      setTimeout(() => {
        message.channel.send(`Bon... D'accord... 👉👈`);
      }, 3000 + Math.floor(Math.random() * 3000));
    } else {
      message.channel.send(
        `Pas touche ! Seul <@174172045721075712> y a le droit.`
      );
    }
  },
  name: "sex",
  help: {
    description: "🔞",
    syntax: "",
  },
};
