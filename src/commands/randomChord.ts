const { SlashCommandBuilder } = require("discord.js");

export const chord = new SlashCommandBuilder()
  .setName("chord")
  .setDescription("Replies with a random chord scale!")
  .addStringOption((option: any) =>
    option
      .setName("scale")
      .setDescription("Manda as parada e tal")
      .setRequired(true)
      .addChoices(
        { name: "A", value: "A" },
        { name: "A#", value: "A#" },
        { name: "B", value: "B" },
        { name: "C", value: "C" },
        { name: "C#", value: "C#" },
        { name: "D", value: "D" },
        { name: "D#", value: "D#" },
        { name: "E", value: "E" },
        { name: "F", value: "F" },
        { name: "F#", value: "F#" },
        { name: "G", value: "G" },
        { name: "G#", value: "G#" }
      )
  );
