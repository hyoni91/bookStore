import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate()
  const [isShow, setIsShow] = useState(false)
  const [isShow1, setIsShow1] = useState(false)
  const [isShow2, setIsShow2] = useState(false)
  const [isShow3, setIsShow3] = useState(false)


  return (
    <div className='admin-menu'>
      <div className='header-userpage'>
        <ul>
          <li className='dropMenu'>
            <span onClick={()=>{
            if(!isShow){
              setIsShow(true)
              setIsShow1(false)
              setIsShow2(false)
              setIsShow3(false)
            }else{
              setIsShow(false)
            }
          }}>商品管理</span>
            {
              isShow?  
            <div className='dropMenu-content'>
              <ul>
                <li onClick={()=>{
                  navigate('/admin/regItem')
                  setIsShow(false)
                }}>商品登録</li>
                <li onClick={()=>{
                  navigate('/admin/regItem')
                  setIsShow(false)
                }}>カテゴリー管理</li>
              </ul>
            </div>
              :
              null
            }
            
          </li> 
          <li>
            <span onClick={()=>{
            if(!isShow2){
              setIsShow2(true)
              setIsShow1(false)
              setIsShow(false)
              setIsShow3(false)
            }else{
              setIsShow2(false)
            }
          }}>ユーザー管理</span>
            {
              isShow2?  
              <div className='dropMenu-content'>
                <ul>
                  <li onClick={()=>{
                    navigate('/admin/search_user')
                    setIsShow2(false)
                  }}>ユーザー情報管理</li>
                  <li onClick={()=>{
                    setIsShow2(false)
                  }}>解約ユーザー管理</li>
                </ul>
              </div>

              :
              null
            }
            </li> 
          <li>
            <span onClick={()=>{
            if(!isShow1){
              setIsShow1(true)
              setIsShow(false)
              setIsShow2(false)
              setIsShow3(false)
            }else{
              setIsShow1(false)
            }
          }}>売上管理</span>
            {
              isShow1?  

              <div className='dropMenu-content'>
                <ul>
                  <li onClick={()=>{
                    setIsShow1(false)
                  }}>今月の売上</li>
                  <li onClick={()=>{
                    setIsShow1(false)
                  }}>売上管理</li>
                </ul>
              </div>

              :
              null
            }
            </li>
          <li>
            <span onClick={()=>{
            if(!isShow3){
              setIsShow3(true)
              setIsShow1(false)
              setIsShow2(false)
              setIsShow(false)
            }else{
              setIsShow3(false)
            }
          }}>備考</span>
            {
              isShow3?  
              <div className='dropMenu-content'>
                <ul>
                  <li onClick={()=>{
                    setIsShow3(false)
                  }}>備考１</li>
                  <li onClick={()=>{
                    setIsShow3(false)
                  }}>備考２</li>
                  <li onClick={()=>{
                    setIsShow3(false)
                  }}>備考３</li>
                </ul>
              </div>

              :
              null
            }
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  )
}


export default AdminLayout;