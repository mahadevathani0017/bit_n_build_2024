import { useState } from 'react'
import Register from './components/Register'
import SignIn from './components/SignIn';
import UserInventor from './Pages/UserInventory'
import AddClothes from './components/AddClothes';
import Display from './components/Display';

function App() {
  return(
    <>
    
    <UserInventor/>
    <Register/> 
    <SignIn/> 
    <AddClothes/>
    <Display/>
    </>
  )
}

export default App;
