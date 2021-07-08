package com.reins.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import com.reins.bookstore.compositeKey.CartId;


import javax.persistence.*;
import java.io.Serializable;


/**
 * @ClassName Book
 * @Description Book Entity
 * @Author thunderBoy
 * @Date 2019/11/5 19:19
 */
@Data
@Entity
@Table(name = "CART")
//@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@IdClass(CartId.class)
public class Cart implements Serializable {
    @Id
    private Integer userId;
    @Id
    private Integer bookId;

    private int quantity;

    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    @JoinColumn(name="bookId",referencedColumnName = "id",insertable = false,updatable = false)
    private Book book;

    public Cart(){};

    public Cart(Integer userId,Integer bookId, int quantity){
        this.userId = userId;
        this.bookId = bookId;
        this.quantity = quantity;
    }


//    public Integer getUserId(){
//        return userId;
//    }
//    private void setUserId(Integer id){
//        this.userId = id;
//    }
//
//    public Integer getBookId(){
//        return bookId;
//    }
//    private void setBookId(Integer id){
//        this.bookId = id;
//    }
//
//    public int getQuantity(){
//        return  quantity;
//    }
//    public  void  setQuantity(int quantity){
//        this.quantity = quantity;
//    }
//

    public Book getBook(){return book;}
    private void setBook(Book book){this.book = book;}
}
