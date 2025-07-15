// export const images = {
//   loginBg: require("./images/Capture3.PNG"),
//   summaryImages: {
//     totalBook: require("./images/Capture3.PNG"),
//     sold: require("./images/Capture3.PNG"),
//     cancel: require("./images/Capture3.PNG"),
//   },
//   userProfile: require("./images/Capture3.PNG"),
//   bookingImage: require("./images/Capture3.PNG"),
//   logo: require("./images/logoblack.jpg"),
// };

// const assets = {
//   images: {
//     //logo: require("./images/logoblack.jpg"),
//     logo: require("./images/NewLogoWithoutWhiteBg.png"), //

//     loginBg: require("./images/Capture3.PNG"),
//   },
//   sounds: {
//     loginsound: require("./sounds/message.mp3"),
//     //logo: require('./images/logoblack.jpg'),
//   },
// };

// export default assets;
import logo from "../assets/images/NewLogoWithoutWhiteBg.png";

import loginsound from "./sounds/message.mp3";
import confusedface from "./images/confusedface.png";
import loggedOut from "./images/LoggedOut.jpg";
import dashboardlogo from "../assets/images/appBarImage.png";
// import barcode from "./icons/barcode.png";
// import check from "./icons/check.png";
// import ringing from "./icons/ringing.png";
// import settinglines from "./icons/setting-lines.png";
// import settings from "./icons/settings.png";
// import user from "./icons/user.png";
// import skills from "./icons/skills.png";
// import datamodelling from "./icons/data-modelling.png";
 import process from "./icons/process.png";
// import document from "./icons/document.png";
// import barchart from "./icons/bar-chart.png";
import wronganswer from "./sounds/wronganswer.mp3";
import invalidselection from "./sounds/invalidselection.mp3";

import productionstages from "./icons/barcode-scan.png";
import batchprocessing from "./icons/batch-processing.png";
import track from "./icons/analytics.png";
import addpicture from "./icons/new.png";
import defects from "./icons/interactivity.png";
import advance from "./icons/technology.png";

const assets = {
  images: {
    logo,
    confusedface,
    loggedOut,
    dashboardlogo,
  },
  sounds: {
    loginsound,
    wronganswer,
    invalidselection,
  },
  icons: {
    // barcode,
    // check,
    // ringing,
    // settinglines,
    // settings,
    // user,
    // skills,
    // datamodelling,
    process,
    //document,
   // barchart,
    productionstages,
    batchprocessing,
    track,
    addpicture,
    defects,
    advance
  },
};

export default assets;

export const PlayLoginSound = () => {
  const sound = new Audio(assets.sounds.loginsound);
  sound.play();
};

export const PlayWrongAnswerSound = () => {
  const sound = new Audio(assets.sounds.wronganswer);
  sound.play();
};

export const PlayInvalidSelectionSound = () => {
  const sound = new Audio(assets.sounds.invalidselection);
  sound.play();
};
