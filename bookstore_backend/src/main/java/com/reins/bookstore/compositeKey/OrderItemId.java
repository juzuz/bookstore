package com.reins.bookstore.compositeKey;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class OrderItemId implements Serializable {
    private Integer orderId;
    private Integer bookId;

    public OrderItemId(){}

    public OrderItemId(Integer userId, Integer bookId) {
        this.orderId = userId;
        this.bookId = bookId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItemId orderId = (OrderItemId) o;
        return orderId.equals(orderId.orderId) &&
                bookId.equals(orderId.bookId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, bookId);
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


}
