/* eslint-disable react/prop-types */

import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ bgcolor }) => bgcolor || 'transparent'};
  color: ${({ textcolor }) => textcolor || 'black'}; 
  border: ${({border})=> border ||'none'};
  border-color: ${({bordercolor})=>bordercolor||'none'}; 
  cursor: pointer;
  width:${({bwidth})=>bwidth};
  border-radius:${({bradius})=>bradius};
`;

const Button = ({ children, bgcolor, onClick,textcolor,bwidth,bradius,border,bordercolor}) => {
  return (
    <StyledButton border={border} bradius={bradius} bwidth={bwidth} bgcolor={bgcolor} onClick={onClick} textcolor={textcolor} bordercolor={bordercolor}>
      {children}
    </StyledButton>
  );
};


export default Button;
