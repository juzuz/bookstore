package com.reins.bookstore.repository;
import com.reins.bookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;


import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

public interface BookRepository extends JpaRepository<Book,Integer> {

    public List<Book> findByRemovedFalse();
}
