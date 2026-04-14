package com.example.backend;

import org.apache.openejb.api.LocalClient;
import org.springframework.context.annotation.Configuration;

@Configuration
@LocalClient
public class EJBConfiguration {
    // OpenEJB will automatically register EJBs as Spring beans
    // No need to manually create beans
}
