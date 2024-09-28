import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDLuX_PJqqBOg7pvQ7lssoCgDnSAQh_AaQ",
  authDomain: "bitnbuild-98d6e.firebaseapp.com",
  projectId: "bitnbuild-98d6e",
  storageBucket: "bitnbuild-98d6e.appspot.com",
  messagingSenderId: "347363857827",
  appId: "1:347363857827:web:f6cca3b1af2f24db103616",
  databaseURL: "https://bitnbuild-98d6e-default-rtdb.firebaseio.com",
};


export const app = initializeApp(firebaseConfig);
