const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client
  .login(process.env.DISCORD_BOT_TOKEN)
  .then(() => {
    console.log("Bot is online!");
  })
  .catch((error) => {
    console.error("Error logging in:", error);
  });

// Event: Bot is ready
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity("Helping users!", { type: "PLAYING" });
});

// Event: Message Create
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const prefix = "!"; // Define a command prefix
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "create") {
    const url = args.join(" ");
    if (!url) {
      return message.reply("Please provide a URL or text to generate.");
    }
    return message.reply({ content: `Generated a URL for: ${url}` });
  }

  if (command === "embed") {
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Sample Embed")
      .setDescription("This is an example of an embed message.")
      .setTimestamp()
      .setFooter({
        text: "Bot Footer",
        iconURL: client.user.displayAvatarURL(),
      });

    return message.reply({ embeds: [embed] });
  }

  return message.reply("Unknown command. Try `!create` or `!embed`.");
});

// Event: Interaction Create
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    return interaction.reply("Pong!");
  }
});
