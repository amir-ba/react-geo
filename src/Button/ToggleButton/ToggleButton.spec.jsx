/*eslint-env jest*/

import TestUtil from '../../Util/TestUtil';

import {
  ToggleButton
} from '../../index';

describe('<ToggleButton />', () => {

  it('is defined', () => {
    expect(ToggleButton).not.toBeUndefined();
  });

  it('can be rendered', () => {
    const wrapper = TestUtil.mountComponent(ToggleButton);
    expect(wrapper).not.toBeUndefined();
  });

  it('isn\'t pressed by default', () => {
    const wrapper = TestUtil.mountComponent(ToggleButton);
    const pressedClass = wrapper.instance().pressedClass;
    expect(wrapper.find({ type: 'checkbox' }).props().checked).toBe(false);
  });

  it('sets the pressed class if pressed prop is set to true initially', () => {
    const wrapper = TestUtil.mountComponent(ToggleButton, {
      checked: true
    });
    const pressedClass = wrapper.find({ type: 'checkbox' }).props().checked;

    expect(pressedClass).toBe(true);
  });

  it('ignores the onClick callback', () => {
    const onClick = jest.fn();
    const wrapper = TestUtil.mountComponent(ToggleButton, {
      onClick
    });

    wrapper.find('input').simulate('change');

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('#1 toggles the pressed class if the pressed prop has changed', () => {
    const wrapper = TestUtil.mountComponent(ToggleButton);
    const pressedClass =  wrapper.find({ type: 'checkbox' }).props().checked;

    expect(pressedClass).toBe(false);

    wrapper.setProps({
      checked: true
    });

    expect(wrapper.state('checked')).toBe(true);

    // Nothing should happen if the prop hasn't changed.
    wrapper.setProps({
      checked: true
    });
    expect(wrapper.state('checked')).toBe(true);

    wrapper.setProps({
      checked: false
    });
    expect((wrapper.update().find({ type: 'checkbox' }).props().checked)).toBe(false);
  });

  it('#2 calls the given toggle callback method if the pressed prop has changed initially to true', () => {
    const onToggle = jest.fn();
    const props = {
      onToggle,
      checked: true

    };
    const wrapper = TestUtil.mountComponent(ToggleButton, props);
    expect(onToggle).toHaveBeenCalledTimes(1);

    wrapper.setProps({
      checked: true
    });
    expect(onToggle).toHaveBeenCalledTimes(1);
    // If the prop has been changed, no click evt is available.
    expect(onToggle).toHaveBeenCalledWith(true, null);

    wrapper.setProps({
      checked: false
    });
    expect(onToggle).toHaveBeenCalledTimes(2);
    expect(onToggle).toHaveBeenCalledWith(false, null);

    // Nothing should happen if the prop hasn't changed.
    wrapper.setProps({
      checked: false
    });
    expect(onToggle).toHaveBeenCalledTimes(2);
    expect(onToggle).toHaveBeenCalledWith(false, null);

    wrapper.setProps({
      checked: true
    });
    expect(onToggle).toHaveBeenCalledTimes(3);
    expect(onToggle).toHaveBeenCalledWith(true, null);
  });

  it('#3 calls the given toggle callback method if the pressed prop has changed to false (from being false by default)', () => {
    const onToggle = jest.fn();
    const props = {
      onToggle
    };
    const wrapper = TestUtil.mountComponent(ToggleButton, props);

    // Nothing should happen if the prop hasn't changed.
    // (pressed property is false by default)
    wrapper.setProps({
      checked: false
    });
    expect(onToggle).toHaveBeenCalledTimes(0);

    wrapper.setProps({
      checked: true
    });
    expect(onToggle).toHaveBeenCalledTimes(1);
    // If the prop has been changed, no click evt is available.
    expect(onToggle).toHaveBeenCalledWith(true, null);

    // Nothing should happen if the prop hasn't changed.
    wrapper.setProps({
      checked: true
    });
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(true, null);

    wrapper.setProps({
      checked: false
    });
    expect(onToggle).toHaveBeenCalledTimes(2);
    expect(onToggle).toHaveBeenCalledWith(false, null);
  });

  it('#4 cleans the last click event if not available', () => {
    const onToggle = jest.fn();
    const props = {
      onToggle
    };
    const clickEvtMock = expect.objectContaining({
      type: 'change'
    });
    const wrapper = TestUtil.mountComponent(ToggleButton, props);

    wrapper.setProps({
      checked: true
    });
    expect(onToggle).toHaveBeenCalledTimes(1);
    // If the prop has been changed, no click evt is available.
    expect(onToggle).toHaveBeenCalledWith(true, null);

    // Pressed will now become false.
    (wrapper.update().find({ type: 'checkbox' })).simulate('change');
    expect(onToggle).toHaveBeenCalledTimes(2);
    expect(onToggle).toHaveBeenCalledWith(false, clickEvtMock);

    wrapper.setProps({
      checked: true
    });
    // If the prop has been changed, no click evt is available.
    expect(onToggle).toHaveBeenCalledTimes(3);
    expect(onToggle).toHaveBeenCalledWith(true, null);

  });

  it('#5 toggles the pressed class on click', () => {
    const wrapper = TestUtil.mountComponent(ToggleButton);
    const pressedClass = wrapper.instance().pressedClass;

    expect(wrapper.update().find({ type: 'checkbox' }).props().checked).toBe(false);

    (wrapper.update().find({ type: 'checkbox' })).simulate('change');
    expect(wrapper.update().find({ type: 'checkbox' }).props().checked).toBe(true);

    (wrapper.update().find({ type: 'checkbox' })).simulate('change');
    expect(wrapper.update().find({ type: 'checkbox' }).props().checked).toBe(false);

    (wrapper.update().find({ type: 'checkbox' })).simulate('change');
    expect(wrapper.update().find({ type: 'checkbox' }).props().checked).toBe(true);
  });

  it('#6 calls the given toggle callback method on click', () => {
    const onToggle = jest.fn();
    const props = {
      onToggle
    };
    const clickEvtMock = expect.objectContaining({
      type: 'change'
    });
    const wrapper = TestUtil.mountComponent(ToggleButton, props);

    (wrapper.update().find({ type: 'checkbox' })).simulate('change');
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(true, clickEvtMock);

    (wrapper.update().find({ type: 'checkbox' })).simulate('change');
    expect(onToggle).toHaveBeenCalledTimes(2);
    expect(onToggle).toHaveBeenCalledWith(false, clickEvtMock);

    (wrapper.update().find({ type: 'checkbox' })).simulate('change');
    expect(onToggle).toHaveBeenCalledTimes(3);
    expect(onToggle).toHaveBeenCalledWith(true, clickEvtMock);
  });

  it('toggles the pressed state of the component on click', () => {
    const wrapper = TestUtil.mountComponent(ToggleButton);

    (wrapper.update().find({ type: 'checkbox' })).simulate('change');
    expect(wrapper.state('checked')).toBe(true);

    (wrapper.update().find({ type: 'checkbox' })).simulate('change');
    expect(wrapper.state('checked')).toBe(false);

    (wrapper.update().find({ type: 'checkbox' })).simulate('change');
    expect(wrapper.state('checked')).toBe(true);
  });
});
