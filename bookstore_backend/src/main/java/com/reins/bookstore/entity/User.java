package com.reins.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.reins.bookstore.compositeKey.AddressId;
import lombok.Data;

import javax.persistence.*;
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
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
public class User {
    private Integer userId;
    private String name = null;
    private String tel = null;
    private String email = null;

    private Set<Book> inCart = new HashSet<>();
    private Set<Address> addresses = new HashSet<>();


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


    public String getTel(){
        return tel;
    }
    public void setTel(String tel){
        this.tel = tel;
    }



    @ManyToMany(cascade ={CascadeType.PERSIST, CascadeType.MERGE},fetch = FetchType.EAGER)
    @JoinTable(name="CART",
            joinColumns = @JoinColumn(name="userId",referencedColumnName = "userId"),
            inverseJoinColumns = @JoinColumn(name="bookId",referencedColumnName = "id")
    )
    public Set<Book> getInCart(){
        return inCart;
    }
    public void setInCart(Set<Book> inCart){
        this.inCart = inCart;
    }

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "userId")
    public Set<Address> getAddresses() { return addresses;}

    public void setAddresses(Set<Address> addresses) {
        this.addresses = addresses;
    }

}
