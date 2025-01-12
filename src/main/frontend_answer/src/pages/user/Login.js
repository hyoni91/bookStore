import React, { useState } from 'react'
import './Login.css'
import Modal from '../common/Modal'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = ({setLoginInfo, loginInfo}) => {
  const navigate = useNavigate()
  const apiUrl = process.env.REACT_APP_API_URL;

  //모달의 변수 {content, setIsShow, offBtn}전달해야함
  //로그인창 미입력시 모달창 띄우기 (setIsShow)
  const [ loginModal, setLoginModal] = useState(false)
  //로그인 성공 여부 모달창 띄우기(setIsShow)
  const [ afterLoginModal, setAfterLoginModal] = useState(false)

  //로그인 성공 여부 모달의 메세지
  // 로그인 성공 실패 여부 저장하는 변수와 메세지띄우는 함수
  const [isLoginSuccess, setIsLoginSuccess] = useState(false)
  function drawMdalContent(){
  return(
      isLoginSuccess ?  
    <div>Success😎😎 <br /> Welcome</div>
    : 
    <div>again!😭😭 <br /> please check your ID or password</div>
  )
}
//로그인후 모달칭 안의 확인 버튼 클릭시 실행되는 내용
function handleBtn(){
  if(isLoginSuccess){
    //로그인 권한 판단하려면? App.js에 있는 로그인 정보를 받아서 판단 가능
    if(loginInfo.memRole == 'USER'){
      //로그인 정보가 일반 회원이면?
      navigate('/')
    }else if(loginInfo.memRole == 'ADMIN'){
      //로그인 정보가 관리자라면?
      navigate('/admin/regitem')
    }
  }
}

  // id, pw 저장할 함수 
  const [loginData, setLoginData] = useState({
    memId:'',
    memPw:''
  })

  //input태그 입력 값 저장하는 함수 
  function changeLoginData(e){
    setLoginData({
      ...loginData,
      [e.target.name] : e.target.value
    })
  }

  //login버튼 클릭시 로그인
  function login(){
    //id, pw값 입력하지 않으면 Modal경고창
    if(loginData.memId == '' || loginData.memPw == ''){
      //모달창 띄우기
      setLoginModal(true)
      return;
    }
    axios.post(`${apiUrl}/api_member/login`, loginData)
    .then((res)=>{
      //모달은 성공이든 실패든 모달 띄우기
      setAfterLoginModal(true);
      //자바에서 null 데이터가 넘어오면 res.data는 빈 문자로 데이터 변환
      if(res.data == ''){
        //로그인 실패
        setIsLoginSuccess(false)

      }else{
        //로그인 성공
        setIsLoginSuccess(true)
        //로그인 정보 저장
        const loginInfo = {
          memId : res.data.memId,
          memName : res.data.memName,
          memRole : res.data.memRole
        }
        //스토리지에 아이디 이름 권한 정보 추가(밸류값에 JSON활용)  ---> 세션스토리지는 문자열만 저장가능하기 때문에!
        window.sessionStorage.setItem('loginInfo',JSON.stringify(loginInfo))
        setLoginInfo(loginInfo)
      }
      //App.js의 로그인 정보를 담을 state변수에 로그인 정보를 저장한다.(props활용)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div className='joinpage'>
      <table className='logintable'>
        <colgroup>
        <col width={'30%'}/>
        <col width={'*'}/>
        </colgroup>
        <tbody>
          <tr>
            <td>ID</td>
            <td><input type='text' name='memId' onChange={(e)=>{changeLoginData(e)}}/></td>
          </tr>
          <tr>
            <td>P.W</td>
            <td><input type='password' name='memPw' onChange={(e)=>{changeLoginData(e)}}/></td>
          </tr>
        </tbody>
      </table>
      <div className='loginbtn-div'>
        <button type='button' className='login-btn' onClick={()=>{login()}} >Login</button>
      </div>
      
      
      {  /*//id, pw 미입력시 띄우는 모달창*/
        loginModal ? <Modal content={()=>{
        return(
        <div>
          😱😱😱😱<br />
          IDとパスワードを入力してください。 
        </div>
        )
      }} setIsShow={setLoginModal} offBtn={()=>{}} /> : null
      }
      {   /* 로그인 성공 여부 모달창 (성공) */
        afterLoginModal ? <Modal content={drawMdalContent} setIsShow={setAfterLoginModal} offBtn={handleBtn} /> : null
      }


    </div>
  )
}

export default Login;