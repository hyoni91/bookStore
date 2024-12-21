package com.green.Shop_answer.cart.vo;

import com.green.Shop_answer.item.vo.ItemVO;
import lombok.Data;

import java.util.List;

@Data
public class CartVO {
    private int cartCode;
    private int cartCnt;
    private int itemCode;
    private String memId;
    private String cartDate;
    private ItemVO item;
    private List<Integer> cartNumList;
}
