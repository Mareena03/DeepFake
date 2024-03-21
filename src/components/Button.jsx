/* eslint-disable react/prop-types */

import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ bgcolor }) => bgcolor || 'transparent'};
  color: ${({ textColor }) => textColor || 'white'}; 
  border: none;
  cursor: pointer;
`;

const Button = ({ children, bgcolor, onClick,textColor}) => {
  return (
    <StyledButton bgcolor={bgcolor} onClick={onClick} textColor={textColor}>
      {children}
    </StyledButton>
  );
};


export default Button;
