import { Grid, Stack, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import SignUpButton from '../components/LandingComponents/SignUpButton';

const Home: NextPage = () => {
  return (
    <div style={{ overflow: 'hidden', height: '100%' }}>
      <Head>
        <title>Complanion</title>
        <meta
          name="description"
          content="Trip planning application generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          style={{
            overflow: 'hidden',
            zIndex: 5,
            height: '100%',
            position: 'relative',
          }}
          sx={{ p: 3 }}
        >
          <Stack sx={{ display: { sm: 'none' } }}>
            <Typography
              variant="h2"
              style={{ fontWeight: 500, color: 'black' }}
              sx={{ mb: 2, fontSize: { xs: '42px', md: '72px' } }}
            >
              welcome to your personal trip planner
            </Typography>
            <Typography
              variant="h2"
              style={{ fontWeight: 400, color: 'black' }}
              sx={{ mb: 4, fontSize: { xs: '24px', md: '30px' } }}
            >
              a collaborative approach to group planning.
            </Typography>
          </Stack>
          <Stack sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography
              variant="h2"
              style={{ fontWeight: 500, color: 'white' }}
              sx={{ mb: 2, fontSize: { xs: '42px', md: '72px' } }}
            >
              welcome to your personal trip planner
            </Typography>
            <Typography
              variant="h2"
              style={{ fontWeight: 400, color: 'white' }}
              sx={{ mb: 4, fontSize: { xs: '24px', md: '30px' } }}
            >
              a collaborative approach to group planning.
            </Typography>
          </Stack>
          <SignUpButton />
        </Grid>

        <Stack
          sx={{ display: { sm: 'none' } }}
          style={{
            height: '100%',
            width: '100%',
            display: 'absolute',
            zIndex: 1,
          }}
        >
          <Image
            src="/landingMobile.svg"
            alt="Landing"
            layout={'fill'}
            objectFit={'cover'}
          />
        </Stack>
        <Stack
          sx={{ display: { xs: 'none', sm: 'block' } }}
          style={{
            height: '100%',
            width: '100%',
            display: 'absolute',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <Image
            src="/landing.svg"
            alt="Landing"
            layout={'fill'}
            objectFit={'cover'}
          />
        </Stack>
      </main>
    </div>
  );
};

export default Home;
