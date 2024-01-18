import { Box, Stack } from '@mui/material';
import { useTheme } from '@mui/system';

import useScreenSize from '@/hooks/useScreenSize';

import { CustomIcon } from '@/components/shared/CustomIcon';

export const ChangesController: React.FC = () => {
  const { isMobile, isTablet } = useScreenSize();
  const isSmallScreen = isMobile || isTablet;
  const iconSizes = { xs: '20px', sm: '24px', md: '30px', lg: '36px' };
  const theme = useTheme();

  return (
    <Stack
      spacing='12px'
      direction='column'
      sx={{
        borderRadius: '100px',
        padding: { xs: '12px 4px' },
        alignItems: 'center',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        maxWidth: isMobile ? '32px' : '60px',
        boxShadow: '0px 4px 4px 0px #CBCBCB',
      }}
    >
      <CustomIcon
        text='Undo'
        iconClass='fa-arrow-rotate-left-light'
        textSizes={{ ...iconSizes }}
        hideTextInMobile
      />
      <CustomIcon
        text='Redo'
        iconClass='fa-arrow-rotate-right-light'
        hideTextInMobile
        textSizes={{ ...iconSizes }}
      />
      {isSmallScreen && (
        <CustomIcon
          iconClass='fa-arrows-rotate-light'
          textSizes={{ ...iconSizes }}
        />
      )}
      {isSmallScreen && (
        <CustomIcon iconClass='fa-eye-light' textSizes={{ ...iconSizes }} />
      )}
      <Box
        paddingY='6px'
        sx={{
          borderTop: `1px solid ${theme.palette.grey[300]}`,
        }}
      >
        {isSmallScreen ? (
          <CustomIcon
            iconClass='fa-comment-light'
            textSizes={{ ...iconSizes }}
          />
        ) : (
          <CustomIcon
            iconClass='fa-arrows-rotate-light'
            hideTextInMobile
            text='Reset'
            textSizes={{ ...iconSizes }}
          />
        )}
      </Box>
    </Stack>
  );
};
