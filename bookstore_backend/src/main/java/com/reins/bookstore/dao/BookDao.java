package com.reins.bookstore.dao;

import com.reins.bookstore.entity.Book;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

public interface BookDao {
    Book findById(Integer id);
    Page<Book> getBooks(Optional<Integer> page,String query);
    void storeBook(Book book);
    void remove(Integer bookId);
}
