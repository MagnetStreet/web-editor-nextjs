import { Box, Typography } from '@mui/material';

import useScreenSize from '@/hooks/useScreenSize';

import { Sizes } from '@/types';

export interface IconWrapper {
  text?: string;
  iconClass: string;
  textSizes?: Sizes;
  color?: string;
  hideTextInMobile?: boolean;
  onClick?: () => void;
}

export const IconWrapper: React.FC<IconWrapper> = ({
  text,
  iconClass,
  onClick,
  color = 'inherit',
  textSizes = { xs: '24px', sm: '24px', md: '36px' },
  hideTextInMobile = false,
}) => {
  const { isMobile, isTablet } = useScreenSize();
  const isSmallScreen = isMobile || isTablet;
  return (
    <Box
      sx={{
        fontSize: { ...textSizes },
      }}
      onClick={onClick}
    >
      <i
        className={iconClass}
        style={{
          color: color,
        }}
      ></i>
      {!(isSmallScreen && hideTextInMobile) && text && (
        <Typography
          variant='subtitle2'
          sx={{
            color: color,
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
};
