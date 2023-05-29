import { cloneDeep } from "lodash";

const chordScales = [
  ["A", "Bm", "C#m", "D", "E", "F#m", "G#dim"],
  ["A#", "Cm", "Dm", "D#", "F", "Gm", "Adim"],
  ["B", "C#m", "Dm", "E", "F#", "G#m", "A#dim"],
  ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
  ["C#", "D#", "Fm", "F#", "G#", "A#m", "Cdim"],
  ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
  ["D#", "Fm", "Gm", "G#", "A#", "Cm", "Ddim"],
  ["E", "F#m", "G#m", "A", "B", "C#m", "D#dim"],
  ["F", "Gm", "Am", "A#", "C", "Dm", "Edim"],
  ["F#", "G#m", "A#m", "C", "D", "D#m", "Fdim"],
  ["G", "Am", "Bm", "C", "D", "Em", "F#dim"],
  ["G#", "A#m", "Cm", "C#", "D#", "Fm", "Gdim"],
];

export function shuffleScale(chord: string) {
  const clonedScale = cloneDeep(chordScales);
  const newScale = clonedScale.find((scale) => scale[0] === chord);

  if (!newScale) return;

  let currentIndex = newScale.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [newScale[currentIndex], newScale[randomIndex]] = [
      newScale[randomIndex],
      newScale[currentIndex],
    ];
  }

  return newScale.slice(0, 4);
}
