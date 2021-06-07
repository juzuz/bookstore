package com.reins.bookstore.dao;

import com.reins.bookstore.entity.Book;

import java.util.List;
import java.util.Objects;
public interface BookDao {
    Book findById(Integer id);
    List<Book> getBooks(boolean includeRemove);
    void storeBook(Book book);
    void remove(Integer bookId);
}
