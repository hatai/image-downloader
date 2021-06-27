import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '@mdi/react';
import {
  mdiCheckboxBlankOutline,
  mdiCheckboxMarkedOutline,
  mdiMinusBoxOutline
} from '@mdi/js';
import color from '../../utils/colors';

const Container = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const Checkbox = ({ checked, indeterminate, size, color, onClick }) => {
  let icon = mdiCheckboxBlankOutline;
  if (indeterminate) {
    icon = mdiMinusBoxOutline;
  }

  if (checked) {
    icon = mdiCheckboxMarkedOutline;
  }

  return (
    <Container onClick={onClick}>
      <Icon path={icon} color={color} size={size} />
    </Container>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  size: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
};

Checkbox.defaultProps = {
  checked: false,
  indeterminate: false,
  size: '22px',
  color: color.orionGreen,
  onClick: () => {}
};

export default Checkbox;
