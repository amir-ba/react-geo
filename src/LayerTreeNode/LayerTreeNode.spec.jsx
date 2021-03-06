/*eslint-env jest*/
import { LayerTreeNode } from '../index';
import TestUtil from '../Util/TestUtil';
import PropTypes from 'prop-types';

describe('<LayerTreeNode />', () => {

  const defaultProps = {
    inResolutionRange: true,
    filterTreeNode: ftn => ftn
  };

  it('is defined', () => {
    expect(LayerTreeNode).not.toBeUndefined();
  });

  it('can be rendered', () => {
    const wrapper = TestUtil.mountComponent(LayerTreeNode, defaultProps, {
      context: {
        rcTree: {
          prefixCls: ''
        }
      },
      childContextTypes: {
        rcTree: PropTypes.object
      }
    });
    expect(wrapper).not.toBeUndefined();
  });
});
