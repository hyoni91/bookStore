package com.green.Shop_answer.member.sevice;


import com.green.Shop_answer.item.vo.ItemVO;
import com.green.Shop_answer.member.vo.MemberVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("memberService")
public class MemberServiceImpl implements MemberService {
    @Autowired
    private SqlSessionTemplate sqlSession;


    @Override
    public void join(MemberVO memberVO) {
        sqlSession.insert("answerMemberMapper.join", memberVO);
    }

    @Override
    public boolean idChk(String memId) {
       String idChk = sqlSession.selectOne("answerMemberMapper.isDuplicate", memId);

        return idChk != null;
    }

    @Override
    public MemberVO login(MemberVO memberVO) {
        return sqlSession.selectOne("answerMemberMapper.login", memberVO);
    }

    @Override
    public List<ItemVO> itemList() {
        return sqlSession.selectList("answerItemMapper.itemList");
    }


}
