import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Tooltip
} from 'antd';
import { Icon } from 'react-fa';
import isFunction from 'lodash/isFunction.js';

import './ToggleButton.less';

import { CSS_PREFIX } from '../../constants';
import { isEqual } from 'lodash';
/**
 * The ToggleButton.
 *
 * @class The ToggleButton
 * @extends React.Component
 */
class ToggleButton extends React.Component {

  /**
   * The className added to this component.
   * @type {String}
   * @private
   */
  className = `${CSS_PREFIX}togglebutton`

  /**
   * The class to apply for a toggled/pressed button.
   * @type {String}
   */
  pressedClass = 'btn-pressed';

  /**
   * The properties.
   * @type {Object}
   */
  static propTypes = {
    name: PropTypes.string,
    icon: PropTypes.string,
    pressedIcon: PropTypes.string,
    fontIcon: PropTypes.string,
    pressed: PropTypes.bool,
    onToggle: PropTypes.func,
    tooltip: PropTypes.string,
    tooltipPlacement: PropTypes.string,
    className: PropTypes.string
  };

  /**
   * The default properties.
   * @type {Object}
   */
  static defaultProps = {
    type: 'primary',
    icon: '',
    checked: false
  }

  /**
   * The context types.
   * @type {Object}
   */
  static contextTypes = {
    toggleGroup: PropTypes.object
  };
  /**
   * Invoked right before calling the render method, both on the initial mount
   * and on subsequent updates. It should return an object to update the state,
   * or null to update nothing.
   * @param {Object} nextProps The next properties.
   * @param {Object} prevState The previous state.
   */


  /**
   * Creates the ToggleButton.
   *
   * @constructs ToggleButton
   */
  constructor(props) {
    super(props);

    // Instantiate the state.
    // components state
    this.state = {
      checked: props.checked || false,
      lastClickEvt: null,
      overallPressed: props.pressed,
      isClicked: false
    };
  }

  /**
   * We will handle the initial state of the button here.
   * If it is pressed, we will have to call its `onToggle`
   * method, if it exists, in order to reflect the initial
   * state correctly (e.g. activating ol.Controls)
   */
  componentDidMount() {
    if (this.props.onToggle && this.props.checked === true) {
      this.props.onToggle(true, null);
    }
  }

  /**
   * Invoked immediately after updating occurs. This method is not called
   * for the initial render.
   * @method
   */
  componentDidUpdate(prevProps, prevState) {
    const {
      onToggle
    } = this.props;

    const {
      pressed,
      lastClickEvt,
      overallPressed,
      isClicked
    } = this.state;

    /**
     * the following is performed here as a hack to keep track of the pressed changes.
     *
     * check if the button has been clicked
     * |__ YES: ==> toggle the button
     * |
     * |__ NO: check if the prop has changed
     *        |__ YES: ==> Toggle the button
     *        |__ NO: check if previous update action was a click
     *                |__ YES: ==> run the Toggle function fo the prop value
     */

    if (this.props && prevProps
      && !isEqual(this.props,prevProps)
      && this.props.checked !== prevProps.checked) {
      console.log('-----update MEEEE')
      this.onClick(null);
    }
  }

  /**
   * Called on click.
   *
   * @param {ClickEvent} evt The ClickEvent.
   * @method
   */
  onClick = (evt) => {
    this.setState({
      checked: !this.state.checked
    },() => {
      if (this.props.onToggle)   this.props.onToggle(this.state.checked,evt)
    });
  }

  /**
   * The render function.
   */
  render() {
    const {
      className,
      name,
      icon,
      pressedIcon,
      fontIcon,
      pressed,
      onToggle,
      tooltip,
      checked,
      tooltipPlacement,
      ...antBtnProps
    } = this.props;

    const {
      onClick,
      ...filteredAntBtnProps
    } = antBtnProps;

    const finalClassName = className
      ? `${className} ${this.className}`
      : this.className;

    let iconName = icon;
    let pressedClass = '';
    const finalButtonName = 'button'
    if (this.state.checked) {
      iconName = pressedIcon || icon;
    }
    return (
      // <Button>
      <label>
          <input
            onChange={ this.onClick}
            name={finalButtonName}
            type={'checkbox'}
            checked={this.state.checked || false}
          />

          <div
            className={`button `}
          >
                 {/* {antBtnProps.children} */}
            <Icon
              name={iconName}
              className={fontIcon}
            />
          </div>

        </label>
    );
  }
}

export default ToggleButton;