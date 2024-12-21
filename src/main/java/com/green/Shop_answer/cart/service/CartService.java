package com.green.Shop_answer.cart.service;

import com.green.Shop_answer.cart.vo.CartVO;

import java.util.List;

public interface CartService {

    //장바구니 담기
    void cartInsert(CartVO cartVO);

    //장바구니 목록
    List<CartVO> cartList(String memId);

    //장바구니 선택 삭제
    void cartDelete(List<Integer> cartNumList);

    //장바구니 단일 삭제
    void cartDeleteInt(int cartNum);
}
