package com.reins.bookstore.service;

import com.reins.bookstore.compositeKey.OrderModel;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.OrderItems;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.util.List;

public interface BookService {

    Book findBookById(Integer id);
    public void addBook(Book book);
    List<Book> getBooks(boolean includeRemove);
    public void reduceInventory(List<OrderItems> orders);
    public void updateBook(Integer bookId, String name, String author, String type, BigDecimal price, Integer inventory, String description, String isbn);
    public void bookSoftRemove(Integer bookId);

}
