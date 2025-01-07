
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Modal = ({content, setIsShow, offBtn}) => {
  return(
    <div className='modal-container'>
        <div className='modal'>
          <div className='modal-header'>
            <span onClick={()=>{
              setTimeout(()=>{
                setIsShow(false)
                offBtn() 
              },300)
              }} >
              <i class="bi bi-x-lg"></i></span>          
            </div>
          <div className='modal-content'>
            {content()}  
          </div>
          <div className='modal-footer'>
            <button type='button' onClick={()=>{ 
              setTimeout(()=>{
                //모달창 닫기
                setIsShow(false)
                //컴포넌트에 따라서 페이지 이동하기(함수)
                offBtn() // 로그인 페이지로 이동 
                },300)
                }}>確認
              </button>
          </div>
        </div>
      </div>
  )
}

export default Modal;