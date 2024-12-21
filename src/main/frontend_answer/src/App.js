import './App.css';
import './reset.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import UserLayout from './pages/user/UserLayout';
import AdminLayout from './pages/admin/AdminLayout';
import Join from './pages/user/Join';
import Login from './pages/user/Login';
import { useEffect, useState } from 'react';
import RegItem from './pages/admin/RegItem';
import ItemList from './pages/user/ItemList';
import DisplayItem from './pages/user/DisplayItem';
import ItemDetail from './pages/user/ItemDetail';
import Cate1 from './pages/user/Cate1';
import ItemManage from './pages/admin/ItemManage';
import CategoryManage from './pages/admin/CategoryManage';
import SaleHistoryOfMonth from './pages/admin/SaleHistoryOfMonth';
import SearchUser from './pages/admin/SearchUser';
import RecordOfMonth from './pages/admin/RecordOfMonth';
import MyCartPage from './pages/user/MyCartPage';
import { BsCart4 } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdOutlineManageHistory } from "react-icons/md";
import UserInfo from './pages/admin/UserInfo';




//새로고침 : State변수의 값이 전부 초기화된다.
//재랜더링 : State변수의 값은 보존된다.
function App() {
  const navigate = useNavigate()

  //로그인 정보를 담을 state변수 
  const [loginInfo,setLoginInfo] = useState({});
  
  //loginInfo의 state변수는 새로고침을하면 변수 값이 초기화됨
  //새로고침을 하더라도 세션스토리지의 정보는 존재하기때문에, 만약 새로고침을 할 때 로그인 정보가 세션스토리지에 남아 있다면 loginInfo(State변수)에 로그인 정보를 저장 시켜야 한다.
  useEffect(()=>{
    //마운트 시(새로고침되면) 세션스토리지의 로그인 정보 가져오기(null이면 로그아웃 된거!) 
    //getItem(key값)  이거 useState변수 아님!! Login.js의 세션스토리지 키값임!!!  
    const sessionStorage = window.sessionStorage.getItem('loginInfo')
    
    //만약 세션스토리지의 값이 null이 아니면 (로그인유지중)
    if(sessionStorage != null){
      //로그인 State변수에 세션스토리지 값을 저장
      //주의! 스토리지값은 문자열 --> 객체로 변환 JSON
      const obj_loginInfo = JSON.parse(sessionStorage);

      //로그인 정보를 state변수에 저장
      setLoginInfo(obj_loginInfo);

      //이때! 문제? 맨 처음엔 빈값이 들어간다. --> useEffect는 모든 그림을 그린 후 실행된다.
    }
  },[])


  return (
    <div className="container">
      <div className='login-div'>
      <div className='header'>
          <div className='bookstore'>
            <span onClick={()=>{navigate('')}} >BOOK STORE
            </span>
          </div>
          {
            //빈 객채인지 확인 : object.keys() -> 객체 안의 모든 키값
          Object.keys(loginInfo) != 0 ?
          <div className='login-content'>
            <span className='login_memId'>'{loginInfo.memId}'님</span>
            <span onClick={()=>{
              //로그아웃 => 세션스토리지의 정보 삭제
              window.sessionStorage.removeItem('loginInfo')
              //로그인 State의 변수 값을 비워줌
              setLoginInfo({});
              // 상품 목록 페이지로 이동
              navigate('/')
            }} ><RiLogoutBoxRLine size={'22'} className='logout-icon'/></span>
            {
              loginInfo.memRole == 'ADMIN'?
              <span onClick={()=>{navigate('/admin/management')}}><MdOutlineManageHistory size={'22'} className='anmin-icon'/></span>
              :
              <span onClick={()=>{navigate('/my_cart_page')}}><BsCart4 size={'22'}/></span>
            }
          </div>
          :
          <div>
            <span onClick={()=>{navigate('loginForm')}}>LOGIN</span>
            <span onClick={()=>{navigate('join')}}>JOIN</span>
          </div>
        }
          
        </div>
        <div className='banner'>
          <div>
            <img className='banner-img' src='http://localhost:8080/images/book_banner.jpg' />
          </div>
          <div className='title-div'></div>
        </div>
        
      </div>
      <div className='layout-div'>
        <Routes>

          {/* user route */}
          <Route path='/' element={<UserLayout/>}>
            <Route path='' element={<DisplayItem />}/>
            <Route path='join' element={<Join />}/>
            <Route path='loginForm' element={<Login setLoginInfo={setLoginInfo} loginInfo={loginInfo} />}/>
            <Route path='cate1List/:cateNum' element={<Cate1 />} />
            <Route path='book_detail/:itemCode' element={<ItemDetail />}/>
            <Route path='my_cart_page' element={<MyCartPage />}/>
            {/* <Route path='test' element={<KakaoTest />} /> */}
          </Route>

          {/* admin route */}
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='management' element={<ItemManage />}/>
            <Route path='regItem' element={<RegItem />}/>
            <Route path='category_management' element={<CategoryManage />}/>
            <Route path='sale_history_month' element={<SaleHistoryOfMonth />}/>
            <Route path='search_user' element={<SearchUser />}/>
            <Route path='record_month' element={<RecordOfMonth />}/>
            {/* <Route path='userInfo/:memId' element={<UserInfo />}/> */}
            {/* <Route path='test2' element={<KakaoTest />}/> */}
          </Route>

        </Routes>
      </div>

    </div>
  );
}

export default App;

