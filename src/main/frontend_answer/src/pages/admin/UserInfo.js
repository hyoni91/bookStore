import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactModal from 'react-modal'
import './UserInfo.css'


const UserInfo = ({memId}) => {
  console.log(memId)
  // const {memId} = useParams()
  const [memberInfo, setMemberInfo] = useState({})
  const apiUrl = process.env.REACT_APP_API_URL;

  
  //모달
  const [modalOpen, setModalOpen] = useState(false)
  const showModal = ()=>{
    setModalOpen(!modalOpen)
  }


  useEffect(()=>{
    axios.get(`${apiUrl}/api_admin/userInfo/${memId}`)
    .then((res)=>{
      console.log(res.data)
      setMemberInfo(res.data)
    })
    .catch((error)=>{
      console.log(error)
      alert(error)
    })
  },[])

  return (
    <div>
        <ReactModal
        isOpen={true}
        ariaHideApp={false}
        onRequestClose={''}
        style={{
          overlay: {
            position: 'fixed',
            borderRadius : 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0, 0.6)'
          },
          content: {
            position: 'absolute',
            width: '500px',
            height: '620px',
            top: '60px',
            left: '700px',
            right: '40px',
            bottom: '30px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            // padding: '20px'
          }
        }}
        >
        <div className='userInfo-content'>
        <div >회원 상세 정보</div>
        <div>
          <span>이름</span>
          <input type='text' name='memName' defaultValue={memberInfo.memName}/>
        </div>
        <div>
          <span>아이디</span>
          <input type='text' name='memId' defaultValue={memberInfo.memId}/>
        </div>
        <div>
          <span>비밀번호</span>
          <input type='text' name='memPw' defaultValue={memberInfo.memPw}/>
        </div>
        <div>
          <span>전화번호</span>
          <input type='text' name='memTel' defaultValue={memberInfo.memTel}/>
        </div>
        <div>
          <span>우편번호</span>
          <input type='text' name='post' defaultValue={memberInfo.post}/>
        </div>
        <div>
          <span>주소</span>
          <input type='text' name='memAddr' defaultValue={memberInfo.memAddr}/>
        </div>
        <span className='userInfo-btn'>
          <button type='button' onClick={()=>{}}>확인</button>
          <button type='button' onClick={()=>{}}>취소</button>
        </span>
      </div>
        </ReactModal>
    </div>
    
  )
}

export default UserInfo