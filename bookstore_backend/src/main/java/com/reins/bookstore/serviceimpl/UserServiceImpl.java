package com.reins.bookstore.serviceimpl;

import com.reins.bookstore.dao.AddressDao;
import com.reins.bookstore.dao.UserDao;
import com.reins.bookstore.entity.Address;
import com.reins.bookstore.entity.User;
import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.repository.AddressRepository;
import com.reins.bookstore.repository.UserAuthRepository;
import com.reins.bookstore.repository.UserRepository;
import com.reins.bookstore.service.UserService;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Set;

/**
 * @ClassName UserServiceImpl
 * @Description the implement of user service
 * @Author thunderBoy
 * @Date 2019/11/7 13:16
 */
@Service
public class UserServiceImpl implements UserService {


    @Autowired
    private UserDao userDao;

    @Autowired
    private AddressDao addressDao;


    @Override
    public UserAuth checkUser(String username, String password) {
        return userDao.verifyLogin(username,password);
    }

    @Override
    public Msg register(String username, String pw, String email){
        UserAuth uA = userDao.checkDuplicateUsername(username);
        if(uA != null)
            return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.USERNAME_EXISTS_ERROR);
        UserAuth newUA = new UserAuth(username,pw);
        UserAuth createdUA = userDao.saveAuth(newUA);
        User newUser = new User(createdUA.getUserId(),email);
        userDao.saveProfile(newUser);
        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);
    }

    @Override
    public User getUser(Integer userId){
        return userDao.getUserProfile(userId);
    }

    @Override
    public boolean softRemove(Integer userId){
        return userDao.softRemove(userId);
    }

    @Override
    public UserAuth getUserAccount(Integer userId){
        return userDao.getUserAccount(userId);
    }

    @Override
    public List<UserAuth> getUsers(Integer type){
        return userDao.getUserByType(type);
    }

    @Override
    public void setLock(Integer id,Boolean lock){
        UserAuth uA = userDao.getUserAccount(id);
        uA.setLocked(lock);
        userDao.saveAuth(uA);
    }

    @Override
    public Set<Address> getAllUserAddress(Integer userId){
        User u = userDao.getUserProfile(userId);
        return u.getAddresses();
    }



    @Override
    public Address addAddress(Address add){
        return addressDao.saveAddress(add);
    }

    @Override
    public void removeAddress(Integer addressId){
        addressDao.removeAddress(addressId);
    }

    @Override
    public void setUserCookie(Integer id, String cookie){
         userDao.setUserCookie(id,cookie);
    }

    @Override
    public UserAuth getByCookie(String cookie){
        return userDao.getByCookie(cookie);
    }
}
