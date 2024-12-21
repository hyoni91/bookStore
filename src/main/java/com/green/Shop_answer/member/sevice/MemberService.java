package com.green.Shop_answer.member.sevice;


import com.green.Shop_answer.item.vo.ItemVO;
import com.green.Shop_answer.member.vo.MemberVO;

import java.util.List;

public interface MemberService {

    //회원가입
    void join(MemberVO memberVO);

    //id중복체크
    boolean idChk(String memId);

    //로그인
    MemberVO login(MemberVO memberVO);

    //상품 목록 리스트
    List<ItemVO> itemList();

}
