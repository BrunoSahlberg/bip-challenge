package com.example.ejb.service;

import com.example.ejb.domain.Beneficio;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.LockModeType;
import jakarta.persistence.PersistenceContext;

import java.math.BigDecimal;
import java.util.List;

@Stateless
public class BeneficioEjbService implements BeneficioEjbServiceInterface {

    @PersistenceContext(unitName = "bipPU")
    private EntityManager em;

    public void transfer(Long fromId, Long toId, BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Valor da transferência deve ser positivo");
        }

        Beneficio from = em.find(Beneficio.class, fromId, LockModeType.PESSIMISTIC_WRITE);
        Beneficio to = em.find(Beneficio.class, toId, LockModeType.PESSIMISTIC_WRITE);

        if (from == null) {
            throw new IllegalArgumentException("Benefício de origem não encontrado");
        }
        if (to == null) {
            throw new IllegalArgumentException("Benefício de destino não encontrado");
        }

        if (from.getValor().compareTo(amount) < 0) {
            throw new IllegalArgumentException("Saldo insuficiente para transferência");
        }

        from.setValor(from.getValor().subtract(amount));
        to.setValor(to.getValor().add(amount));

        em.merge(from);
        em.merge(to);
    }

    public BigDecimal calcularValorBeneficio(Long id) {
        Beneficio beneficio = em.find(Beneficio.class, id);
        if (beneficio == null) {
            throw new IllegalArgumentException("Benefício não encontrado");
        }
        return beneficio.getValor();
    }

    public List<Beneficio> findAll() {
        return em.createQuery("SELECT b FROM Beneficio b", Beneficio.class).getResultList();
    }

    public Beneficio findById(Long id) {
        return em.find(Beneficio.class, id);
    }

    public Beneficio save(Beneficio beneficio) {
        if (beneficio.getId() == null) {
            em.persist(beneficio);
            return beneficio;
        } else {
            return em.merge(beneficio);
        }
    }

    public void deleteById(Long id) {
        Beneficio beneficio = em.find(Beneficio.class, id);
        if (beneficio != null) {
            em.remove(beneficio);
        }
    }
}
