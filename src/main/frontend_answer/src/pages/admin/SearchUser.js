import React, { useEffect, useState } from 'react'
import './AdminLayout.css'
import './SearchUser.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UserInfo from './UserInfo'


const SearchUser = () => {
  const navigate = useNavigate();
  const [allUser, setAllUser] = useState([])
  const [searchValue , setSearchValue] = useState({})

  const [openModal, setOpenModal] = useState(false)
  const showModal = () =>{
    setOpenModal(!openModal)
  }

  useEffect(()=>{
    axios.post("/api_admin/selectAllUser",searchValue)
    .then((res)=>{
      setAllUser(res.data)
    }).catch((error)=>{
      alert('error!')
      console.log(error)
    })
  },[])

  function getUserInfo(){
    axios.post("/api_admin/selectAllUser",searchValue)
    .then((res)=>{
      setAllUser(res.data)
    }).catch((error)=>{
      alert('error!')
      console.log(error)
    })
  }


  return (
    <div className='searchUser-container'>
      <div>
        <div className='search-content'>
          <input type='text'
          className='searchinput' name='searchValue' placeholder='ID를 입력하세요.' onChange={(e)=>{
            setSearchValue({
              ...searchValue,
              [e.target.name] : e.target.value
            })
          }}/>
          <button type='button' className='searchUser-btn' onClick={()=>{getUserInfo()}}>검색</button>
        </div>
        <table className='searchUser-table'>
          <thead>
            <tr>
              <td>번호</td>
              <td>ID</td>
              <td>이름</td>
              <td>연락처</td>
              <td>메일주소</td>
            </tr>
          </thead>
          <tbody>
            {
              allUser.map((user, i)=>{
                return(
                  <tr>
                    <td>{allUser.length - i}</td>
                    <td>
                      <span onClick={()=>{showModal(user.memId)}}>
                        {user.memId}
                      </span>
                    </td>
                    <td>{user.memName}</td>
                    <td>{user.memTel}</td>
                    <td>{user.memEmail}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      {
        openModal? <UserInfo /> :null
      }
    </div>
  )
}

export default SearchUser