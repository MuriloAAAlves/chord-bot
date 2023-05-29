import {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  ButtonStyle,
} from "discord.js";
import { chordFinder } from "../chords/chordFinder";
import { shuffleScale } from "../chords/randomize";

export const embedReply = (chord: string): any => {
  const scale = shuffleScale(chord)!;

  const embed = new EmbedBuilder().setColor(0x2cadad).addFields({
    name: `Escala de ${chord}`,
    value: scale[0] + " - " + scale[1] + " - " + scale[2] + " - " + scale[3],
    inline: true,
  });
  const refreshButton = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("refresh")
      .setLabel("Refresh")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("proximo")
      .setLabel("Proximo")
      .setStyle(ButtonStyle.Secondary)
  );

  return {
    ephemeral: true,
    embeds: [embed],
    components: [refreshButton],
  };
};

const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder()
    .setCustomId("voltar")
    .setLabel("Voltar")
    .setStyle(ButtonStyle.Secondary),
  new ButtonBuilder()
    .setCustomId("proximo")
    .setLabel("Proximo")
    .setStyle(ButtonStyle.Secondary)
);

export const imageChords = (scale: string[]): Array<any> => {
  const embedArray: Array<any> = [];

  for (const chord of scale) {
    const embed = new EmbedBuilder()
      .setColor(0x2cadad)
      .setTitle(chord)
      .setImage(chordFinder(chord));
    embedArray.push({
      ephemeral: true,
      embeds: [embed],
      components: [buttons],
    });
  }
  return embedArray;
};
