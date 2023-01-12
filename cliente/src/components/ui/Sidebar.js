import React from 'react'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return ( <>
  <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
    <div className="p-6">
      <p className="text-white uppercase text-2xl tracking-tight text-center font-bold">Restaurante</p>
      <p className="mt-3 text-center text-gray-400">Administrar</p>
      <nav className="mt-10">
        <NavLink className="text-gray-400 block p-1 hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact="true" to="/ordenes">Ordenes</NavLink>
        <NavLink className="text-gray-400 block p-1 hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact="true" to="/menu">Menu</NavLink>
      </nav>
    </div>
  </div>
  </> );
}
 
export default Sidebar;