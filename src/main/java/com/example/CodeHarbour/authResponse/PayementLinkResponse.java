package com.example.CodeHarbour.authResponse;

import com.example.CodeHarbour.Service.UserServices;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PayementLinkResponse {

    private String payement_link_url;
    private String payement_link_id;


}
