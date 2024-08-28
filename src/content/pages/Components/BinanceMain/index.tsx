/*import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import { useEffect, useState } from 'react';
import Footer from 'src/components/Footer';

import { Spot } from '@binance/connector-typescript';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';

const shapeStyles = { bgcolor: 'primary.main', width: 40, height: 40 };
const shapeCircleStyles = { borderRadius: '50%' };
const rectangle = <Box component="span" sx={shapeStyles} />;
const circle = (
  <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
);

function BinanceMain() {
  const [count, setCount] = useState(1);
  const [invisible, setInvisible] = useState(false);
  
  const API_KEY = '3c1M0n8ZF6WB502Fotlp16Y86BaCvjfjMQJMxeSSTiMco4xOjzncMYVItdEuSpvr';
  const API_SECRET = 'vy3hSkQQFYgzjAwpr6RrdqQNik6hWsSNmsUCppAfRJO1vKuA2edegF14biVIzacj';
  const BASE_URL = 'https://api.binance.com';
  
  

  useEffect(()=>{
    const client = new Spot(API_KEY, API_SECRET, { baseURL: BASE_URL });
    client.exchangeInformation().then((res) => {
        console.log(res);
    }).catch(err => { console.log(err) });
  },[]);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  return (
    <>
      <Helmet>
        <title>Badges - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Binance"
          subHeading="Para Pegar as ordens"
          docs="https://github.com/binance/binance-connector-typescript"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Shapes" />
              <Divider />
              <CardContent>
                <Stack spacing={3} direction="row">
                  <Badge color="secondary" badgeContent=" ">
                    {rectangle}
                  </Badge>
                  <Badge color="secondary" badgeContent=" " variant="dot">
                    {rectangle}
                  </Badge>
                  <Badge color="secondary" overlap="circular" badgeContent=" ">
                    {circle}
                  </Badge>
                  <Badge
                    color="secondary"
                    overlap="circular"
                    badgeContent=" "
                    variant="dot"
                  >
                    {circle}
                  </Badge>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default BinanceMain;
*/
function BinanceMain() {return (
  <></>);
}
export default BinanceMain;