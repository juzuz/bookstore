package com.reins.bookstore.compositeKey;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CartId implements Serializable {
    private Integer userId;
    private Integer bookId;

    public CartId(){}

    public CartId(Integer userId, Integer bookId) {
        this.userId = userId;
        this.bookId = bookId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartId cartId = (CartId) o;
        return userId.equals(cartId.userId) &&
                bookId.equals(cartId.bookId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, bookId);
    }

    public Integer getUserId(){
        return userId;
    }
    private void setUserId(Integer id){
        this.userId = id;
    }

    public Integer getBookId(){
        return bookId;
    }
    private void setBookId(Integer id){
        this.bookId = id;
    }


}
