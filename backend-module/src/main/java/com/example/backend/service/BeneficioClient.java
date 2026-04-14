package com.example.backend.service;

import com.example.backend.dto.BeneficioDTO;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BeneficioClient {

    private final RestTemplate restTemplate;

    private static final String BASE_URL = "http://localhost:8080/ejb-module/api/beneficios";

    public BeneficioClient() {
        this.restTemplate = new RestTemplate();
    }

    public List<BeneficioDTO> findAll() {
        return restTemplate.exchange(
                BASE_URL,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<BeneficioDTO>>() {}
        ).getBody();
    }

    public BeneficioDTO findById(Long id) {
        return restTemplate.getForObject(
                BASE_URL + "/" + id,
                BeneficioDTO.class
        );
    }

    public BeneficioDTO save(BeneficioDTO beneficio) {
        return restTemplate.postForObject(
                BASE_URL,
                beneficio,
                BeneficioDTO.class
        );
    }

    public void transfer(Long fromId, Long toId, BigDecimal amount) {
        Map<String, Object> body = new HashMap<>();
        body.put("fromId", fromId);
        body.put("toId", toId);
        body.put("amount", amount);

        restTemplate.postForObject(
                BASE_URL + "/transfer",
                body,
                Void.class
        );
    }

    public void deleteById(Long id) {
        restTemplate.delete(BASE_URL + "/" + id);
    }
}