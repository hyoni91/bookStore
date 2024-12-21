package com.green.Shop_answer.cart.service;

import com.green.Shop_answer.cart.vo.CartVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.IllegalFormatCodePointException;
import java.util.List;
import java.util.Map;

@Service("cartService")
public class CartServiceImpl implements CartService{

    @Autowired
    private SqlSessionTemplate sqlSession;


    //장바구니 등록
    @Override
    public void cartInsert(CartVO cartVO) {
        // 장바구니에 상품 존재 여부 확인하기
        Integer chkCart = sqlSession.selectOne("answerCartMapper.checkCart", cartVO);
        if(chkCart != null ){
            // 있으면 update
            sqlSession.update("answerCartMapper.update", cartVO);
        }else // 없으면 insert
            sqlSession.insert("answerCartMapper.cartInsert",cartVO);
    }


    //장바구니 목록
    @Override
    public List<CartVO> cartList(String memId) {
        return sqlSession.selectList("answerCartMapper.cartList", memId);
    }

    //장바구니 삭제
    @Override
    public void cartDelete(List<Integer> cartNumList) {
        Map<String, Object> params = new HashMap<>();
        params.put("cartNumList", cartNumList);
        sqlSession.delete("answerCartMapper.delete", params);
    }

    @Override
    public void cartDeleteInt(int cartNum) {
        sqlSession.delete("answerCartMapper.delete2", cartNum);
    }


}
