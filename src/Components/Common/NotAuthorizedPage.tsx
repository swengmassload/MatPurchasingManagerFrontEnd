
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import SimpleLineErrorMessage from './SimpleLineErrorMessage';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(4)', color:"red"}}
  >
    •
  </Box>
);

export default function NotAuthorizedPage() {
  return (
    <Card sx={{ minWidth: 25 ,width:"350px",mt:6,ml:10}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Acess Denied
        </Typography>
        <Typography variant="h5" component="div">
          {bull} &nbsp;&nbsp; Not Authorized&nbsp;&nbsp;&nbsp;{bull}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        &nbsp;
        </Typography>
        {/* <Typography variant="body2">
         You may contact the Administrator.
          <br />
        
        </Typography> */}
           <SimpleLineErrorMessage errorMessage={ "You may contact the Administrator."}></SimpleLineErrorMessage>

      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}