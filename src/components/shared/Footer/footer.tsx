import { Box } from '@mui/material';
import styles from './footer.module.scss';
import * as React from 'react';

const PageFooter = () => {
  return (
    <section className='noScroll'>
      <Box
        sx={{ m: 2, textAlign: 'center', fontSize: '0.8rem' }}
        className={styles.footer}
      >
        Some Footer for sample and Sass modules styling
      </Box>
    </section>
  );
};

export default PageFooter;
