package com.reins.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.reins.bookstore.compositeKey.AddressId;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @ClassName User
 * @Description Entity of User
 * @Author thunderBoy
 * @Date 2019/11/7 12:46
 */
@Data
@Entity
@Table(name = "USER")
public class User {
    private Integer userId;
    private String name = null;
    private String tel = null;
    private String email = null;

    private Set<Cart> userCart = new HashSet<>();
    private Set<Address> addresses = new HashSet<>();
    private List<Orders> userOrders = new ArrayList<>();


    public User(){};
    public User(Integer userId, String email){
        this.userId = userId;
        this.email = email;

    }
    @Id
    public Integer getUserId(){
        return userId;
    }
    private void setUserId(Integer userId){
        this.userId=userId;
    }



    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name="userId")
    public Set<Cart> getUserCart(){ return userCart;}
    public void setUserCart(Set<Cart> uCart){this.userCart = uCart;}


    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "userId")
    public Set<Address> getAddresses() { return addresses;}
    private void setAddresses(Set<Address> addresses) {
        this.addresses = addresses;
    }


    @OneToMany(cascade = {CascadeType.MERGE,CascadeType.PERSIST},fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",referencedColumnName = "userId")
    public List<Orders> getUserOrders(){ return userOrders;}
    private void setUserOrders(List<Orders> uOrders){this.userOrders = uOrders;}


}
