package com.reins.bookstore.repository;

import com.reins.bookstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface UserRepository extends JpaRepository<User,Integer> {

//    @Query("select u from User u where u.userId = :userId")
//    User getUser(@Param("userId") int userId);

//    @Query("select u from User u left join UserAuth ua on u.userId = ua.userId where ua.userType = :type")
//    List<User> getUsers(@Param("type") int type);
}
