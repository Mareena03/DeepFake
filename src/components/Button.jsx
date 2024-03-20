/* eslint-disable react/prop-types */

import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  color: ${({ textColor }) => textColor || 'white'}; 
  border: none;
  cursor: pointer;
`;

const Button = ({ children, bgColor, onClick,textColor}) => {
  return (
    <StyledButton bgColor={bgColor} onClick={onClick} textColor={textColor}>
      {children}
    </StyledButton>
  );
};


export default Button;
