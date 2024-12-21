package com.green.Shop_answer.admin.Service;

import com.green.Shop_answer.admin.vo.SearchVO;
import com.green.Shop_answer.item.vo.CategoryVO;
import com.green.Shop_answer.item.vo.ItemVO;
import com.green.Shop_answer.member.vo.MemberVO;

import java.util.List;

public interface AdminService {

    //category 목록조회
    List<CategoryVO> categoryList();

    //아이템 등록
    void insetItem(ItemVO itemVO);

    //상품이지미등록
    void insertImgs(ItemVO itemVO);

    //다음에 들어갈 item_code 조회
    int getNextItemCode();

    //모든 유저 정보
    List<MemberVO> memberSelect(SearchVO searchVO);

    //한 유저의 상세정보
    MemberVO userInfo(String memId);
}
