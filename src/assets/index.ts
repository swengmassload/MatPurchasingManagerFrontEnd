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
import process from "./icons/process.png";
import wronganswer from "./sounds/wronganswer.mp3";
import invalidselection from "./sounds/invalidselection.mp3";

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
    // All other icons have been removed as they were unused
    // Only keeping process icon which is the only remaining icon file
    process,
    // Using process icon as fallback for defects since interactivity.png was removed
    defects: process,
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
