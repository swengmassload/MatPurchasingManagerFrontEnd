import { Box } from '@mui/material'


const IsOnComponent = () => {
  return (
   <Box
   
   sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    justifyItems: "center",
    width: "98px",
    height: "27px",
   }}>
  <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    backgroundColor: "#84A98C",
    width: "49px",
    height: '100%',
    color:"black",
        fontSize: "14px",
    fontWeight: "400"

  
  }}>ON</Box>
   <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    backgroundColor: "#ADADAD66",
    width: "49px",
    height: '100%',
    color:"black",
    fontSize: "14px",
    fontWeight: "400"
  
  }}>OFF</Box>

   </Box>
  )
}

export default IsOnComponent