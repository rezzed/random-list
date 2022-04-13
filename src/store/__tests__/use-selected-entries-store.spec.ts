import { watch } from 'vue';
import { flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useEntriesStore, useSelectedEntriesStore } from '@/store';

describe('useSelectedEntriesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('getters', () => {
    describe('selected', () => {
      it('should return all entries if nothing was deselected', () => {
        const entries = useEntriesStore();
        entries.list = ['bar', 'baz', 'foo'];

        const selectedEntries = useSelectedEntriesStore();
        selectedEntries.rawDeselectedEntries = null;

        expect(selectedEntries.selected).toStrictEqual(['bar', 'baz', 'foo']);
      });

      it('should return only selected entries', () => {
        const entries = useEntriesStore();
        entries.list = ['bar', 'baz', 'foo'];

        const selectedEntries = useSelectedEntriesStore();
        selectedEntries.rawDeselectedEntries = ['baz'];

        expect(selectedEntries.selected).toStrictEqual(['bar', 'foo']);
      });

      it('should be reactive', async () => {
        const watcher = vi.fn();

        const entries = useEntriesStore();
        entries.list = ['bar', 'baz', 'foo'];

        const selectedEntries = useSelectedEntriesStore();
        selectedEntries.rawDeselectedEntries = ['baz'];

        watch(() => selectedEntries.selected, watcher);

        selectedEntries.rawDeselectedEntries.push('foo');

        await flushPromises();

        expect(watcher).toHaveBeenCalled();
        expect(selectedEntries.selected).toStrictEqual(['bar']);
      });
    });

    describe('count', () => {
      it('should return the number of all entries if nothing was deselected.', () => {
        const entries = useEntriesStore();
        entries.list = ['bar', 'baz', 'foo'];

        const selectedEntries = useSelectedEntriesStore();
        selectedEntries.rawDeselectedEntries = null;

        expect(selectedEntries.count).toBe(3);
      });

      it('should return only the number of selected entries', () => {
        const entries = useEntriesStore();
        entries.list = ['bar', 'baz', 'foo'];

        const selectedEntries = useSelectedEntriesStore();
        selectedEntries.rawDeselectedEntries = ['baz'];

        expect(selectedEntries.count).toBe(2);
      });

      it('should be reactive', async () => {
        const watcher = vi.fn();

        const entries = useEntriesStore();
        entries.list = ['bar', 'baz', 'foo'];

        const selectedEntries = useSelectedEntriesStore();
        selectedEntries.rawDeselectedEntries = ['baz'];

        watch(() => selectedEntries.count, watcher);

        selectedEntries.rawDeselectedEntries.push('foo');

        await flushPromises();

        expect(watcher).toHaveBeenCalled();
        expect(selectedEntries.count).toBe(1);
      });
    });

    describe('isEmpty', () => {
      it('should be empty', async () => {
        const entries = useEntriesStore();
        entries.list = [];

        const selectedEntries = useSelectedEntriesStore();
        selectedEntries.rawDeselectedEntries = null;

        expect(selectedEntries.isEmpty).toBe(true);
      });

      it('should be empty too', async () => {
        const entries = useEntriesStore();
        entries.list = ['foo', 'bar'];

        const selectedEntries = useSelectedEntriesStore();
        selectedEntries.rawDeselectedEntries = ['foo', 'bar'];

        expect(selectedEntries.isEmpty).toBe(true);
      });

      it('should not be empty', async () => {
        const entries = useEntriesStore();
        entries.list = ['foo', 'bar'];

        const selectedEntries = useSelectedEntriesStore();
        selectedEntries.rawDeselectedEntries = ['foo'];

        expect(selectedEntries.isEmpty).toBe(false);
      });

      it('should be reactive', async () => {
        const watcher = vi.fn();

        const entries = useEntriesStore();
        entries.list = ['foo', 'bar'];

        const selectedEntries = useSelectedEntriesStore();
        selectedEntries.rawDeselectedEntries = ['foo'];

        watch(() => selectedEntries.isEmpty, watcher);

        selectedEntries.rawDeselectedEntries.push('foo', 'bar');

        await flushPromises();

        expect(watcher).toHaveBeenCalledWith(true, false, expect.any(Function));
      });
    });
  });

  describe('actions', () => {
    describe('toggleEntry', () => {
      it('should be able to toggle an entry', async () => {
        const selectedEntries = useSelectedEntriesStore();
        const isEntrySelectedSpy = vi.spyOn(selectedEntries, 'isEntrySelected');
        const deselectEntrySpy = vi.spyOn(selectedEntries, 'deselectEntry');
        const selectEntrySpy = vi.spyOn(selectedEntries, 'selectEntry');

        isEntrySelectedSpy.mockReturnValueOnce(true);
        selectedEntries.toggleEntry('foo');

        // was selected -> deselect
        expect(isEntrySelectedSpy).toHaveBeenCalledWith('foo');
        expect(deselectEntrySpy).toHaveBeenCalledWith('foo');
        expect(selectEntrySpy).not.toHaveBeenCalled();

        isEntrySelectedSpy.mockReturnValueOnce(false);
        selectedEntries.toggleEntry('bar');

        // was deselected -> select
        expect(isEntrySelectedSpy).toHaveBeenCalledWith('bar');
        expect(selectEntrySpy).toHaveBeenCalledWith('bar');

        expect(deselectEntrySpy).toHaveBeenCalledOnce();
        expect(selectEntrySpy).toHaveBeenCalledOnce();
      });
    });

    describe('isEntrySelected', () => {
      // prettier-ignore
      // _name, input, initialList, initialRaw, expected
      const testCases: [string, string, string[], string[] | null, boolean][] = [
        ['be able to handle null entries', null as unknown as string, [], null, false],
        ['be able to handle unknown entries', 'bar', [], null, false],
        ['be true if no entry is deselected', 'bar', ['bar', 'baz', 'foo'], null, true],
        ['be true if input entry is not deselected', 'bar', ['bar', 'baz', 'foo'], ['baz', 'foo'], true],
        ['only be false if input entry is deselected', 'bar', ['bar', 'baz', 'foo'], ['bar'], false],
      ];

      it.each(testCases)('should %s', (_name, input, initialList, initialRaw, expected) => {
        const entries = useEntriesStore();
        entries.list = initialList;

        const selectedEntries = useSelectedEntriesStore();
        selectedEntries.rawDeselectedEntries = initialRaw;

        expect(selectedEntries.isEntrySelected(input)).toBe(expected);
      });
    });

    describe('selectEntry', () => {
      // prettier-ignore
      // _name, input, initialList, initialRaw, expected (= rawDeselectedEntries)
      const testCases: [string, string, string[], string[] | null, string[] | null][] = [
        ['be able to handle null entries', null as unknown as string, [], null, null],
        ['be able to handle invalid entries', 'bar', [], null, null],
        ['change nothing if there were no deselected entries', 'bar', ['bar', 'baz', 'foo'], null, null],
        ['set null if the last entry was removed', 'bar', ['bar', 'baz', 'foo'], ['bar'], null],
        ['select the given entry', 'bar', ['bar', 'baz', 'foo'], ['bar', 'baz'], ['baz']],
        ['change nothing if the entry was not deselected', 'bar', ['bar', 'baz', 'foo'], ['baz', 'foo'], ['baz', 'foo']],
        ['only select entries of the current list', 'bar', ['bar', 'foo'], ['baz'], ['baz']],
      ];

      it.each(testCases)('should %s', (_name, input, initialList, initialRaw, expected) => {
        const entries = useEntriesStore();
        entries.list = initialList;

        const selectedEntries = useSelectedEntriesStore();
        selectedEntries.rawDeselectedEntries = initialRaw;

        selectedEntries.selectEntry(input);

        expect(selectedEntries.rawDeselectedEntries).toStrictEqual(expected);
      });
    });

    describe('deselectEntry', () => {
      // prettier-ignore
      // _name, input, initialList, initialRaw, expected (= rawDeselectedEntries)
      const testCases: [string, string, string[], string[] | null, string[] | null][] = [
        ['be able to handle null entries', null as unknown as string, [], null, null],
        ['be able to handle invalid entries', 'bar', [], null, null],
        ['change nothing if there were no selected entries', 'bar', ['bar', 'baz', 'foo'], ['bar', 'baz', 'foo'], ['bar', 'baz', 'foo']],
        ['deselect the given entry', 'bar', ['bar', 'baz', 'foo'], ['baz', 'foo'], ['baz', 'foo', 'bar']],
        ['change null to array if the first item was deselected', 'bar', ['bar', 'baz', 'foo'], null, ['bar']],
        ['only deselect entries of the current list', 'bar', ['bar', 'foo'], ['baz', 'foo'], ['baz', 'foo', 'bar']],
      ];

      it.each(testCases)('should %s', (_name, input, initialList, initialRaw, expected) => {
        const entries = useEntriesStore();
        entries.list = initialList;

        const selectedEntries = useSelectedEntriesStore();
        selectedEntries.rawDeselectedEntries = initialRaw;

        selectedEntries.deselectEntry(input);

        expect(selectedEntries.rawDeselectedEntries).toStrictEqual(expected);
      });
    });

    describe('selectAllEntries', () => {
      // prettier-ignore
      // _name, initialList, initialRaw, expected (= rawDeselectedEntries)
      const testCases: [string, string[], string[] | null, string[] | null][] = [
        ['not change for an empty list', [], null, null],
        ['change nothing if there were no deselected entries', ['bar', 'baz', 'foo'], null, null],
        ['set null if the last entry was removed', ['bar', 'baz', 'foo'], ['bar'], null],
        ['only select entries of the current list', ['bar', 'foo'], ['bar', 'baz'], ['baz']],
      ];

      it.each(testCases)('should %s', (_name, initialList, initialRaw, expected) => {
        const entries = useEntriesStore();
        entries.list = initialList;

        const selectedEntries = useSelectedEntriesStore();
        selectedEntries.rawDeselectedEntries = initialRaw;

        selectedEntries.selectAllEntries();

        expect(selectedEntries.rawDeselectedEntries).toStrictEqual(expected);
      });
    });

    describe('deselectAllEntries', () => {
      // prettier-ignore
      // _name, initialList, initialRaw, expected (= rawDeselectedEntries)
      const testCases: [string, string[], string[] | null, string[] | null][] = [
        ['deselect an empty list', [], null, []],
        ['deselect a complete list', ['bar', 'baz', 'foo'], null, ['bar', 'baz', 'foo']],
        ['deselect a partial list', ['bar', 'baz', 'foo'], ['bar'], ['bar', 'baz', 'foo']],
        ['only deselect entries of the current list', ['bar', 'foo'], ['bar', 'baz'], ['bar', 'baz', 'foo']],
      ];

      it.each(testCases)('should %s', (_name, initialList, initialRaw, expected) => {
        const entries = useEntriesStore();
        entries.list = initialList;

        const selectedEntries = useSelectedEntriesStore();
        selectedEntries.rawDeselectedEntries = initialRaw;

        selectedEntries.deselectAllEntries();

        expect(selectedEntries.rawDeselectedEntries).toStrictEqual(expected);
      });
    });
  });
});
