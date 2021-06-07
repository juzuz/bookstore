package com.reins.bookstore.compositeKey;

import com.reins.bookstore.entity.Address;
import com.reins.bookstore.repository.AddressRepository;
import com.reins.bookstore.utils.msgutils.Msg;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.Serializable;

public class OrderModel implements Serializable {

    public Integer userId;
    public Integer bookId;
    public Integer quantity;
    public Address address;


    OrderModel(){

    }

    public OrderModel(Integer _userId, Integer _bookId,String _timeStamp,Integer _quantity){
        this.userId = _userId;
        this.bookId = _bookId;
        this.quantity = _quantity;
    }

    public Integer getId(){return userId;}
    public Integer getBookId(){return bookId;}
    public Integer getQuantity(){return quantity;}
    public Address getAddress(){return address;}
    }


