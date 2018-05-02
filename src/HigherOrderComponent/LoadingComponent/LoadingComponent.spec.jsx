/*eslint-env jest*/
import React from 'react';


import TestUtil from '../../Util/TestUtil';

import { LoadingComponent } from '../../index';

describe('LoadingComponent', () => {
  let EnhancedComponent;

  /* eslint-disable require-jsdoc */
  class MockComponent extends React.Component {
    render() {
      return (
        <div>A mock Component</div>
      );
    }
  }
  /* eslint-enable require-jsdoc */

  beforeEach(() => {
    EnhancedComponent =  LoadingComponent(MockComponent, {
      withRef: true
    });
  });

  describe('Basics', () => {
    it('is defined', () => {
      expect(LoadingComponent).not.toBeUndefined();
    });

    it('can be rendered', () => {
      const wrapper = TestUtil.mountComponent(EnhancedComponent);

      expect(wrapper).not.toBeUndefined();
      expect(wrapper.first().is(EnhancedComponent)).toBe(true);
    });

    it('passes through all props except Spin props', () => {
      const props = {
        someProp: '09',
        otherProp: 'ppp',
        spinning: false
      };
      const expectedProps = {
        someProp: '09',
        otherProp: 'ppp'
      };
      const wrapper = TestUtil.mountComponent(EnhancedComponent, props);
      console.log(wrapper);
      const wrappedInstance = wrapper.instance().getWrappedInstance();

      expect(wrappedInstance.props).toEqual(expectedProps);
    });

    it('saves a reference to the wrapped instance if requested', () => {
      const props = {
        name: 'shinjiKagawaModule',
        activeModules: [{
          name: 'shinjiKagawaModule'
        }]
      };
      const wrapper = TestUtil.mountComponent(EnhancedComponent, props);
      const wrappedInstance = wrapper.instance().getWrappedInstance();

      expect(wrappedInstance).toBeInstanceOf(MockComponent);

      const EnhancedComponentNoRef = LoadingComponent(MockComponent, {
        withRef: false
      });

      const wrapperNoRef = TestUtil.mountComponent(EnhancedComponentNoRef, props);
      const wrappedInstanceNoRef = wrapperNoRef.instance().getWrappedInstance();

      expect(wrappedInstanceNoRef).toBeUndefined();
    });

    it('shows or hides the Loading component based on the spinning prop', () => {
      let wrapper = TestUtil.mountComponent(EnhancedComponent);

      // 1. show loading sign
      wrapper = TestUtil.mountComponent(EnhancedComponent, {
        spinning: false
      });
      expect(wrapper.find('.ant-spin').length).toBe(0);

      // 2. don't show loading sign
      wrapper = TestUtil.mountComponent(EnhancedComponent, {
        spinning: true
      });
      expect(wrapper.find('.ant-spin').length).toBe(1);
    });
  });
});
