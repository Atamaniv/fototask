import getEnvVars from '../environment';
const  apiUrl  = getEnvVars();

console.log(  )


// eslint-disable-next-line import/no-mutable-exports, @typescript-eslint/ban-types
const firebaseConfig = {
  apiKey: {apiUrl}.apiUrl?.apiKey,
  authDomain: {apiUrl}.apiUrl?.authDomain,
  projectId: {apiUrl}.apiUrl?.projectId,
  storageBucket: {apiUrl}.apiUrl?.storageBucket,
  messagingSenderId: {apiUrl}.apiUrl?.messagingSenderId,
  appId: {apiUrl}.apiUrl?.appId,
  measurementId: {apiUrl}.apiUrl?.measurementId
};

export default firebaseConfig;
