import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiMenuDown } from '@mdi/js';
import color from '../../utils/colors';

const Container = styled.div`
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Content = styled.div`
  display: inline-flex;
  position: relative;
  white-space: nowrap;
  z-index: 100;
`;

const StyledDiv = styled.div`
  display: block;
  color: ${color.coolGrey};
  white-space: nowrap;
  user-select: none;

  *,
  :after,
  :before {
    box-sizing: inherit;
  }
`;

const DropDownWrapper = styled(StyledDiv)`
  margin: auto;
  position: relative;
`;

const DropDownTitle = styled(StyledDiv)`
  font-weight: 600;
  letter-spacing: 1.5px;
  text-align: right;
  cursor: pointer;
  display: inline;
`;

const DropDownIcon = styled(Icon)`
  margin-left: 5px;
  display: inline;
  vertical-align: middle;
`;

const DropDownMenu = styled(StyledDiv)`
  display: ${props => (props.show ? 'inherit' : 'none')};
  box-sizing: border-box;
  position: absolute;
  top: 100%;
  right: -18px;
  margin-top: -1px;
  padding-top: 10px;
  z-index: 1000;
`;

const DropDownTriangle = styled(StyledDiv)`
  display: inline-block;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid ${color.dropDown};
  position: absolute;
  top: 1px;
  right: 24px;
`;

const DropDownList = styled(StyledDiv)`
  border-radius: 6px;
  background-color: ${color.dropDown};
  box-shadow: 0 9px 25px 0 rgba(0, 0, 0, 0.78);
  padding-top: 5px;
  padding-bottom: 13px;
  overflow-scrolling: touch;
  overflow-y: auto;
`;

const DropDownOption = styled(StyledDiv)`
  box-sizing: border-box;
  cursor: pointer;
  line-height: 2.14;
  letter-spacing: 1px;
  width: auto;
  padding-left: 18px;
  padding-right: 26px;
  text-align: left;
  color: ${props => (props.active ? color.paleGrey2 : color.coolGrey)};

  :hover {
    background-color: hsla(0, 0%, 80%, 0.29);
  }
`;

const DropDown = ({ options, active, onClick }) => {
  const [show, setShow] = useState(false);

  return (
    <Container>
      <Content>
        <DropDownWrapper>
          <DropDownTitle onClick={() => setShow(!show)}>
            <span>{active}</span>
            <span>
              <DropDownIcon
                path={mdiMenuDown}
                size={'2em'}
                color={color.coolGrey}
              />
            </span>
          </DropDownTitle>

          <DropDownMenu show={show}>
            <DropDownTriangle />

            <DropDownList>
              {options.map((option, i) => (
                <DropDownOption
                  key={i}
                  active={option === active}
                  onClick={() => {
                    setShow(false);
                    onClick(option, i);
                  }}
                >
                  {option}
                </DropDownOption>
              ))}
            </DropDownList>
          </DropDownMenu>
        </DropDownWrapper>
      </Content>
    </Container>
  );
};

DropDown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  active: PropTypes.string,
  onClick: PropTypes.func
};

DropDown.defaultProps = {
  options: ['NEWEST', 'POPULAR', 'RANDOM'],
  active: 'NEWEST',
  onClick: () => {}
};

export default DropDown;
