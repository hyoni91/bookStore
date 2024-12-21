import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ItemList = () => {
  const [itemList, setItemList] = useState([])

  useEffect(()=>{
    axios.get('/api_member/itemList')
    .then((res)=>{
      setItemList(res.data)
      console.log(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])

  return (
    <div className='joinpage'>
      <table>
        <colgroup>
          <col width={'20%'}/>
          <col width={'40%'}/>
          <col width={'25%'}/>
          <col width={'*'}/>
        </colgroup>
        <thead>
          <tr>
            <td>카테고리</td>
            <td>제목</td>
            <td>가격</td>
            <td>판매현황</td>
          </tr>
        </thead>
        <tbody>
        {
          itemList.map((item,i)=>{
              return(
              <tr key={i}>
              <td>{item.category.cateName}</td>  
              <td>{item.itemName}</td>
              <td>{item.itemPrice}</td>
              <td>{item.itemStatus}</td>
            </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default ItemList