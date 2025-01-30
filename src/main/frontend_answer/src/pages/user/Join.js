
import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Join.css';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import axios from 'axios';
import Modal from '../common/Modal';
import { joinValidate } from '../../validate/joinValidate';

const Join = () => {
  const navigate = useNavigate()
  const apiUrl = process.env.REACT_APP_API_URL;

  //회원가입 버튼 여부
  const [isDisabled, setIsDisabled] = useState(true)

  //모달창 랜더링 여부
  const [isShow, setIsShow] = useState(false)

  //아이디 중복검사 여부 
  const [isChkId, setIsChkId] = useState(false)


  //input태그를 참조하는 변수 
  const email_1 = useRef();
  const email_2 = useRef();

  //daum 주소 api 팝업창을 띄우기 위한 함수선언 
  const open =  useDaumPostcodePopup();

  //주소 검색 팝업창이 닫힐 때 실행되는 함수 
  function handleComplete(data){
    //우편 번호와 도로명주소 가져오기
    //input태그에 검색한 내용 넣어주기
    setJoinData(
      {
        ...joinData,
        post :  data.zonecode ,
        memAddr : data.roadAddress
      })
  }

  //주소 검색 클릭시 실행되는 함수 
  function handleClick(){
    open({onComplete : handleComplete});
  }

  //회원가입 정보
  const [joinData, setJoinData] = useState({
    memId :'',
    memPw :'',
    comfirmPw:'',
    memName: '',
    memTel:'',
    post:'',
    memAddr:'',
    addrDetail:'',
    memEmail:''
  })

  //유효성 검사 참조 변수
  const memId_valid_tag = useRef();
  const memName_valid_tag = useRef();
  const memPw_valid_tag = useRef();
  const memTel_valid_tag = useRef();
  const confirmPw_valid_tag = useRef();
  //Ref배열로 활용(유효성 검사 참조 변수)
  const valid_tag = useRef([
    memId_valid_tag,
    memPw_valid_tag, 
    memName_valid_tag, 
    memTel_valid_tag, 
    confirmPw_valid_tag ]);

  //유효성 검사 결과를 저장하는 변수
  const [validResult, setValidResult] = useState(false)

  function changeJoinData(e){
    const tagName = e.target.name;

      if(e.target.name == 'memId'){
        setIsDisabled(true)
      }
      //입력한 데이터 
      const newData = {
        ...joinData,
          //validation(유효성)처리 
        [e.target.name] : e.target.name != 'memEmail' ? 
                          e.target.value : 
                          email_1.current.value + email_2.current.value
      }
      // 입력한 데이터(newData)에 대한 유효성 검사 (매개변수 잊지마)
      //모든 데이터가 유효한 테이터라면 리턴 true
      const result = joinValidate(newData, valid_tag.current , tagName)
      setValidResult(result)

      console.log(validResult)

      //유효성이 끝난 데이터를 state변수에 담음 ----> 이때 재랜더링됨
        setJoinData(newData)
      
    }


    //id중복 확인
  function idChkBtn(){

    if(joinData.memId == ''){
      setIsChkId(false)
      alert('IDを入力してください。')
      return;
    }
   
    axios.get(`${apiUrl}/api_member/idChk/${joinData.memId}`)
    .then((res)=>{
      const result = res.data;
      result? alert('すでに使われています。'): alert('使用可能です。') 
        return setIsChkId(true)})
      //회원가입 버튼 여부 (아이디 중복 검사안하면 오류뜨도록 설정했기때문에 주석처리중)
    //   if(!result){
    //     setIsDisabled(false)
    //   }
    // })
    .catch((error)=>{
      console.log(error)
    })

  }
  //회원 가입 버튼 클릭 시 insert쿼리 실행하기
  function join(){
    if(!validResult){
      alert('入力データを確認してください。')
      return ; 
    }

    //아이디 중복 검사 했는지 확인
    if(!isChkId){
      alert('IDチェックをしてください。')
      return;
    }


    axios.post(`${apiUrl}/api_member/join`, joinData)
    .then((res)=>{
      //모달창 띄우기 -> 확인 누르면 로그인페이지 이동
      setIsShow(true)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

   //모달창 안의 내용을 생성하는 함수 
    function setModalContent(){
    return(
      <div>
        Welcome😍 <br />
        いらっしゃいませ。
        </div> 
    )
  }

  //모달창을 닫으면 실행되는 함수 
  function offModalBtn(){
    navigate('/loginForm');
  }

  return (
    <div className='joinpage'>
      {
        isShow? <Modal  content={setModalContent}   setIsShow={setIsShow}  offBtn = {offModalBtn}/> : null
      }
      
        <table className='jointable'>
          {/* <colgroup>
            <col width={'28%'}/>
            <col width={'*'}/>
          </colgroup> */}
          <tbody>
            <tr>
              {/* <td>ID</td> */}
              <td>
                <input className='input-size' type='text' id='id' name='memId' placeholder='ID' required onChange={(e)=>{setIsChkId(false)
                  changeJoinData(e)}}/>
              <button type='button' onClick={()=>{idChkBtn()}}>チェック</button>
              <div className='feedback' ref={memId_valid_tag} ></div>
              </td>
            </tr>
            <tr>
              {/* <td>PW</td> */}
              <td><input type='password'  required name='memPw' placeholder='PW' onChange={(e)=>{changeJoinData(e)}}/>
              <div className='feedback' ref={memPw_valid_tag}  ></div>
              </td>
            </tr>
            <tr>
              {/* <td>PW(チェック用)</td> */}
              <td><input type='password'  required name='comfirmPw' placeholder='PW(チェック用)' onChange={(e)=>{changeJoinData(e)}}/>
              <div className='feedback' ref={confirmPw_valid_tag}  ></div>
              </td>
            </tr>
            <tr>
              {/* <td>名前</td> */}
              <td>
                <input type='text'  required name='memName' placeholder='名前' onChange={(e)=>{changeJoinData(e)}}/>
                <div className='feedback' ref={memName_valid_tag} ></div>
              </td>
            </tr>
            <tr>
              {/* <td>携帯電話</td> */}
              <td><input type='text'  name='memTel' placeholder='電話番号は"-"と一緒に入力してください。' onChange={(e)=>{changeJoinData(e)}}/>
              <div className='feedback'  ref={memTel_valid_tag}  ></div>
              </td>
            </tr>
            <tr className='addr-boxsize'>
              {/* <td>住所</td> */}
              <td>
                <input type='text' placeholder='郵便番号' name='post'  value={joinData.post} readOnly={true} onChange={(e)=>{changeJoinData(e)}} onClick={handleClick} />
              <button type='button' onClick={handleClick}>検索</button>
                <p>
                  <input type='text' placeholder='住所' name='memAddr' value={joinData.memAddr} readOnly={true} onChange={(e)=>{changeJoinData(e)}} onClick={handleClick}/>
                  </p>
                <p>
                  <input type='text' placeholder='アパート名などを入力してください。' name='addrDetail' onChange={(e)=>{changeJoinData(e)}}/>
                  </p>
              </td>
            </tr>
            <tr>
              {/* <td>メールアドレス</td> */}
              <td><input className='inputmail-size' type='text' name='memEmail' placeholder='メールアドレス' ref={email_1} onChange={(e)=>{changeJoinData(e)}}/>
                  <select className='select-size' name='memEmail' ref={email_2} onChange={(e)=>{changeJoinData(e)}} >
                    <option value={'@naver.com'} >naver.com</option>
                    <option value={'@gmail.com'}>gamail.com</option>
                    <option value={'@yahoo.co.kr'}>yahoo.co.kr</option>
                  </select>
              </td>
            </tr>
          </tbody>
        </table>
      <div className='btn-div'><button type='button'   onClick={()=>{
        join()
        }}>Join</button>
      </div>
    </div>
    
  )
}

export default Join;