package com.green.Shop_answer.item.controller;

import com.green.Shop_answer.item.service.ItemService;
import com.green.Shop_answer.item.vo.ItemVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api_item")
public class ItemController {

    @Resource(name = "itemService")
    private ItemService itemService;

    @GetMapping("/itemDetail/{itemCode}")
    public ItemVO itemDetail(@PathVariable("itemCode") int itemCode){
        System.out.println(itemCode);
        return itemService.itemDetail(itemCode);
    }


    @GetMapping("/cate1List/{cateNum}")
    public List<ItemVO> cate1List(@PathVariable("cateNum") int cateNum){
        System.out.println(cateNum);
        return itemService.cate1List(cateNum);
    }


}
