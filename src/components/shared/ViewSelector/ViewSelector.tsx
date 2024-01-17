import { Box, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import Image from 'next/image';

import styles from './ViewSelector.module.scss';

import useScreenSize from '@/hooks/useScreenSize';

import { CustomIcon } from '@/components/shared/CustomIcon';

import { EditorView } from '@/types';

const imageDimensions = {
  width: 54,
  height: 75,
};

export interface ViewSelectorProps {
  views: EditorView[];
  openView: EditorView;
  setOpenView: (x: EditorView) => void;
}

export const ViewSelector: React.FC<ViewSelectorProps> = ({
  views,
  openView,
  setOpenView,
}) => {
  const { isMobile, isTablet } = useScreenSize();
  const isSmallScreen = isMobile || isTablet;
  const theme = useTheme();

  const viewClicked = (index: number) => {
    setOpenView(views[index]);
  };

  return (
    <Paper elevation={3} className={styles.viewSelector}>
      {views.map((view, index) => {
        const rootClass = `
            ${styles.viewWrapper} 
            ${index === openView.id ? styles.active : ''}
          `;
        return (
          <Stack
            className={rootClass}
            key={`view-selector-${index}`}
            onClick={() => viewClicked(index)}
          >
            {index === openView.id && (
              <Box className={styles.checkIcon}>
                <CustomIcon
                  iconClass='fa-circle-check-solid'
                  fontSizeOverWrite='14px'
                />
              </Box>
            )}
            <Box
              width={imageDimensions.width}
              height={imageDimensions.height}
              position='relative'
            >
              <Image
                src={view.tumbnailSrc}
                alt='Example Image'
                fill={true}
                sizes='100%'
              />
            </Box>
            <Typography>{view.displayName}</Typography>
          </Stack>
        );
      })}
    </Paper>
  );
};
