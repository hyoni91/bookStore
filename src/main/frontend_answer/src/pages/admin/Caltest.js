import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './Caltest.css'
import moment from "moment";

// 시간등 픽업하는 라이브러리
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const Caltest = () => {

  const [value, onChange] = useState(new Date()) //초기값은 현재 날짜
  console.log(value)

  // 캘린터 픽업
  const [startDate, setStartDate] = useState(Date | null > (new Date()))



  return (
    // 클릭할때 마다 클릭한 날짜로 변경
  <div>
      <div><Calendar onChange={onChange} value={value}/></div>
      
      {/* 캘린더픽업 */}
      {/*     
      <ReactDatePicker 
      selected={startDate}
      onChange={(date) => setStartDate(date)}/> */}
      
      <div>
        <p>예약닐짜</p>
        <div>
            {/* 내가 클릭한 날짜 선택  */}
        {moment(value).format("YYYY-MM-DD")}
      </div>
        <p>예약시간</p>

      </div>
  </div>
  )
}

export default Caltest