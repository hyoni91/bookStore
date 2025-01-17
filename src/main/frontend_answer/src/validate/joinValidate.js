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
        sendFeedbackMsg(valid_tag[0],'*IDはA-Za-z0-9 /4~12字まで可能です。', 'error')
        resultArr[0] = false;
      }else{
        sendFeedbackMsg(valid_tag[0],'*使用可能です。', 'good')
        resultArr[0] = true;
      }
      break;

    case 'memPw':
      const regex_memPw = /^[a-z0-9](?=.*[a-z])(?=.*[0-9]).{3,12}$/g;
      if(!regex_memPw.test(newData.memPw)){
        sendFeedbackMsg(valid_tag[1],'*パスワードはa-zと0-9を含めた4~12字まで可能です。', 'error')
        resultArr[1] = false;
      }else{
        sendFeedbackMsg(valid_tag[1],'*使用可能です。', 'good')
        resultArr[1] = true;
      }
      break;

      case 'comfirmPw' :
        if(newData.memPw != newData.comfirmPw){
          sendFeedbackMsg(valid_tag[4], '*パスワードが一致しません。', 'error')
          resultArr[2] = false;
        }else{
          sendFeedbackMsg(valid_tag[4], '*パスワードが一致します。', 'good')
          resultArr[2] = true;
        }
        break;

      case 'memName':
      //이름 유효성 검사 : 한글 + 2~10자 정규식 
      const regex_memName =  /^[A-Za-z]{2,30}$/

      if(!regex_memName.test(newData.memName)){
        sendFeedbackMsg(valid_tag[2],'*名前はA-Za-z /2~30字まで可能です', 'error')
        resultArr[3] = false;
      }else{
        sendFeedbackMsg(valid_tag[2],'*使用可能です。', 'good')
        resultArr[3] = true;
      }
      break;

      case 'memTel':
      // const regex_memTel = /^[0-9]{10,11}$/;
      const regex_memTel = /^\d{3}-\d{3,4}-\d{4}$/;;
      if(!regex_memTel.test(newData.memTel)){
        sendFeedbackMsg(valid_tag[3], '*数字のみ入力可能です。', 'error')
        resultArr[4] = false;
      }else{
        sendFeedbackMsg(valid_tag[3], '*使用可能です。', 'good')
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

