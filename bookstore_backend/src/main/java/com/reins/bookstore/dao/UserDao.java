package com.reins.bookstore.dao;

import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.entity.User;
import java.util.List;


public interface UserDao {

    UserAuth verifyLogin(String username,String password);
    UserAuth checkDuplicateUsername(String username);
    UserAuth saveAuth(UserAuth uA);
    UserAuth getUserAccount(Integer userId);
    List<UserAuth> getUserByType(Integer type);
    void saveProfile(User user);
    User getUserProfile(Integer userId);
    void setUserCookie(Integer id, String cookie);
    boolean softRemove(Integer userId);
    UserAuth getByCookie(String cookie);
}
