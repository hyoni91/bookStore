import axios from 'axios'
import './RegItem.css'
import React, { useEffect, useRef, useState } from 'react'
import Modal from '../common/Modal'

const RegItem = () => {
  //모달 띄우기
  const [isItemModal, setIsItemModal] = useState(false)
  //category목록
  const [categoryList, setCategoryList] = useState([])
  //등록창 disabled 여부
  const [isDisabled, setIsDisabled] = useState(false)

  //inset입력값(쌤 변수명= insertItemData)
  const [inputItem, setInputItem] = useState({
    //카테 코드는 1번부터 정렬되도록 설정했기 때문에 초기값은 1번 부터 
    cateCode: 1,
    itemName : '',
    itemPrice :'',
    itemIntro: ''
  })

  console.log(inputItem)

  //첨부파일을 저장할 변수 
  const [mainImg, setMainImg] = useState(null);
  const [subImg, setSubImg] = useState(null);

  
  useEffect(()=>{
    axios.get('/api_admin/categoryList')
    .then((res)=>{
      setCategoryList(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])


  //밸류값이 빈값인지 참조
  const itemName_Ref = useRef();
  const itemPrice_Ref = useRef();

  //onChange함수
  function handleItemInfo(e){
    // if(itemName_Ref.current.value=='' || itemPrice_Ref.current.value == 0){
    //   setIsDisabled(true)
    // }else{
    //   setIsDisabled(false)
      setInputItem({
        ...inputItem,
        [e.target.name] : e.target.value
      })
    // }
  }

  //클릭시 등록 
  function getItemInfo(){
    //config를 변수로 선언해서 매개변수 넣어줌
    const fileConfig = {headers : {'Content-Type' : 'multipart/form-data'}}

    //form객체 생성
    const itemFrom = new FormData();

    //form객체에 데이터 추가(key : value)
    itemFrom.append('itemName', inputItem.itemName)
    itemFrom.append('itemPrice', inputItem.itemPrice)
    itemFrom.append('itemIntro', inputItem.itemIntro)
    itemFrom.append('cateCode', inputItem.cateCode)
    itemFrom.append('mainImg', mainImg)
    itemFrom.append('subImg', subImg)

    axios.post('/api_admin/insertItem', itemFrom, fileConfig) 
    .then((res)=>{
      setIsItemModal(true)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div className='joinpage'>
      <div className='regItem'>
        <div>
          <span>상품 카테고리</span>
          <select  
            className='category-select' 
            name='cateCode'
            onChange={(e)=>{handleItemInfo(e)}}>
            {
              categoryList.map((cate, i)=>{
                return(
                  <option value={cate.cateCode} key={i}>
                    {cate.cateName}
                  </option>
                )
              })
            }
          </select>
        </div>
        <div>
          <span>상품명</span>
          <input 
            className='regItem-input' 
            type='text' 
            name='itemName'
            ref={itemName_Ref}  
            onChange={(e)=>{handleItemInfo(e)}}/>
        </div>
        <div>
          <span>상품가격</span>
          <input 
            type='text' 
            className='regItem-input'  
            name='itemPrice' 
            ref={itemPrice_Ref}  
            onChange={(e)=>{handleItemInfo(e)}}/>
        </div>
        <div>
          <span>상품소개</span>
          <textarea className='textarea' rows={'7'} name='itemIntro'  onChange={(e)=>{handleItemInfo(e)}} />
        </div>
        <div>
          <span>첨부파일</span>
          <input type='file' className='regItem-input' onChange={(e)=>{
            //main 사진 파일 정보
            setMainImg(e.target.files[0])
          }} />
        </div>
        <div>
          <input type='file' className='regItem-input' onChange={(e)=>{
            //sub 사진 파일 정보
            setSubImg(e.target.files[0])
          }} />
        </div>
        <div className='regItem-btn'>
          <button type='button' disabled={isDisabled} onClick={()=>{getItemInfo()}}>등록하기</button>
        </div>
      </div>
      {
        isItemModal?
        <Modal content={()=>{
          return(
        <div>
          😘😘😘😘<br />
          등록을 완료하였습니다!
        </div>
          )
      }} setIsShow={setIsItemModal} offBtn={()=>{}}/>
        :
        null
      }
    </div>
  )
}

export default RegItem;