package com.reins.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.reins.bookstore.compositeKey.AddressId;
import com.reins.bookstore.compositeKey.CartId;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * @ClassName Book
 * @Description Book Entity
 * @Author thunderBoy
 * @Date 2019/11/5 19:19
 */




@Data
@Entity
@Table(name = "ADDRESS")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
//@IdClass(AddressId.class)
public class Address {
    private Integer addressId;
    private Integer userId;
    private String address;
    private String name;
    private String phone;

    public Address() {}

    public Address(Integer userId, String name, String phone, String address) {
        this.userId = userId;
        this.name=name;
        this.phone=phone;
        this.address=address;
    }
    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    public Integer getAddressId(){return addressId;}
    private void setAddressId(Integer add){this.addressId = add;}

    public Integer getUserId(){
        return userId;
    }
    private void setUserId(Integer id){
        this.userId = id;
    }
    public String getAddress() {return address;}
    public void setAddress(String add){ this.address = add;}

    public String getName(){return name;}
    public void setName(String name){this.name=name;}

    public String getPhone(){return phone;}
    public void setPhone(String num){this.phone=num;}




}
