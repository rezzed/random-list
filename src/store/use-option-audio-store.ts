import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

class ListItem<T = unknown> {
  constructor(readonly label: string, readonly value: T) {}
}

// ------------------------------------

const VOLUME_DEFAULT_INDEX = 6; // -> 80%

const VOLUME_LIST = '20 30 40 50 60 70 80 90 100'
  .split(' ')
  .map((entry) => item(`${entry}%`, Number.parseInt(entry, 10)));

// ------------------------------------

const AUDIO_LIST = [
  // All labels must be unique.
  // The first entry is used as default.
  item('[ none ]', ''),
  item('Arpeggio up', 'arp-up'),
  item('Arpeggio down', 'arp-down'),
  item('Arpeggio random 1', 'arp-rand-1'),
  item('Arpeggio random 2', 'arp-rand-2'),
  item('Arpeggio melody short', 'arp-melody-short'),
  item('Arpeggio melody long', 'arp-melody-long'),
  item('A tribute to the peddlers', 'the-peddlers'),
];

const AUDIO_MAP = new Map(AUDIO_LIST.map((item) => [item.label, item]));

// ------------------------------------

export const useOptionAudioStore = defineStore('optionAudio', {
  state: () => ({
    // The label of the audio file is stored as key.
    rawAudio: useStorage<string | null>('audio', null, undefined, {
      serializer: {
        read: (raw: string) => (AUDIO_MAP.has(raw) ? raw : AUDIO_LIST[0].label),
        write: (value: string) => value,
      },
    }),
    // The index of the volume is stored as key.
    // It is stored indipendent and not reset if the selected audio file changes.
    rawAudioVolume: useStorage<number | null>('audioVolume', null, undefined, {
      serializer: {
        read: (raw: string) => validVolumeIndex(Number.parseInt(raw, 10), VOLUME_DEFAULT_INDEX),
        write: (value: number) => '' + value,
      },
    }),
    // A boolean flag to indicate the playing state.
    rawPlaying: false,
  }),

  getters: {
    list: () => AUDIO_LIST,
    selected: (state) => (state.rawAudio && AUDIO_MAP.get(state.rawAudio)) || AUDIO_LIST[0],

    volumeSteps: () => VOLUME_LIST,
    volume(): ListItem<number> {
      return VOLUME_LIST[this.volumeIndex] || VOLUME_LIST[VOLUME_DEFAULT_INDEX];
    },
    volumeIndex: (state) =>
      state.rawAudioVolume !== null ? state.rawAudioVolume : VOLUME_DEFAULT_INDEX,
    // Do not check for "canPlay" here,
    // as the volume should be changeable before anything is selected.
    volumeCanIncrease(): boolean {
      return !!this.rawAudio && this.volumeIndex < VOLUME_LIST.length - 1;
    },
    volumeCanDecrease(): boolean {
      return !!this.rawAudio && this.volumeIndex > 0;
    },

    canPlay(): boolean {
      return !!(this.rawAudio && this.selected.value);
    },
    isPlaying(): boolean {
      return this.canPlay ? this.rawPlaying : false;
    },
    playingName(): string | null {
      return this.isPlaying ? this.selected.value : null;
    },
  },

  actions: {
    setSelected(item: ListItem<string>) {
      this.rawPlaying = false;
      this.rawAudio = item?.label || null;
    },

    setVolume(item: ListItem<number>) {
      this.setVolumeIndex(VOLUME_LIST.indexOf(item));
    },

    setVolumeIndex(index: number) {
      this.rawAudioVolume = validVolumeIndex(index, null);
    },

    volumeIncrease() {
      if (this.volumeCanIncrease) {
        this.setVolumeIndex(this.volumeIndex + 1);
      }
    },
    volumeDecrease() {
      if (this.volumeCanDecrease) {
        this.setVolumeIndex(this.volumeIndex - 1);
      }
    },

    setPlaying(value: boolean) {
      if (this.canPlay) {
        this.rawPlaying = value;
      } else if (this.rawPlaying) {
        this.rawPlaying = false;
      }
    },

    togglePlaying() {
      this.setPlaying(!this.rawPlaying);
    },

    enable() {
      this.rawPlaying = false;
      this.rawAudio = this.selected.label;
    },

    disable() {
      this.rawPlaying = false;
      this.rawAudio = null;
      this.rawAudioVolume = null;
    },
  },
});

// Helper function to create ListItem objects.
function item<T>(label: string, value: T): ListItem<T> {
  return new ListItem(label, value);
}

function validVolumeIndex<T>(index: unknown, defaultValue: T): number | T {
  return typeof index !== 'number' ||
    Number.isNaN(index) ||
    index < 0 ||
    index >= VOLUME_LIST.length
    ? defaultValue
    : index;
}
