/*****************************
* environment.js
* path: '/environment.js' (root of your project)
******************************/

import Constants from "expo-constants";
import { Platform } from "react-native";

const localhost =
 Platform.OS === "ios" ? "localhost:8080" : "10.0.2.2:8080";

const ENV = {
 dev: {
   apiUrl: localhost,
   amplitudeApiKey: null,

   apiKey: "AIzaSyACaL-ExfiFb6qhyN12a3mrJ5HFA4TJros",
   authDomain: "fototasks-45642.firebaseapp.com",
   projectId: "fototasks-45642",
   storageBucket: "fototasks-45642.appspot.com",
   messagingSenderId: "316247337145",
   appId: "1:316247337145:web:c4ca9c49e7d66abad01368",
   measurementId: "G-HHBL18X8XM"
 },
 staging: {
   apiUrl: "[your.staging.api.here]",
   amplitudeApiKey: "[Enter your key here]",
   // Add other keys you want here
   apiKey: "AIzaSyACaL-ExfiFb6qhyN12a3mrJ5HFA4TJros",
   authDomain: "fototasks-45642.firebaseapp.com",
   projectId: "fototasks-45642",
   storageBucket: "fototasks-45642.appspot.com",
   messagingSenderId: "316247337145",
   appId: "1:316247337145:web:c4ca9c49e7d66abad01368",
   measurementId: "G-HHBL18X8XM"
 },
 prod: {
   apiUrl: "[your.production.api.here]",
   amplitudeApiKey: "[Enter your key here]",
   // Add other keys you want here
   apiKey: "AIzaSyACaL-ExfiFb6qhyN12a3mrJ5HFA4TJros",
   authDomain: "fototasks-45642.firebaseapp.com",
   projectId: "fototasks-45642",
   storageBucket: "fototasks-45642.appspot.com",
   messagingSenderId: "316247337145",
   appId: "1:316247337145:web:c4ca9c49e7d66abad01368",
   measurementId: "G-HHBL18X8XM"
 }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
 // What is __DEV__ ?
 // This variable is set to true when react-native is running in Dev mode.
 // __DEV__ is true when run locally, but false when published.
 if (__DEV__) {
   return ENV.dev;
 } else if (env === 'staging') {
   return ENV.staging;
 } else if (env === 'prod') {
   return ENV.prod;
 }
};

export default getEnvVars;