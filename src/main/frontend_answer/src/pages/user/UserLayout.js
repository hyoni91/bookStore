import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import './UserLayout.css'
import axios from 'axios';

const UserLayout = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div className='header-userpage'>
        <ul>
          <li><span onClick={()=>{navigate('')}}>전체상품</span></li>
          <li><span onClick={()=>{navigate(`/cate1List/1`)}}>인터넷/IT</span></li>
          <li><span onClick={()=>{navigate(`/cate1List/2`)}}>소설/에세이</span></li>
          <li><span onClick={()=>{navigate(`/cate1List/3`)}}>자기계발</span></li>
        </ul>
      </div>
      <hr /> 
    <Outlet />
    </div>
    
  )
}

export default UserLayout;