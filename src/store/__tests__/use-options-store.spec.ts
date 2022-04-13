import { flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useOptionsStore, useSelectedEntriesStore } from '@/store';

describe('useOptionsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  describe('listSelectEnabled', () => {
    describe('state', () => {
      it('should be null by default', async () => {
        const options = useOptionsStore();

        await flushPromises();
        expect(options.rawListSelectEnabled).toBe(null);
        expect(window.localStorage.getItem('listSelectEnabled')).toBe(null);
      });

      it('should be toggle able', async () => {
        const options = useOptionsStore();
        options.rawListSelectEnabled = true;

        await flushPromises();
        expect(options.rawListSelectEnabled).toBe(true);
        expect(window.localStorage.getItem('listSelectEnabled')).toBe('true');
      });

      it('should be loaded from localStorage', async () => {
        window.localStorage.setItem('listSelectEnabled', 'true');
        const options = useOptionsStore();

        await flushPromises();
        expect(options.rawListSelectEnabled).toBe(true);
      });
    });

    describe('getters', () => {
      it('should be false by default', async () => {
        const options = useOptionsStore();

        await flushPromises();
        expect(options.isListSelectEnabled).toBe(false);
      });

      it('should be toggle able', async () => {
        const options = useOptionsStore();
        options.rawListSelectEnabled = true;

        await flushPromises();
        expect(options.isListSelectEnabled).toBe(true);
      });
    });

    describe('actions', () => {
      it('should toggle the value', async () => {
        const options = useOptionsStore();

        options.toggleListSelectEnabled();

        await flushPromises();
        expect(options.rawListSelectEnabled).toBe(true);

        options.toggleListSelectEnabled();

        await flushPromises();
        expect(options.rawListSelectEnabled).toBe(null);
      });
    });
  });

  describe('disableCallback', () => {
    describe('listSelectEnabled', () => {
      it('should reset selectedEntries', async () => {
        const options = useOptionsStore();
        const selectedEntries = useSelectedEntriesStore();

        await flushPromises();
        expect(options.rawListSelectEnabled).toBe(null);
        expect(selectedEntries.rawDeselectedEntries).toBe(null);

        options.rawListSelectEnabled = true;
        selectedEntries.rawDeselectedEntries = ['aaa', 'bbb'];

        await flushPromises();

        options.rawListSelectEnabled = null;

        await flushPromises();
        expect(options.rawListSelectEnabled).toBe(null);
        expect(selectedEntries.rawDeselectedEntries).toBe(null);
      });
    });
  });
});
