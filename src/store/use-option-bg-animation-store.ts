import { defineStore } from 'pinia';
import { StorageSerializers, useStorage } from '@vueuse/core';

/**
 * An animation setting with all possible option values
 */
class AnimationSetting {
  constructor(readonly label: string, readonly options: string[], readonly defaultOption: string) {}
}

/**
 * The animation itself
 */
class Animation {
  constructor(
    readonly label: string,
    readonly comp: string = '',
    readonly variation: string = '',
    readonly possibleSettings: AnimationSetting[] = [],
  ) {}
}

// ------------------------------------

// Possible animation settings
const SETTING_SPEED = new AnimationSetting('Speed', ['slow', 'normal', 'fast'], 'normal');
const SETTING_COLOR = new AnimationSetting('Color', ['theme', 'rainbow', 'random'], 'theme');

// ------------------------------------

const ANIM_LIST = [
  // All labels must be unique.
  // The first entry is used as default.
  anim('[ none ]'),
  anim('Fading background', 'SimpleAnimation', 'fade', SETTING_COLOR, SETTING_SPEED),
  anim('Blinking background', 'SimpleAnimation', 'blink', SETTING_COLOR, SETTING_SPEED),
];

const ANIM_MAP = new Map(ANIM_LIST.map((animation) => [animation.label, animation]));

// ------------------------------------

export const useOptionBgAnimationStore = defineStore('optionBgAnimation', {
  state: () => ({
    // The label of the animation is stored as key.
    rawBgAnimation: useStorage<string | null>('bgAnimation', null, undefined, {
      serializer: {
        read: (raw: string) => (ANIM_MAP.has(raw) ? raw : ANIM_LIST[0].label),
        write: (value: string) => value,
      },
    }),
    // The settings are re-set if the animation key is changed.
    rawBgAnimationSettings: useStorage<Record<string, string> | null>(
      'bgAnimationSettings',
      null,
      undefined,
      {
        serializer: StorageSerializers.object,
      },
    ),
    // A boolean flag to indicate the playing state.
    rawPlaying: false,
  }),

  getters: {
    list: () => ANIM_LIST,
    selected: (state) =>
      (state.rawBgAnimation && ANIM_MAP.get(state.rawBgAnimation)) || ANIM_LIST[0],

    hasPossibleSettings(): boolean {
      return this.selected.possibleSettings.length > 0;
    },
    defaultSettings(): Record<string, string> {
      return Object.fromEntries(
        this.selected.possibleSettings.map(({ label, defaultOption }) => [label, defaultOption]),
      );
    },
    selectedSettings(): Record<string, string> {
      return this.rawBgAnimationSettings || this.defaultSettings;
    },

    canPlay(): boolean {
      return !!(this.rawBgAnimation && this.selected.comp);
    },
    isPlaying(): boolean {
      return this.canPlay ? this.rawPlaying : false;
    },
    playingComp(): string | null {
      return this.isPlaying ? `bg-animation/${this.selected.comp}` : null;
    },
  },

  actions: {
    setSelected(animation: Animation) {
      this.disable();
      this.rawBgAnimation = animation?.label || null;
    },

    setSetting(key: string, value: string) {
      this.rawPlaying = false;
      // Make sure to make a copy of the default object and work from there.
      const settings = this.rawBgAnimationSettings || { ...this.defaultSettings };
      settings[key] = value;
      this.rawBgAnimationSettings = settings;
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
      this.rawBgAnimation = this.selected.label;
    },

    disable() {
      this.rawPlaying = false;
      this.rawBgAnimation = null;
      this.rawBgAnimationSettings = null;
    },
  },
});

// Helper function to create animation objects.
function anim(
  label: string,
  comp?: string,
  variation?: string,
  ...possibleSettings: AnimationSetting[]
): Animation {
  return new Animation(label, comp, variation, possibleSettings);
}
