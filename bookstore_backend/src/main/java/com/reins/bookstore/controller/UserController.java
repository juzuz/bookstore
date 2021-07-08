package com.reins.bookstore.controller;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.reins.bookstore.entity.*;
import com.reins.bookstore.service.CartService;
import com.reins.bookstore.service.OrderService;
import com.reins.bookstore.service.UserService;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
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
    private OrderService orderService;


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

    @RequestMapping("/deleteUser")
    public Msg deleteUser(@RequestParam Integer id){

        boolean status = userService.softRemove(id);

        if (status){
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.ERROR_MSG);

        }
    }

    @RequestMapping("/getCart")
    public List<JSONObject> getCart(@RequestParam("userId") Integer id) {
        List<JSONObject> data = new ArrayList<>();
        User user = userService.getUser(id);

        Set<Cart> userCart = user.getUserCart();
        for (Cart tCart: userCart){
            Book book = tCart.getBook();
            JSONObject obj = new JSONObject();
            obj.put("book",book);
            obj.put("amount",tCart.getQuantity());
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
        return userService.getAllUserAddress(userId);
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
        List<Orders> orderWithAdd = orderService.findAllOrdersWithAddress(addressId);
        for (Orders o: orderWithAdd){
            o.setAddressBackup(o.getAddress().getName() + "@" + o.getAddress().getPhone()  + "@" +  o.getAddress().getAddress());
            o.setAddressId(null);
            o.setAddress(null);
        }
        userService.removeAddress(addressId);
        return true;
    }

    @RequestMapping("/getOrders")
    public Page<Orders> getOrders(@RequestParam(value = "id") Integer userId,Optional<Integer> page){



        List<Orders> orders = userService.getUser(userId).getUserOrders();
        int size = 5;
        PageRequest pageRequest = PageRequest.of(page.orElse(0), size);
        int total = orders.size();
        int start = Math.toIntExact(pageRequest.getOffset());
        int end = Math.min((start + pageRequest.getPageSize()), total);
        List<Orders> output = new ArrayList<>();
        if (start <= end) {
            output = orders.subList(start, end);
        }
        return new PageImpl<>(
                output,
                pageRequest,
                total
        );

    }
}

