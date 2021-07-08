package com.reins.bookstore.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Data
@Table(name = "ORDERITEMS")
public class OrderItems {
    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Integer itemId;

    @Column(name = "order_id")
    private Integer orderId;

    @Column(name = "book_id")
    private Integer bookId;

    private int quantity;


    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    @JoinColumn(name="book_id",referencedColumnName = "id",insertable = false,updatable = false)
    private Book book;

    public OrderItems(){};

    public OrderItems(Integer orderId,Integer bookId, int quantity){
        this.orderId = orderId;
        this.bookId = bookId;
        this.quantity = quantity;
    }
//
//    public Integer getItemId(){return itemId;}
//    private void setItemId(Integer itemId){this.itemId = itemId;}
//
//    public Integer getOrderId(){
//        return orderId;
//    }
//    private void setOrderId(Integer id){
//        this.orderId = id;
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

    public Book getBook(){return book;}
    private void setBook(Book book){this.book = book;}
}
