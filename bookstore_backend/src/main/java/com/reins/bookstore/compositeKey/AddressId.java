package com.reins.bookstore.compositeKey;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class AddressId implements Serializable {
    private Integer userId;
    private String address;

    public AddressId(){}

    public AddressId(Integer userId, String address) {
        this.userId = userId;
        this.address =address;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AddressId addressId = (AddressId) o;
        return userId.equals(addressId.userId) &&
                address.equals(addressId.address);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, address);
    }

    public Integer getUserId(){
        return userId;
    }
    private void setUserId(Integer id){
        this.userId = id;
    }

    public String getAddress(){
        return address;
    }
    private void setAddress(String add){
        this.address = add;
    }


}
