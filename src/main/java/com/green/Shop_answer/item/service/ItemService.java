package com.green.Shop_answer.item.service;

import com.green.Shop_answer.item.vo.ItemVO;

import java.util.List;

public interface ItemService {

    ItemVO itemDetail(int itemCode);

    //인터넷/it 목록
    List<ItemVO> cate1List(int cateNum);


}
