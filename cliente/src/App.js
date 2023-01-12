import React from 'react';
import {Routes, Route} from 'react-router'

import firebase, {FirebaseContext} from './firebase/index'

import Menu from './components/paginas/Menu';
import Ordenes from './components/paginas/Ordenes';
import Platillo from './components/paginas/NuevoPlatillo';
import Sidebar from './components/ui/Sidebar';

function App() {
  return (
    <FirebaseContext.Provider
    value={{firebase}}
    >
    <div className="flex min-h-screen">
      <Sidebar/>
      <div  className="md:w-3/5 xl:w-4/5 bg-gray-100 p-6">
        <Routes>
        <Route path="/" element={<Ordenes />}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/nuevo-platillo" element={<Platillo/>}/>
      </Routes>
      </div>      
    </div>
    </FirebaseContext.Provider>
  );
}

export default App;
