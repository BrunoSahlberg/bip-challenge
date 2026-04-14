package com.example.backend;

import com.example.backend.service.BeneficioClient;
import com.example.backend.dto.BeneficioDTO;
import com.example.backend.service.BeneficioService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BeneficioServiceTest {

    @Mock
    private BeneficioClient beneficioClient;

    @InjectMocks
    private BeneficioService beneficioService;

    private BeneficioDTO beneficio1;
    private BeneficioDTO beneficio2;

    @BeforeEach
    public void setUp() {
        beneficio1 = new BeneficioDTO(1L, "Beneficio A", "Descrição A", BigDecimal.valueOf(1000), true);
        beneficio2 = new BeneficioDTO(2L, "Beneficio B", "Descrição B", BigDecimal.valueOf(500), true);
    }

    @Test
    public void testListarBeneficios() {
        when(beneficioClient.findAll()).thenReturn(Arrays.asList(beneficio1, beneficio2));

        List<BeneficioDTO> result = beneficioService.listarBeneficios();

        assertEquals(2, result.size());
        assertEquals("Beneficio A", result.get(0).getNome());
        verify(beneficioClient, times(1)).findAll();
    }

    @Test
    public void testObterBeneficio() {
        when(beneficioClient.findById(1L)).thenReturn(beneficio1);

        Optional<BeneficioDTO> result = beneficioService.obterBeneficio(1L);

        assertTrue(result.isPresent());
        assertEquals("Beneficio A", result.get().getNome());
        verify(beneficioClient, times(1)).findById(1L);
    }

    @Test
    public void testCriarBeneficio() {
        BeneficioDTO novo = new BeneficioDTO(null, "Novo Beneficio", "Descrição", BigDecimal.valueOf(2000), true);

        BeneficioDTO salvo = new BeneficioDTO(1L, "Novo Beneficio", "Descrição", BigDecimal.valueOf(2000), true);

        when(beneficioClient.save(novo)).thenReturn(salvo);

        BeneficioDTO result = beneficioService.criarBeneficio(novo);

        assertNotNull(result.getId());
        assertEquals("Novo Beneficio", result.getNome());
        verify(beneficioClient, times(1)).save(novo);
    }

    @Test
    public void testAtualizarBeneficio() {
        BeneficioDTO atualizado = new BeneficioDTO(1L, "Atualizado", "Desc", BigDecimal.valueOf(3000), true);

        when(beneficioClient.save(atualizado)).thenReturn(atualizado);

        BeneficioDTO result = beneficioService.atualizarBeneficio(atualizado);

        assertEquals("Atualizado", result.getNome());
        verify(beneficioClient, times(1)).save(atualizado);
    }

    @Test
    public void testDeletarBeneficio() {
        doNothing().when(beneficioClient).deleteById(1L);

        beneficioService.deletarBeneficio(1L);

        verify(beneficioClient, times(1)).deleteById(1L);
    }

    @Test
    public void testCalcularValorBeneficio() {
        when(beneficioClient.findById(1L)).thenReturn(beneficio1);

        BigDecimal result = beneficioService.calcularValorBeneficio(1L);

        assertEquals(BigDecimal.valueOf(1000), result);
        verify(beneficioClient, times(1)).findById(1L);
    }

    @Test
    public void testTransfer() {
        doNothing().when(beneficioClient).transfer(1L, 2L, BigDecimal.valueOf(500));

        beneficioService.transfer(1L, 2L, BigDecimal.valueOf(500));

        verify(beneficioClient, times(1)).transfer(1L, 2L, BigDecimal.valueOf(500));
    }
}