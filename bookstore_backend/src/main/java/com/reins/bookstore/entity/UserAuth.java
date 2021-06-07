package com.reins.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * @ClassName UserAuth
 * @Description Entity of UserAuth
 * @Author thunderBoy
 * @Date 2019/11/7 13:07
 */

@Entity
@Table(name = "userAuth")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "userId")
public class UserAuth {

    private Integer userId;

    private String username;

    private String password;
    private Integer userType = 1;
    private boolean locked = false;

    public UserAuth(){};
    public UserAuth(String username, String pw) {
        this.username = username;
        this.password = pw;
    }
    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }

    public boolean getLocked(){ return locked;}
    public void setLocked(boolean lock){ this.locked = lock;}
}
