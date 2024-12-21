import axios from "axios";

//유효성 검사 결과를 저장할 변수
//함수 안에서 만들면 계속 초기화되면서 false가 됨
// 함수 밖에서 결과를 저장 
let resultArr = [
  false,  //아이디
  false, //비번
  false, //비번확인
  false, //이름 
  false // 연락처
]


export const joinValidate = (newData, valid_tag,tagName) => {
  
  //id값을 변경했으면 id에 관한 유효성 검사 실시
  switch(tagName){
    case 'memId':
      //id유효성 검사 : 영문 + 4~12자리 검사하는 정규식
      const regex_memId = /^[A-Za-z0-9]{4,12}$/ ;
      // test(): 매개변수로 들어온 데이터가 조건에 부합하면 리턴 ture
      if( !regex_memId.test(newData.memId)){
        sendFeedbackMsg(valid_tag[0],'*아이디는 영문 대소문자/숫자  4~12자까지 가능합니다.', 'error')
        resultArr[0] = false;
      }else{
        sendFeedbackMsg(valid_tag[0],'*사용 가능한 아이디입니다.', 'good')
        resultArr[0] = true;
      }
      break;

    case 'memPw':
      const regex_memPw = /^[a-z0-9](?=.*[a-z])(?=.*[0-9]).{3,12}$/g;
      if(!regex_memPw.test(newData.memPw)){
        sendFeedbackMsg(valid_tag[1],'*비밀번호는 영문(소문자)과 숫자로 조합된 4~12자까지 가능합니다.', 'error')
        resultArr[1] = false;
      }else{
        sendFeedbackMsg(valid_tag[1],'*사용 가능한 비밀번호 입니다.', 'good')
        resultArr[1] = true;
      }
      break;

      case 'comfirmPw' :
        if(newData.memPw != newData.comfirmPw){
          sendFeedbackMsg(valid_tag[4], '*비밀번호가 일치하지 않습니다.', 'error')
          resultArr[2] = false;
        }else{
          sendFeedbackMsg(valid_tag[4], '*비밀번호가 일치합니다.', 'good')
          resultArr[2] = true;
        }
        break;

      case 'memName':
      //이름 유효성 검사 : 한글 + 2~10자 정규식 
      const regex_memName =  /^[ㄱ-ㅎ가-힣]{2,10}$/

      if(!regex_memName.test(newData.memName)){
        sendFeedbackMsg(valid_tag[2],'*이름은 2~10자까지 한글만 가능합니다.', 'error')
        resultArr[3] = false;
      }else{
        sendFeedbackMsg(valid_tag[2],'*사용 가능한 이름입니다.', 'good')
        resultArr[3] = true;
      }
      break;

      case 'memTel':
      // const regex_memTel = /^[0-9]{10,11}$/;
      const regex_memTel = /^\d{3}-\d{3,4}-\d{4}$/;;
      if(!regex_memTel.test(newData.memTel)){
        sendFeedbackMsg(valid_tag[3], '*연락처는 숫자만 가능합니다.', 'error')
        resultArr[4] = false;
      }else{
        sendFeedbackMsg(valid_tag[3], '*사용 가능한 연락처입니다.', 'good')
        resultArr[4] = true;
      }
  }
  
  // ()의 데이터가 들어가 있는 확인
  //false가 들어가면 리턴 ture 
    console.log(!resultArr.includes(false))
  return  !resultArr.includes(false)
  
}

//유효성 결과 메세지를 띄우는 함수 
function sendFeedbackMsg(feedbackTag,msg,type){
  // 유효성 검사에 따라 feedbackTag(ref참조변수),메세지, type(에러 유무)
  feedbackTag.current.className = `feedback ${type}`;
  feedbackTag.current.textContent = msg;
} 

