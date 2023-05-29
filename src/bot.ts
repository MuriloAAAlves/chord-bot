import { Client, REST, Routes } from "discord.js";
import { chord } from "./commands/randomChord";
import { embedReply, imageChords } from "./embeds/scaleEmbed";

const token = "";

console.log("Bot is starting...");

const client = new Client({
  intents: [],
});

const commands = [chord].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

rest
  .put(Routes.applicationCommands(""), {
    body: commands,
  })
  .then((data: any) =>
    console.log(`Successfully registered ${data.length} application commands.`)
  )
  .catch(console.error);

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const { commandName } = interaction;

    if (commandName === "chord") {
      let currentPage = -1;
      const chord = interaction.options.get("scale")!.value;
      let embed = embedReply(chord as string);

      const reply = await interaction.reply(embedReply(chord as string));

      const collector = reply.createMessageComponentCollector({
        time: 15000,
      });

      collector.on("collect", async (collect: any) => {
        const scaleChords =
          embed?.embeds[0].data.fields[0].value.split(/\s*-\s*/);
        const pages = imageChords(scaleChords);

        if (collect.isButton() && collect.customId === "refresh") {
          await collect.deferUpdate();
          embed = embedReply(chord as string);

          await interaction.editReply(embed);
        }

        if (collect.isButton() && collect.customId === "proximo") {
          currentPage++;

          await collect.deferUpdate();
          await interaction.editReply(pages[currentPage]);
        }

        if (collect.isButton() && collect.customId === "voltar") {
          currentPage--;

          if (currentPage == -1) {
            await collect.deferUpdate();
            await interaction.editReply(embed);
            return;
          }

          await collect.deferUpdate();
          await interaction.editReply(pages[currentPage]);
        }
      });
    }
  }
});

client.login(token);

export default client;
