import React, { useEffect, useRef, useState } from 'react'
import './MyCartPage.css'
import { BsCart4 } from "react-icons/bs";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const MyCartPage = () => {
  const navigate = useNavigate()
  const memId = JSON.parse(window.sessionStorage.getItem('loginInfo')).memId 
  const [myCart,setMyCart] = useState([])

  //checkbox
  const [chks, setChks] = useState([])
  const [chkAll , setChkAll] = useState(false)
  const [cartCode, setCartCode] = useState([])

  //총금액
  const [sum, setSum] = useState(0)

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(()=>{
  axios.get(`${apiUrl}/api_cart/cartList/${memId}`)
  .then((res)=>{
    console.log(res.data)
    setMyCart(res.data)
    let price = 0
    console.log(res.data)
    res.data.forEach((e,i)=>{
      price = price + e.item.itemPrice*e.cartCnt
    })

    //조회한 개수만큼 chk 배열에 true 저장
    //조회된 자바구니 목록만큼 체크박스의 값을 설정
    let chkarr = new Array(res.data.length)
    //한번에 같은 값 넣기
    chkarr.fill(false)
    setChks(chkarr)
    setSum(price)
  })
  .catch(()=>{})
  },[])


  //선택삭제
function goDelete(data){
    axios.delete(`${apiUrl}//api_cart/cartDelete`, {data:cartCode})
    .then((res)=>{
      const result = window.confirm('삭제하시겠습니까?')
      if(result){
      alert('삭제되었습니다.')
      }
    })
    .catch((error)=>{
      console.error('Error Data:', error.response.data);
      console.error('Error Status:', error.response.status);
    })
}

  //개별삭제
function goDeleteInt(cartNum){
  axios.delete(`${apiUrl}//api_cart/cartDeleteInt/${cartNum}`)
  .then(res=>{
    const result = window.confirm('삭제하시겠습니까?')
    if(result){
      alert('삭제되었습니다.')
    }
  })
  .catch(error=>
    console.log(error)
  )
}


const handleCheckAll = (e) => {
  const newChks = chks.map(() => !chkAll);
  setChks(newChks);
  setChkAll(!chkAll);
};


const handleCheck = (index,e) => {
  const newChks = [...chks];
  newChks[index] = !newChks[index];
  setChks(newChks);
  setChkAll(newChks.every(chk => chk)); 

   // 체크된 거래처 상태 업데이트
    if (newChks[index]) {
    // 체크된 경우
      setCartCode(prev => [
      ...prev,
       e.target.value  // 객체 형태로 추가
      ]);
        } else {
          // 체크 해제된 경우
            setCartCode(prev => 
                prev.filter(
                  num => num !== e.target.value
                ));
      }

};

  return (
    <div className='cartpage'>
      <h4>나의 장바구니</h4>
      <div className='cart-content'>
        <table className='cart-table'>
          <colgroup>
            <col width={'3%'}/>
            <col width={'3%'}/>
            <col width={'*'}/>
            <col width={'10%'}/>
            <col width={'8%'}/>
            <col width={'15%'}/>
            <col width={'18%'}/>
            <col width={'15%'}/>
          </colgroup>
          <thead>
            <tr>
              <td>No</td>
              <td>
                <input 
                  className='cart-chkbox'  
                  type='checkbox'
                  checked={chkAll}
                  onChange={()=>{handleCheckAll()}}/>
              </td>
              <td>상품 정보</td>
              <td>가격</td>
              <td>수량</td>
              <td>구매가격</td>
              <td>구매일시</td>
              <td></td>
            </tr>
          </thead>
          <tbody className='cart-tbody'>
            {
              myCart.length == 0 ?
              <tr>
                <td colSpan={'8'}>현재 등록 된 상품이 없습니다.</td>
              </tr>
              :
              myCart.map((cart,i)=>{
                return(
                <tr key={i}>
                  <td><span>{i+1}</span></td>
                  <td>
                    <input 
                      type='checkbox' 
                      name='cartCode'
                      checked={chks[i]} 
                      className='cart-chkbox' 
                      value={cart.cartCode}
                      onChange={(e)=>{handleCheck(i,e)
                    }} />
                  </td>
                  <td className='carttd'>
                  <img 
                    className='cartimg' 
                    src={(`http://localhost:8080/upload/${cart.item.imgList[0].attachedFileName}`)}
                  />
                    <span>{cart.item.itemName}</span>
                  </td>
                  <td>{cart.item.itemPrice.toLocaleString()}원</td>
                  <td><input type='number' value={cart.cartCnt}/></td>
                  <td>{(cart.item.itemPrice*cart.cartCnt).toLocaleString()}원
                    </td>
                  <td>{cart.cartDate}</td>
                  <td><button  className='delete-btn' type='button'onClick={()=>{goDeleteInt(cart.cartCode)}} >삭제</button></td>
                </tr>
                )
              })
            }
          </tbody>
        </table>
        <div className='cartPrice'>
          <h5>총 금액</h5>
          <p>{sum.toLocaleString()}원</p>
          </div>
        <div className='cart-btn'>
          <button type='button' onClick={()=>{goDelete()}}>선택삭제</button>
          <button>선택구매</button>
        </div>
      </div>
    </div>
  )
}

export default MyCartPage;