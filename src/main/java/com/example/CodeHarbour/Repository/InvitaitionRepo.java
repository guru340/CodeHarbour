package com.example.CodeHarbour.Repository;

import com.example.CodeHarbour.Model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitaitionRepo extends JpaRepository<Invitation,Long> {

    Invitation findByToken(String token);

    Invitation findByEmail(String useremail);
}
