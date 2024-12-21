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
              // navigate('/admin/management')
              setIsShow(true)
              setIsShow1(false)
              setIsShow2(false)
              setIsShow3(false)
            }else{
              setIsShow(false)
            }
          }}>상품관리</span>
            {
              isShow?  
            <div className='dropMenu-content'>
              <ul>
                <li onClick={()=>{
                  navigate('/admin/management')
                  setIsShow(false)
                }}>상품관리</li>
                <li onClick={()=>{
                  navigate('/admin/regItem')
                  setIsShow(false)
                }}>상품등록</li>
                <li onClick={()=>{
                  navigate('/admin/category_management')
                  setIsShow(false)
                }}>카테고리관리</li>
              </ul>
            </div>
              :
              null
            }
            
          </li>  
          <li>
            <span onClick={()=>{
            if(!isShow1){
              // navigate('/admin/sale_history_month')
              setIsShow1(true)
              setIsShow(false)
              setIsShow2(false)
              setIsShow3(false)
            }else{
              setIsShow1(false)
            }
          }}>구매관리</span>
            {
              isShow1?  

              <div className='dropMenu-content'>
                <ul>
                  <li onClick={()=>{
                    navigate('/admin/sale_history_month')
                    setIsShow1(false)
                  }}>이달의구매내역</li>
                  <li onClick={()=>{
                    navigate('/admin/')
                    setIsShow1(false)
                  }}>구매정보검색</li>
                </ul>
              </div>

              :
              null
            }
            </li>
          <li>
            <span onClick={()=>{
            if(!isShow2){
              // navigate('/admin/search_user')
              setIsShow2(true)
              setIsShow1(false)
              setIsShow(false)
              setIsShow3(false)
            }else{
              setIsShow2(false)
            }
          }}>유저관리</span>
            {
              isShow2?  
              <div className='dropMenu-content'>
                <ul>
                  <li onClick={()=>{
                    navigate('/admin/search_user')
                    setIsShow2(false)
                  }}>유저정보관리</li>
                  {/* <li onClick={()=>{
                    navigate(`/admin/UserInfo/:mem`)
                    setIsShow2(false)
                  }}>유저정보변경</li> */}
                  <li onClick={()=>{
                    navigate('/admin')
                    setIsShow2(false)
                  }}>탈퇴유저관리</li>
                </ul>
              </div>

              :
              null
            }
            </li>
          <li>
            <span onClick={()=>{
            if(!isShow3){
              // navigate('/admin/record_month')
              setIsShow3(true)
              setIsShow1(false)
              setIsShow2(false)
              setIsShow(false)
            }else{
              setIsShow3(false)
            }
          }}>매출관리</span>
            {
              isShow3?  
              <div className='dropMenu-content'>
                <ul>
                  <li onClick={()=>{
                    navigate('/admin/record_month')
                    setIsShow3(false)
                  }}>이달의매출</li>
                  <li onClick={()=>{
                    navigate('/admin')
                    setIsShow3(false)
                  }}>월별매출</li>
                  <li onClick={()=>{
                    navigate('/admin')
                    setIsShow3(false)
                  }}>카테고리별 매출</li>
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