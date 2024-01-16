import { Box, Stack } from '@mui/material';
import { useTheme } from '@mui/system';

import useScreenSize from '@/hooks/useScreenSize';

import { IconWrapper } from '@/components/shared/IconWrapper';

export const ChangesController: React.FC = () => {
  const { isMobile, isTablet } = useScreenSize();
  const isSmallScreen = isMobile || isTablet;
  const theme = useTheme();

  return (
    <Stack
      spacing='12px'
      direction='column'
      sx={{
        borderRadius: '100px',
        padding: { sm: '12px 4px', md: '12px' },
        alignItems: 'center',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        maxWidth: isSmallScreen ? '32px' : '60px',
        boxShadow: '0px 4px 4px 0px #CBCBCB',
      }}
    >
      <IconWrapper
        text='Undo'
        iconClass='fa-arrow-rotate-left-light'
        hideTextInMobile
      />
      <IconWrapper
        text='Redo'
        iconClass='fa-arrow-rotate-right-light'
        hideTextInMobile
      />
      {isSmallScreen && (
        <IconWrapper iconClass='fa-arrows-rotate-light' hideTextInMobile />
      )}
      {isSmallScreen && (
        <IconWrapper iconClass='fa-eye-light' hideTextInMobile />
      )}
      <Box
        sx={{
          borderTop: `1px solid ${theme.palette.grey[300]}`,
        }}
      >
        {isSmallScreen ? (
          <IconWrapper iconClass='fa-comment-light' hideTextInMobile />
        ) : (
          <IconWrapper
            iconClass='fa-arrows-rotate-light'
            hideTextInMobile
            text='Reset'
          />
        )}
      </Box>
    </Stack>
  );
};
