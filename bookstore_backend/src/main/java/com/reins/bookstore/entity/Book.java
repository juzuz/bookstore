package com.reins.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.ManyToAny;


import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * @ClassName Book
 * @Description Book Entity
 * @Author thunderBoy
 * @Date 2019/11/5 19:19
 */




@Data
@Entity
@Table(name = "BOOK")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Book {
    @Column(name = "id")
    private Integer id;
    @Column(name="isbn")
    private String isbn;
    @Column(name="name")
    private String name;
    @Column(name="type")
    private String type;
    @Column(name="author")
    private String author;
    @Column(name="price")
    private BigDecimal price;
    @Column(name="description")
    private String description;
    @Column(name="inventory")
    private Integer inventory;
    @Column(name="image")
    private String image;
    @Column(name = "removed")
    private boolean removed = false;


    public Book() {}

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name="increment", strategy = "increment")
    public Integer getId(){
        return id;
    }
    private void setId(Integer id){
        this.id = id;
    }

    public String getIsbn(){
        return isbn;
    }
    public void setIsbn(String isbn){
        this.isbn = isbn;
    }

    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }

    public String getType(){
        return type;
    }
    public void setType(String type){
        this.type = type;
    }

    public String getAuthor(){
        return author;
    }
    public void setAuthor(String author){
        this.author = author;
    }

    public BigDecimal getPrice(){
        return price;
    }
    public void setPrice(BigDecimal price){
        this.price = price;
    }

    public String getDescription(){
        return description;
    }
    public void setDescription(String description){
        this.description = description;
    }

    public Integer getInventory(){
        return inventory;
    }
    public void setInventory(Integer inventory){
        this.inventory = inventory;
    }

    public boolean getRemoved(){return removed;}
    public void setRemoved(boolean removed){this.removed = removed;}

}
