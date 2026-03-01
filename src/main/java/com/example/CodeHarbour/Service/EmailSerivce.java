package com.example.CodeHarbour.Service;

import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;


public interface EmailSerivce {

    void sendEmailWithToken(String userEmail,String Link) throws MessagingException;
}
