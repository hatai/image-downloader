import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/colors';

const ProgressBar = styled.div`
  width: ${props => props.width}vw;
  height: 2px;
  background: ${colors.orionGreen};
  padding: 0;
  margin: 0;
  position: absolute;
  bottom: 0;
`;

const Progressbar = ({ width }) => {
  let className = '';
  if (width >= 100) {
    className = 'animated fadeOut delay-2s';
  }

  return <ProgressBar className={className} width={width} />;
};

Progressbar.propTypes = {
  width: PropTypes.number.isRequired
};

export default Progressbar;
