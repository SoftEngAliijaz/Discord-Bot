const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

if (!process.env.DISCORD_BOT_TOKEN || !process.env.CLIENT_ID) {
  console.error(
    "Missing required environment variables: DISCORD_BOT_TOKEN or CLIENT_ID"
  );
  process.exit(1);
}

const commands = [];
const commandsPath = path.join(__dirname, "commands");

if (fs.existsSync(commandsPath)) {
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if (command.name && command.description) {
      commands.push({ name: command.name, description: command.description });
    } else {
      console.warn(`Command file "${file}" is missing a name or description.`);
    }
  }
} else {
  console.warn("No 'commands' folder found. Using default commands.");
  commands.push(
    { name: "ping", description: "Replies with Pong!" },
    { name: "help", description: "Provides a list of available commands." }
  );
}

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands...");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Failed to reload application (/) commands:", error);
  }
})();
