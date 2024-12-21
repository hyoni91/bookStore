package com.green.Shop_answer.item.vo;

import lombok.Data;

import java.util.List;

@Data
public class ItemVO {
    private int itemCode;
    private String itemName;
    private int itemPrice;
    private String itemIntro;
    private int itemStock;
    private String itemStatus;
    private int cateCode;
    private CategoryVO category;
    private List<ImgVO> imgList;
}
