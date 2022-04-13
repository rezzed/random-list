import { mount } from '@vue/test-utils';
import SvgIcon from '@/components/SvgIcon.vue';
import { svgIconPathMap } from '@/components/SvgIconPathName';

describe('SvgIcon.vue', () => {
  it('should render the SVG path', () => {
    const wrapper = mount(SvgIcon, {
      props: { name: 'mdiShuffleVariant' },
    });
    expect(wrapper.html()).toContain(svgIconPathMap.mdiShuffleVariant);
  });

  it('should be reactive', async () => {
    const wrapper = mount(SvgIcon, {
      props: { name: 'mdiShuffleVariant' },
    });
    expect(wrapper.html()).toContain(svgIconPathMap.mdiShuffleVariant);

    await wrapper.setProps({ name: 'mdiCheckboxMarkedCircleOutline' });

    expect(wrapper.html()).not.toContain(svgIconPathMap.mdiShuffleVariant);
    expect(wrapper.html()).toContain(svgIconPathMap.mdiCheckboxMarkedCircleOutline);
  });
});
