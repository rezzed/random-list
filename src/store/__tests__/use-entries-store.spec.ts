import { watch } from 'vue';
import { flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useEntriesStore } from '@/store';
import { arrayToHash } from '@/utils/array-to-hash';

describe('useEntriesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('getters', () => {
    describe('asInput', () => {
      it('should return the list as string with newlines', () => {
        const entries = useEntriesStore();
        entries.list = ['bar', 'baz', 'foo'];

        expect(entries.asInput).toBe('bar\nbaz\nfoo');
      });

      it('should be reactive', async () => {
        const watcher = vi.fn();

        const entries = useEntriesStore();
        entries.list = ['bar', 'baz'];

        watch(() => entries.asInput, watcher);

        entries.list.push('foo');

        await flushPromises();

        expect(watcher).toHaveBeenCalled();
        expect(entries.asInput).toBe('bar\nbaz\nfoo');
      });
    });

    describe('count', () => {
      it('should return the number of entries', () => {
        const entries = useEntriesStore();
        entries.list = ['bar', 'baz', 'foo'];

        expect(entries.count).toBe(3);
      });

      it('should be reactive', async () => {
        const watcher = vi.fn();

        const entries = useEntriesStore();
        entries.list = ['bar', 'baz'];

        watch(() => entries.count, watcher);

        entries.list.push('foo');

        await flushPromises();

        expect(watcher).toHaveBeenCalled();
        expect(entries.count).toBe(3);
      });
    });

    describe('isEmpty', () => {
      it('should be empty', async () => {
        const entries = useEntriesStore();
        entries.list = [];

        expect(entries.isEmpty).toBe(true);
      });

      it('should not be empty', async () => {
        const entries = useEntriesStore();
        entries.list = ['foo'];

        expect(entries.isEmpty).toBe(false);
      });

      it('should be reactive', async () => {
        const watcher = vi.fn();

        const entries = useEntriesStore();
        entries.list = [];

        watch(() => entries.isEmpty, watcher);

        entries.list.push('foo');

        await flushPromises();

        expect(watcher).toHaveBeenCalledWith(false, true, expect.any(Function));
      });
    });
  });

  describe('actions', () => {
    describe('fromHash', () => {
      it('should create a list from a hash', () => {
        const entries = useEntriesStore();
        const list = ['bar', 'baz', 'foo'];
        const hash = arrayToHash(list);

        entries.fromHash(hash);

        expect(entries.hash).toBe(hash);
        expect(entries.list).toStrictEqual(list);

        expect(entries.error.isInvalidHash).toBe(false);
        expect(entries.error.isHashTooLong).toBe(false);
      });

      it('should flag an error if the hash is invalid', () => {
        const entries = useEntriesStore();
        const hash = '#invalid';

        entries.fromHash(hash);

        expect(entries.hash).toBe('');
        expect(entries.list).toStrictEqual([]);

        expect(entries.error.isInvalidHash).toBe(true);
        expect(entries.error.isHashTooLong).toBe(false);
      });

      it('should only clear isInvalidHash if the hash is ok', () => {
        const entries = useEntriesStore();
        const list = ['bar', 'baz', 'foo'];
        const hash = arrayToHash(list);

        entries.error.isInvalidHash = true;
        entries.error.isHashTooLong = true;

        entries.fromHash(hash);

        expect(entries.hash).toBe(hash);
        expect(entries.list).toStrictEqual(list);

        expect(entries.error.isInvalidHash).toBe(false);
        expect(entries.error.isHashTooLong).toBe(true);
      });
    });

    describe('fromInput', () => {
      it('should create a list, and a hash from user input', () => {
        const entries = useEntriesStore();
        const input = 'bar\nbaz\nfoo';
        const list = ['bar', 'baz', 'foo'];
        const hash = arrayToHash(list);

        entries.fromInput(input);

        expect(entries.hash).toBe(hash);
        expect(entries.list).toStrictEqual(list);

        expect(entries.error.isInvalidHash).toBe(false);
        expect(entries.error.isHashTooLong).toBe(false);
      });

      it('should sort the input', () => {
        const entries = useEntriesStore();
        const input = 'foo\nbaz\nbar';
        const list = ['bar', 'baz', 'foo'];

        entries.fromInput(input);

        expect(entries.list).toStrictEqual(list);
      });

      it('should flag an error if the created hash is too long.', () => {
        const entries = useEntriesStore();
        const input = [...Array(100)].map((_, i) => 'some long string' + i).join('\n');

        entries.fromInput(input);

        expect(entries.hash).toBe('');
        expect(entries.list).toStrictEqual([]);

        expect(entries.error.isInvalidHash).toBe(false);
        expect(entries.error.isHashTooLong).toBe(true);
      });

      it('should only clear isHashTooLong if the created hash is ok', () => {
        const entries = useEntriesStore();
        const input = 'bar\nbaz\nfoo';
        const list = ['bar', 'baz', 'foo'];
        const hash = arrayToHash(list);

        entries.error.isInvalidHash = true;
        entries.error.isHashTooLong = true;

        entries.fromInput(input);

        expect(entries.hash).toBe(hash);
        expect(entries.list).toStrictEqual(list);

        expect(entries.error.isInvalidHash).toBe(true);
        expect(entries.error.isHashTooLong).toBe(false);
      });
    });
  });
});
