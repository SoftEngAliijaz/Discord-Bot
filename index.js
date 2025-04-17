const { Client, GatewayIntentBits } = require("discord.js");
const DISCORD_BOT_TOKEN =
  "MTM2MjU1NzI2NDgyODgyNTgxMg.GeDFp6.JkzTC4HI7A0SQnOVJ8Ql7YQUhY9sBDoMgNR9MA";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client
  .login(process.env.DISCORD_BOT_TOKEN || DISCORD_BOT_TOKEN)
  .then(() => {
    console.log("Bot is online!");
  })
  .catch((error) => {
    console.error("Error logging in:", error);
  });

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1];
    return message.reply({ content: `Generated a Url for: ${url}` });
  }
  return message.reply("Hello! I am a bot. How can I help you?");
});

client.on("interactionCreate", (interaction) => {
  return interaction.reply("Pong!");
});
