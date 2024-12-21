package com.green.Shop_answer.cart.controller;

import com.green.Shop_answer.cart.service.CartService;
import com.green.Shop_answer.cart.vo.CartVO;
import com.green.Shop_answer.item.vo.ItemVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api_cart")
public class CartController {

    @Resource(name = "cartService")
    private CartService cartService;

    //장바구니 등록
    @PostMapping("/cartInsert")
    public void cartInsert(@RequestBody CartVO cartVO){
        System.out.println("=====================" + cartVO);
        cartService.cartInsert(cartVO);
    }

    //장바구니 목록
    @GetMapping("/cartList/{memId}")
    public List<CartVO> cartList(@PathVariable("memId") String memId){
        return cartService.cartList(memId);
    }

    //장바구니 선택 삭제
    @DeleteMapping("/cartDelete")
    public void cartDelete(@RequestBody List<Integer> cartNumList){
        System.out.println("===================================="+cartNumList);
        cartService.cartDelete(cartNumList);
    }

    //장바구니 단일 삭제
    @DeleteMapping("/cartDeleteInt/{cartNum}")
    public void cartDeleteInt(@PathVariable("cartNum") int cartNum){
        cartService.cartDeleteInt(cartNum);
    }

}
