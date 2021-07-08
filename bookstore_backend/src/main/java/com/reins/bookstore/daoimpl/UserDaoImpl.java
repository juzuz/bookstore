package com.reins.bookstore.daoimpl;

import com.reins.bookstore.constant.Constant;
import com.reins.bookstore.dao.UserDao;
import com.reins.bookstore.entity.User;
import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.repository.AddressRepository;
import com.reins.bookstore.repository.UserAuthRepository;
import com.reins.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;


/**
 * @ClassName UserDaoImpl
 * @Description the implement of user dao
 * @Author thunderBoy
 * @Date 2019/11/7 13:19
 */
@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    UserAuthRepository userAuthRepository;

    @Autowired
    UserRepository userRepository;



    @Override
    public UserAuth verifyLogin(String username, String password){
        return userAuthRepository.findByUsernameAndPassword(username, password);
    }

    @Override
    public UserAuth checkDuplicateUsername(String username){
        return userAuthRepository.findByUsername(username);
    }

    @Override
    public UserAuth saveAuth(UserAuth uA){
        return userAuthRepository.save(uA);
    }

    @Override
    public void saveProfile(User user){
        userRepository.save(user);
    }

    @Override
    public User getUserProfile(Integer userId){
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public UserAuth getUserAccount(Integer userId){
        return userAuthRepository.findById(userId).orElse(null);
    }

    @Override
    public List<UserAuth> getUserByType(Integer type){
        if(type == -1)
            return userAuthRepository.findAllByRemoved(false);
        return userAuthRepository.findAllByUserTypeAndRemoved(type,false);
    }

    @Override
    public boolean softRemove(Integer userId){
        UserAuth uA = userAuthRepository.findById(userId).orElse(null);
        if(uA == null)
            return false;

        uA.setRemoved(true);
        userAuthRepository.save(uA);
        return true;
    }

    @Override
    public void setUserCookie(Integer id, String cookie){
        UserAuth uA = userAuthRepository.findById(id).orElse(null);
        if(uA != null){
            uA.setCookie(cookie);
        }
        userAuthRepository.save(uA);
    }

    @Override
    public UserAuth getByCookie(String cookie){
        return userAuthRepository.findByCookie(cookie);
    }
}
