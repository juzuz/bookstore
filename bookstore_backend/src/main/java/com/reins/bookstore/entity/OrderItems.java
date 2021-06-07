package com.reins.bookstore.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.reins.bookstore.compositeKey.OrderItemId;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "ORDERITEMS")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@IdClass(OrderItemId.class)
public class OrderItems {
    @Id
    @Column(name = "order_id")
    private Integer orderId;
    @Id
    @Column(name = "book_id")
    private Integer bookId;

    private int quantity;

    public OrderItems(){};

    public OrderItems(Integer orderId,Integer bookId, int quantity){
        this.orderId = orderId;
        this.bookId = bookId;
        this.quantity = quantity;
    }


    public Integer getOrderId(){
        return orderId;
    }
    private void setOrderId(Integer id){
        this.orderId = id;
    }

    public Integer getBookId(){
        return bookId;
    }
    private void setBookId(Integer id){
        this.bookId = id;
    }

    public int getQuantity(){
        return  quantity;
    }
    public  void  setQuantity(int quantity){
        this.quantity = quantity;
    }



}
