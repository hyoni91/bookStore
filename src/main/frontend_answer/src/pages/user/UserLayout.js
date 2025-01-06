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
          <li><span onClick={()=>{navigate('')}}>ALL</span></li>
          <li><span onClick={()=>{navigate(`/cate1List/1`)}}>インターネット/IT</span></li>
          <li><span onClick={()=>{navigate(`/cate1List/2`)}}>小説/エッセイ</span></li>
          <li><span onClick={()=>{navigate(`/cate1List/3`)}}>自己啓発</span></li>
        </ul>
      </div>
      <hr /> 
    <Outlet />
    </div>
    
  )
}

export default UserLayout;