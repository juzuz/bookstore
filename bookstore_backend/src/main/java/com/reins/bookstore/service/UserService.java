package com.reins.bookstore.service;

import com.reins.bookstore.entity.Address;
import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.entity.User;
import com.reins.bookstore.utils.msgutils.Msg;

import java.util.List;
import java.util.Set;


public interface UserService {

    UserAuth checkUser(String username, String password);
    User getUser(Integer userId);
    boolean softRemove(Integer userId);
    UserAuth getUserAccount(Integer userId);
    List<UserAuth> getUsers(Integer type);
    void setLock(Integer id,Boolean lock);
    Msg register(String username, String pw, String email);
    Set<Address> getAllUserAddress(Integer userId);
    Address addAddress(Address add);
    void removeAddress(Integer addressId);
    void setUserCookie(Integer id, String cookie);
    UserAuth getByCookie(String cookie);
}
