package com.reins.bookstore.controller;

import com.reins.bookstore.compositeKey.CartId;
import com.reins.bookstore.entity.Cart;
import com.reins.bookstore.service.BookService;
import com.reins.bookstore.service.CartService;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
//import jdk.jfr.Frequency;
import net.sf.json.JSON;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import net.sf.json.JSONObject;


import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Objects;
@RestController
public class CartController {

    @Autowired
    private CartService cartService;


    @RequestMapping("/updateQuantity")
    public boolean updateQuantity(@RequestParam("userId") Integer userId, @RequestParam("bookId") Integer bookId, @RequestParam("quantity") Integer quantity ){
        Cart item = cartService.getCartItem(userId,bookId);
        cartService.updateQuantity(item,quantity);
            return true;
    }

    @Transactional
    @RequestMapping("/deleteCartItem")
    public boolean deleteCartItem(@RequestParam("userId") Integer userId, @RequestParam("bookId") Integer bookId ){
        cartService.deleteItem(userId,bookId);
        return true;

    }

    @RequestMapping("/addToCart")
    public Msg addToCart(@RequestParam("userId") Integer userId, @RequestParam("bookId") Integer bookId, @RequestParam("quantity") Integer quantity){

        Cart newItem = new Cart(userId,bookId,quantity);
        boolean exists = cartService.checkInCart(userId,bookId);

        if (!exists){
            cartService.saveCartItem(newItem);
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.ERROR_MSG);

        }


    }
}
