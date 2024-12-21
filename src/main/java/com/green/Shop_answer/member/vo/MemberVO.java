package com.green.Shop_answer.member.vo;

import com.green.Shop_answer.item.vo.ItemVO;
import lombok.Data;

import java.util.List;

@Data
public class MemberVO {
    private String memId;
    private String memPw;
    private String memName;
    private String memTel;
    private String post;
    private String memAddr;
    private String addrDetail;
    private String memEmail;
    private String memRole;
    private List<ItemVO> itemList;
}
