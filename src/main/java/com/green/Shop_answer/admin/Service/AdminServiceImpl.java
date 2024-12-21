package com.green.Shop_answer.admin.Service;


import com.green.Shop_answer.admin.vo.SearchVO;
import com.green.Shop_answer.item.vo.CategoryVO;
import com.green.Shop_answer.item.vo.ItemVO;
import com.green.Shop_answer.member.vo.MemberVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("adminService")
public class AdminServiceImpl implements AdminService{

    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public List<CategoryVO> categoryList() {
        return sqlSession.selectList("answerAdminMapper.getCategoryList");
    }

    @Override
    public void insetItem(ItemVO itemVO) {
        sqlSession.insert("answerAdminMapper.insertItem", itemVO);
    }

    @Override
    public void insertImgs(ItemVO itemVO) {
        sqlSession.insert("answerAdminMapper.insertImgs", itemVO);
    }

    //다음에 들어갈 item_code조회
    @Override
    public int getNextItemCode() {
        return sqlSession.selectOne("answerAdminMapper.getNextItemCode");
    }

    @Override
    public List<MemberVO> memberSelect(SearchVO searchVO) {
        return sqlSession.selectList("answerMemberMapper.memselect",searchVO);

    }

    //user 상세정보
    @Override
    public MemberVO userInfo(String memId) {
        return sqlSession.selectOne("answerMemberMapper.userInfo", memId);
    }


}
