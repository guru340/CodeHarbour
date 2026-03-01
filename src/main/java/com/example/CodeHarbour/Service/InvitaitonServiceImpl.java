package com.example.CodeHarbour.Service;

import com.example.CodeHarbour.Model.Invitation;
import com.example.CodeHarbour.Repository.InvitaitionRepo;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class InvitaitonServiceImpl implements InvitationService {

    @Autowired
    private InvitaitionRepo invitaitionRepo;

    @Autowired
    private EmailSerivce emailSerivce;



    @Override
    public void sendInvitation(String mail, Long projectId) throws MessagingException {

        String  invitation= UUID.randomUUID().toString();
        Invitation invitation1=new Invitation();
        invitation1.setEmail(mail);
        invitation1.setProjectID(projectId);
        invitation1.setToken(invitation);

        invitaitionRepo.save(invitation1);

        String invitaionlink="http://localhost:5173/accept_in?token="+invitation;
        emailSerivce.sendEmailWithToken(mail,invitaionlink );
    }

    @Override
    public Invitation acceptInvitaion(String token, Long userId) throws Exception {
        Invitation invitation=invitaitionRepo.findByToken(token);
        if (invitation==null){
            throw new Exception("Invalid Invatation token");
        }

        return invitation;
    }

    @Override
    public String gettokenByUserMail(String userEmail) {
        Invitation invitation=invitaitionRepo.findByEmail(userEmail);
        return invitation.getToken();
    }

    @Override
    public void deleteToken(String token) {
        Invitation invitation=invitaitionRepo.findByToken(token);
        invitaitionRepo.delete(invitation);

    }
}
