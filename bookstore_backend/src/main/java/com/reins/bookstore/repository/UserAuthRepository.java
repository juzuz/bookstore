package com.reins.bookstore.repository;

import com.reins.bookstore.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface UserAuthRepository extends JpaRepository<UserAuth,Integer>{

//    @Query(value = "from UserAuth where username = :username and password = :password")
//    UserAuth checkUser(@Param("username") String username, @Param("password") String password);

        public UserAuth findByUsernameAndPassword(String username, String password);
        public UserAuth findByUsername(String username);
        public List<UserAuth> findAllByUserTypeAndRemoved(Integer userType,boolean removed);
        public List<UserAuth> findAllByRemoved(boolean removed);
        public UserAuth findByCookie(String cookie);
}
