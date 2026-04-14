package com.example.ejb.service;

import com.example.ejb.domain.Beneficio;

import java.math.BigDecimal;
import java.util.List;

public interface BeneficioEjbServiceInterface {

    void transfer(Long fromId, Long toId, BigDecimal amount);

    BigDecimal calcularValorBeneficio(Long id);

    List<Beneficio> findAll();

    Beneficio findById(Long id);

    Beneficio save(Beneficio beneficio);

    void deleteById(Long id);
}
