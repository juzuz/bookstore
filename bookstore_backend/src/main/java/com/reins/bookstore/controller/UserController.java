package com.reins.bookstore.controller;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.reins.bookstore.entity.Address;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.entity.User;
import com.reins.bookstore.service.CartService;
import com.reins.bookstore.service.UserService;
import com.sun.istack.Nullable;
import net.sf.json.JSON;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.Embeddable;
import javax.transaction.Transactional;
import java.io.Serializable;
import java.util.*;

/**
 * @ClassName UserController
 * @Description the controller of user
 * @Author thunderBoy
 * @Date 2019/11/7 13:47
 */
@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private CartService cartService;


    @RequestMapping("/checkUser")
    public UserAuth checkUser(@RequestParam("username") String username,@RequestParam("password") String password){
        return userService.checkUser(username, password);
    }

    @RequestMapping("/getUser")
    public JSONObject getUser(@RequestParam("userId") Integer userId){
        JSONObject obj = new JSONObject();
        String username = userService.getUserAccount(userId).getUsername();
        User user = userService.getUser(userId);
        obj.put("username", username);
        obj.put("email",user.getEmail());

        if (user.getName()==null)
            obj.put("name" , "");
        else
            obj.put("name", user.getName());
        if (user.getTel()==null)
            obj.put("tel" , "");
        else
            obj.put("tel", user.getTel());
        return obj;
    }


    @RequestMapping("/getUsers")
    public List<JSONObject> getUsers(@RequestParam("type") Integer type){
        List<JSONObject> userInfos = new ArrayList<>();
        List<UserAuth> users = userService.getUsers(type);
        for(UserAuth uA: users){
            JSONObject userInfo = new JSONObject();
            userInfo.put("id", uA.getUserId());
            userInfo.put("username",uA.getUsername());
            userInfo.put("locked",uA.getLocked());
            userInfos.add(userInfo);
        }
        return userInfos;
    }


    @RequestMapping("/getCart")
    public List<JSONObject> getCart(@RequestParam("userId") Integer id) {
        List<JSONObject> data = new ArrayList<>();
        User user = userService.getUser(id);
        Set<Book> booksInCart = user.getInCart();
        for(Book tmp:booksInCart){
            int q = cartService.getCartItem(id,tmp.getId()).getQuantity();
            JSONObject obj = new JSONObject();
            obj.put("book",tmp);
            obj.put("amount",q);
            data.add(obj);

        }
        return data;
    }

    @RequestMapping("/setLock")
    public void setLock(@RequestParam("lock") Boolean lock,@RequestParam("id") Integer id){
        userService.setLock(id,lock);
    }

    @RequestMapping("/getAddress")
    public Set<Address> getAddress(@RequestParam("userId") Integer userId){
        return userService.getAddress(userId);
    }

    @RequestMapping("/addAddress")
    public Address addAddress(@RequestParam("userId") Integer userId, @RequestParam("name") String name,
                           @RequestParam("phone") String phone, @RequestParam("address") String address)
    {
        Address add = new Address(userId,name,phone,address);

        return userService.addAddress(add);
    }

    @Transactional
    @RequestMapping("/removeAddress")
    public boolean removeAddress(@RequestParam("addressId") Integer addressId){
        userService.removeAddress(addressId);
        return true;
    }
}

