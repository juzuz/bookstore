package com.reins.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * @ClassName UserAuth
 * @Description Entity of UserAuth
 * @Author thunderBoy
 * @Date 2019/11/7 13:07
 */
@Data
@Entity
@Table(name = "userAuth")
public class UserAuth {
    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private Integer userId;
    private String username;
    private String password;
    private Integer userType = 1;
    private boolean locked = false;
    private boolean removed = false;
    private String cookie = "";

    public UserAuth(){};
    public UserAuth(String username, String pw) {
        this.username = username;
        this.password = pw;
    }

    public boolean getLocked(){ return locked;}
    public void setLocked(boolean lock){ this.locked = lock;}

    public boolean getRemoved(){return removed;}
    public void setRemoved(boolean rem){this.removed=rem;}

}
