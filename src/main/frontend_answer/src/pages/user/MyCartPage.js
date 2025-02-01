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

  function fetchCartData() {
    axios.get(`${apiUrl}/api_cart/cartList/${memId}`)
      .then((res)=>{
        setMyCart(res.data);
        let price = 0;
        res.data.forEach((item) => {
          price += item.item.itemPrice * item.cartCnt;
        });
        // 체크박스 초기화: 길이만큼 false로 채움
        const chkarr = new Array(res.data.length).fill(false);
        setChks(chkarr);
        setSum(price);
      })
      .catch((error)=>{
        console.error(error);
      });
  }

  useEffect(()=>{
      fetchCartData()
  },[])

  //선택삭제
function goDelete(data){
    axios.delete(`${apiUrl}/api_cart/cartDelete`, {data:cartCode})
    .then((res)=>{
      const result = window.confirm('삭제하시겠습니까?')
      if(result){
      alert('삭제되었습니다.')
        fetchCartData()
      }
    })
    .catch((error)=>{
      console.error('Error Data:', error.response.data);
      console.error('Error Status:', error.response.status);
    })
}

  //개별삭제
function goDeleteInt(cartNum){
  axios.delete(`${apiUrl}/api_cart/cartDeleteInt/${cartNum}`)
  .then(res=>{
    const result = window.confirm('삭제하시겠습니까?')
    if(result){
      alert('삭제되었습니다.')
      fetchCartData()
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
      <h4>My Cart</h4>
      <div className='cart-content'>
        <table className='cart-table'>
          <colgroup>
            <col width={'2%'}/>
            <col width={'2%'}/>
            <col width={'*'}/>
            <col width={'10%'}/>
            <col width={'4%'}/>
            <col width={'15%'}/>
            <col width={'17%'}/>
            <col width={'13%'}/>
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
              <td>商品情報</td>
              <td>値段</td>
              <td>数量</td>
              <td>総額</td>
              <td>購入日</td>
              <td></td>
            </tr>
          </thead>
          <tbody className='cart-tbody'>
            {
              myCart.length == 0 ?
              <tr>
                <td colSpan={'8'}>現在カートに商品がございません。</td>
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
                    src={(`${apiUrl}/upload/${cart.item.imgList[0].attachedFileName}`)}
                  />
                    <span>{cart.item.itemName}</span>
                  </td>
                  <td>{cart.item.itemPrice.toLocaleString()}円</td>
                  <td><input type='number' value={cart.cartCnt}/></td>
                  <td>{(cart.item.itemPrice*cart.cartCnt).toLocaleString()}円
                    </td>
                  <td>{cart.cartDate}</td>
                  <td><button  className='delete-btn' type='button'onClick={()=>{goDeleteInt(cart.cartCode)}} >削除</button></td>
                </tr>
                )
              })
            }
          </tbody>
        </table>
        <div className='cartPrice'>
          <h5>総額</h5>
          <p>{sum.toLocaleString()}円</p>
        </div>
        <div className='cart-btn'>
          <button type='button' onClick={()=>{goDelete()}}>削除</button>
          <button>購入</button>
        </div>
      </div>
    </div>
  )
}

export default MyCartPage;