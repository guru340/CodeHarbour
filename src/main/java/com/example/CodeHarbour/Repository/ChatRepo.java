package com.example.CodeHarbour.Repository;

import com.example.CodeHarbour.Model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepo extends JpaRepository<Chat,Long> {


}
