import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import PageFooter from '@/components/shared/Footer/footer';
import ReactHookForm from '@/components/shared/ReactHookForm';

import { SITE_CONFIG } from '@/constants';

export default function ExamplePage({
  reactVersion = 'unknown',
  nextJsVersion = 'unknown',
}) {
  return (
    <main>
      <section>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant='h5'
            component='h1'
            gutterBottom
            className='page-title'
          >
            {SITE_CONFIG.title}
          </Typography>
          <Typography
            variant='subtitle2'
            gutterBottom
            className='page-subtitle'
          >
            {SITE_CONFIG.description}
          </Typography>

          <Typography
            variant='subtitle1'
            gutterBottom
            sx={{ color: 'green', mt: 3 }}
          >
            Fetch & cache data from 2 remote APIs test: <br />
            The latest React version is {reactVersion}, and the latest NextJs
            version is {nextJsVersion}
            <Box sx={{ color: 'grey', fontSize: 10 }}>
              On dev environment, you can see how long it takes on console, e.g.
              getApiResponse: 0.05s
            </Box>
          </Typography>

          <Box sx={{ m: 5 }}>
            <h4>
              Test local NextJs API /api/test method POST with form variables
            </h4>
            <ReactHookForm />
          </Box>

          <Box sx={{ m: 5 }}>
            <Link href='/test-page-not-exists'>
              Test 404 page not found (mock file not exists)
            </Link>
          </Box>
          <Box sx={{ m: 5 }}>
            <a href='/?slug=testError500'>
              Test 500 error page (mock server side throw error)
            </a>
          </Box>
        </Box>
      </section>
      <PageFooter />
    </main>
  );
}
