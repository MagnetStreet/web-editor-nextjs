import { styled } from '@mui/material';
import sassVars from '@/styles/_colorVariables.module.scss';
import * as React from 'react';

interface SectionProps {
  children: React.ReactNode;
}

const StyledDiv = styled('div')(
  ({ theme }) => `
  width: 100%;
  padding: 16px;
  margin: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${sassVars.brandColorLightGrey};
  border-bottom: 1px solid ${sassVars.brandColorLightGrey};
`
);

const Section: React.FC<SectionProps> = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Section;
