import React, { useEffect, useState } from 'react'
import './DisplayItem.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DisplayItem = () => {
  const navigate = useNavigate();

  const [itemList, setItemList] = useState([])
  console.log(itemList)

  useEffect(()=>{
    axios.get('/api_member/itemList')
    .then((res)=>{
      setItemList(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])



  return (
    <>
      <div className='item-list-title'>전체 목록</div>
      <div className='item-list-div'>
        
        {
          itemList.map((item,i)=>{
            return(
              <div key={i} className='item-div'>
                <img onClick={()=>{navigate(`book_detail/${item.itemCode}`)}} src={(`http://localhost:8080/upload/${item.imgList[0].attachedFileName}`)}/>
                <h6>{item.category.cateName}</h6>
                <h4 onClick={()=>{navigate(`book_detail/${item.itemCode}`)}}>{item.itemName}</h4>
                <p>{item.itemPrice.toLocaleString()}원</p>
              </div>
            )
          })
        }
        
      </div>
    </>
  )
}

export default DisplayItem;