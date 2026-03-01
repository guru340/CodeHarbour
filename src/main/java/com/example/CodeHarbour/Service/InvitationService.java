package com.example.CodeHarbour.Service;

import com.example.CodeHarbour.Model.Invitation;
import jakarta.mail.MessagingException;

public interface InvitationService {

    public void sendInvitation(String mail,Long projectId) throws MessagingException;

    public Invitation acceptInvitaion(String token,Long userId) throws Exception;

    public String gettokenByUserMail(String userEmail);

    void deleteToken(String token);
}
