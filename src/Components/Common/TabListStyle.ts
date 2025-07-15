

export const TabListSyle = 
{

  "& button": {
    width: "32%",
    fontFamily: "Inter",
    padding: "10px",
    fontSize: "20px",
    fontWeight: "500",
    height: "59px",
    lineHeight: "30px",
    textAlign: "center",
    color: "black",
    backgroundColor:  "#DEDEDE",//"#ADADAD",
    border: "1px solid #ADADAD",

  },
  // "& button: hover": {
  //   backgroundColor: "red",
  // },
"& button.Mui-selected": {
  backgroundColor: "#FFFFFF",
  color: "black",
  border: "2px solid #000000", 
  boxShadow: "0px 4px 4px 0px #00000040",
  transform: "translate(0px, -2px)",
},
};

export const TabListSyleAlternateColor = (IsEven: boolean) => ({
  "& button": {
    width: "32%",
    fontFamily: "Inter",
    padding: "10px",
    fontSize: "20px",
    fontWeight: "500",
    height: "59px",
    lineHeight: "30px",
    textAlign: "center",
    color: "black",
    backgroundColor: IsEven ? "green":"red",//"#ADADAD",
    border: "1px solid #ADADAD",
  },
  ...({
    "& button.Mui-selected": {
      backgroundColor: "#FFFFFF",
      color: "black",
      border: "2px solid #000000",
      boxShadow: "0px 4px 4px 0px #00000040",
      transform: "translate(0px, -2px)",
    },
  }),

  
});


export const TabIndicatorStyle = 
  {
    style: {
      backgroundColor: "black",
      border: "0px solid black",
    }
  }


  export const TabBorderStyle = {
    display: "flex",
    border: "1px solid ",
    height: "100%",
    textTransform: "none",
    fontFamily: "Inter",
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "36px",
    letterSpacing: "-0.015em",
    textAlign: "center",
    
  };