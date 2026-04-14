package com.example.backend.service;

import com.example.backend.dto.BeneficioDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class BeneficioService {

    @Autowired
    private BeneficioClient beneficioClient;

    public List<BeneficioDTO> listarBeneficios() {
        return beneficioClient.findAll();
    }

    public Optional<BeneficioDTO> obterBeneficio(Long id) {
        return Optional.ofNullable(beneficioClient.findById(id));
    }

    public BeneficioDTO criarBeneficio(BeneficioDTO beneficioDTO) {
        return beneficioClient.save(beneficioDTO);
    }

    public BeneficioDTO atualizarBeneficio(BeneficioDTO beneficioDTO) {
        return beneficioClient.save(beneficioDTO);
    }

    public void deletarBeneficio(Long id) {
        beneficioClient.deleteById(id);
    }

    public BigDecimal calcularValorBeneficio(Long id) {
        BeneficioDTO beneficio = beneficioClient.findById(id);
        return beneficio != null ? beneficio.getValor() : null;
    }

    public void transfer(Long fromId, Long toId, BigDecimal amount) {
        beneficioClient.transfer(fromId, toId, amount);
    }
}