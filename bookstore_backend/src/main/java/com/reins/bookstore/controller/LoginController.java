package com.reins.bookstore.controller;

import com.reins.bookstore.constant.Constant;
import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.service.UserService;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import com.reins.bookstore.utils.sessionutils.SessionUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.Map;


/**
 *@ClassName LoginController
 *@Description Controller for login
 *@Author thunderBoy
 *@Date 2019-11-05 15:09
 */
@RestController
public class LoginController {


    @Autowired
    private UserService userService;


    /**
     * @Description: login
     * @Param: username,password,remember
     * @return: Msg
     * @Author: thunderBoy
     */
    @RequestMapping("/login")
    //public Msg login(@RequestParam(Constant.USERNAME) String username, @RequestParam(Constant.PASSWORD) String password, @RequestParam(Constant.REMEMBER_ME) Boolean remember){
    public Msg login(@RequestBody Map<String, String> params){
        String username = params.get(Constant.USERNAME);
        String password = params.get(Constant.PASSWORD);
        String cookie = params.get(Constant.COOKIE);

        UserAuth auth = userService.checkUser(username, password);
        if(auth != null && !auth.getRemoved()){

            boolean locked = auth.getLocked();
            if (locked){
                return MsgUtil.makeMsg(MsgCode.ERROR,MsgUtil.ERROR_LOCKED);
            }

            userService.setUserCookie(auth.getUserId(),cookie);

            JSONObject obj = new JSONObject();
            obj.put(Constant.USER_ID, auth.getUserId());
            obj.put(Constant.USERNAME, auth.getUsername());
            obj.put(Constant.USER_TYPE, auth.getUserType());
            SessionUtil.setSession(obj);


            JSONObject data = JSONObject.fromObject(auth);
            data.remove(Constant.PASSWORD);

            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGIN_SUCCESS_MSG, data);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.LOGIN_USER_ERROR);
        }
    }

    @RequestMapping("/logout")
    public Msg logout(@RequestParam(value="id") Integer id){

        userService.setUserCookie(id,"");

        Boolean status = SessionUtil.removeSession();

        if(status){
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGOUT_SUCCESS_MSG);
        }
        return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.LOGOUT_ERR_MSG);
    }

    @RequestMapping("/register")
    public Msg register(@RequestParam("username") String username, @RequestParam("password") String pw, @RequestParam("email") String email){
        Msg msg = userService.register(username,pw,email);
        return msg;
    }

    /**
     * @Description: getSession
     * @Param: null
     * @return: Msg
     * @Author: thunderBoy
     */
    @RequestMapping("/checkSession")
    public Msg checkSession(){
        JSONObject auth = SessionUtil.getAuth();

        if(auth == null){
            return MsgUtil.makeMsg(MsgCode.NOT_LOGGED_IN_ERROR);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGIN_SUCCESS_MSG, auth);
        }
    }

    @RequestMapping("/checkCookie")
    public Msg checkCookie(@RequestParam String cookie){
        System.out.println(cookie);
        UserAuth uA = userService.getByCookie(cookie);
        if(uA == null){
            return MsgUtil.makeMsg(MsgCode.COOKIE_LOGIN_FAIL);
        }
        else{
            JSONObject obj = new JSONObject();
            obj.put(Constant.USER_ID, uA.getUserId());
            obj.put(Constant.USERNAME, uA.getUsername());
            obj.put(Constant.USER_TYPE, uA.getUserType());
            return  MsgUtil.makeMsg(MsgCode.SUCCESS,MsgUtil.LOGIN_SUCCESS_MSG);
        }
    }
}
