const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "hello",
    description: "Replies with Hello, World!",
  },
  {
    name: "time",
    description: "Replies with the current server time.",
  },
  {
    name: "weather",
    description: "Provides the current weather information.",
  },
  {
    name: "joke",
    description: "Tells you a random joke.",
  },
  {
    name: "quote",
    description: "Shares an inspirational quote.",
  },
  {
    name: "roll",
    description: "Rolls a dice and gives you a random number.",
  },
  {
    name: "flip",
    description: "Flips a coin and shows heads or tails.",
  },
  {
    name: "userinfo",
    description: "Displays information about your user profile.",
  },
  {
    name: "serverinfo",
    description: "Displays information about the server.",
  },
  {
    name: "help",
    description: "Provides a list of available commands.",
  },
];

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands("1362557264828825812"), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
