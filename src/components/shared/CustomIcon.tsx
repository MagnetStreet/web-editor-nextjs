import { Box, Typography } from '@mui/material';

import useScreenSize from '@/hooks/useScreenSize';

import { Sizes } from '@/types';

export interface CustomIconProps {
  text?: string;
  iconClass: string;
  textSizes?: Sizes;
  fontSizeOverWrite?: string;
  gap?: Sizes;
  color?: string;
  hideTextInMobile?: boolean;
  onClick?: () => void;
}

export const CustomIcon: React.FC<CustomIconProps> = ({
  text,
  iconClass,
  onClick,
  color = 'inherit',
  fontSizeOverWrite,
  textSizes = { xs: '24px', sm: '24px', md: '36px' },
  gap = { xs: '0px' },
  hideTextInMobile = false,
}) => {
  const { isMobile, isTablet } = useScreenSize();
  const isSmallScreen = isMobile || isTablet;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: { ...textSizes },
        gap: { ...gap },
      }}
      onClick={onClick}
    >
      <i
        className={iconClass}
        style={{
          color: color,
          fontSize: `${fontSizeOverWrite || 'inherit'}`,
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
