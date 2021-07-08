package com.reins.bookstore.entity;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Where;


import javax.persistence.*;
import java.math.BigDecimal;

/**
 * @ClassName Book
 * @Description Book Entity
 * @Author thunderBoy
 * @Date 2019/11/5 19:19
 */




// @Where tells us to only consider rows where the removed == false.
@Entity
@Data
@Table(name = "BOOK")
public class Book {
    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name="increment", strategy = "increment")
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


    public boolean getRemoved(){return removed;}
    public void setRemoved(boolean removed){this.removed = removed;}

}
