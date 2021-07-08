package com.reins.bookstore.service;

import com.reins.bookstore.compositeKey.OrderModel;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.OrderItems;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface BookService {

    Book findBookById(Integer id);
    public void addBook(Book book);
    Page<Book> getBooks(Optional<Integer> page, String query);
    public void reduceInventory(OrderItems item);
    public void updateBook(Integer bookId, String name, String author, String type, BigDecimal price, Integer inventory, String description, String isbn);
    public void bookSoftRemove(Integer bookId);

}
