package com.example.ejb;

import com.example.ejb.domain.Beneficio;
import com.example.ejb.service.BeneficioEjbService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import jakarta.persistence.EntityManager;
import jakarta.persistence.LockModeType;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BeneficioEjbServiceTest {

    @Mock
    private EntityManager em;

    @InjectMocks
    private BeneficioEjbService beneficioEjbService;

    @Test
    public void testTransferSuccess() {
        // Arrange
        Beneficio from = new Beneficio();
        from.setId(1L);
        from.setNome("From");
        from.setDescricao("Desc");
        from.setValor(BigDecimal.valueOf(1000));

        Beneficio to = new Beneficio();
        to.setId(2L);
        to.setNome("To");
        to.setDescricao("Desc");
        to.setValor(BigDecimal.valueOf(500));

        when(em.find(Beneficio.class, 1L, LockModeType.PESSIMISTIC_WRITE)).thenReturn(from);
        when(em.find(Beneficio.class, 2L, LockModeType.PESSIMISTIC_WRITE)).thenReturn(to);

        // Act
        beneficioEjbService.transfer(1L, 2L, BigDecimal.valueOf(200));

        // Assert
        assertEquals(BigDecimal.valueOf(800), from.getValor());
        assertEquals(BigDecimal.valueOf(700), to.getValor());
        verify(em).merge(from);
        verify(em).merge(to);
    }

    @Test
    public void testTransferInsufficientFunds() {
        // Arrange
        Beneficio from = new Beneficio();
        from.setId(1L);
        from.setNome("From");
        from.setDescricao("Desc");
        from.setValor(BigDecimal.valueOf(100));

        Beneficio to = new Beneficio();
        to.setId(2L);
        to.setNome("To");
        to.setDescricao("Desc");
        to.setValor(BigDecimal.valueOf(500));

        when(em.find(Beneficio.class, 1L, LockModeType.PESSIMISTIC_WRITE)).thenReturn(from);
        when(em.find(Beneficio.class, 2L, LockModeType.PESSIMISTIC_WRITE)).thenReturn(to);

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> beneficioEjbService.transfer(1L, 2L, BigDecimal.valueOf(200)));
        assertEquals("Saldo insuficiente para transferência", exception.getMessage());
    }

    @Test
    public void testTransferInvalidAmount() {
        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> beneficioEjbService.transfer(1L, 2L, BigDecimal.valueOf(-100)));
        assertEquals("Valor da transferência deve ser positivo", exception.getMessage());
    }

    @Test
    public void testTransferFromNotFound() {
        when(em.find(Beneficio.class, 1L, LockModeType.PESSIMISTIC_WRITE)).thenReturn(null);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> beneficioEjbService.transfer(1L, 2L, BigDecimal.valueOf(100)));
        assertEquals("Benefício de origem não encontrado", exception.getMessage());
    }

    @Test
    public void testCalcularValorBeneficio() {
        Beneficio beneficio = new Beneficio();
        beneficio.setId(1L);
        beneficio.setNome("Test");
        beneficio.setDescricao("Desc");
        beneficio.setValor(BigDecimal.valueOf(1500));

        when(em.find(Beneficio.class, 1L)).thenReturn(beneficio);

        BigDecimal result = beneficioEjbService.calcularValorBeneficio(1L);

        assertEquals(BigDecimal.valueOf(1500), result);
    }
}
