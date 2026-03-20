package com.example.CodeHarbour.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class CreateMessageRequest {

    private Long projectId;

    private Long senderId;

    private String content;
}
