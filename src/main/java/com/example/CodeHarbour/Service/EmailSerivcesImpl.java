package com.example.CodeHarbour.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailSerivcesImpl implements EmailSerivce {

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendEmailWithToken(String userEmail, String Link) throws MessagingException {
        MimeMessage mimeMessage=javaMailSender.createMimeMessage();
        MimeMessageHelper helper=new MimeMessageHelper(mimeMessage,"utf-8");

        String subject="Join Project Team invitation";
        String Text="Click  the link to join the Project team:"+Link;

        helper.setSubject(subject);
        helper.setText(Text,true);

        helper.setTo(userEmail);

        try {
            javaMailSender.send(mimeMessage);

        }
        catch (MailException e){
            throw new MailSendException("Failed to send email");
        }
    }
}
