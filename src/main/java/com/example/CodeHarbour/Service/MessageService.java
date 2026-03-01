package com.example.CodeHarbour.Service;

import com.example.CodeHarbour.Model.Message;
import org.apache.catalina.LifecycleState;

import java.util.List;

public interface MessageService {

    Message sendMessage(Long SenderId,Long chatID,String Content) throws Exception;

    List<Message> getMessagebyProjectId(Long ProjectId) throws Exception;
}
