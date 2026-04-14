package com.example.backend;

import com.example.backend.controller.BeneficioController;
import com.example.backend.dto.BeneficioDTO;
import com.example.backend.service.BeneficioService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(BeneficioController.class)
public class BeneficioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BeneficioService beneficioService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testList() throws Exception {
        BeneficioDTO beneficio1 = new BeneficioDTO(1L, "Beneficio A", "Descrição A", BigDecimal.valueOf(1000), true);
        BeneficioDTO beneficio2 = new BeneficioDTO(2L, "Beneficio B", "Descrição B", BigDecimal.valueOf(500), true);

        when(beneficioService.listarBeneficios()).thenReturn(Arrays.asList(beneficio1, beneficio2));

        mockMvc.perform(get("/api/v1/beneficios"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].nome").value("Beneficio A"))
                .andExpect(jsonPath("$[1].nome").value("Beneficio B"));
    }

    @Test
    public void testGetById() throws Exception {
        BeneficioDTO beneficio = new BeneficioDTO(1L, "Beneficio A", "Descrição A", BigDecimal.valueOf(1000), true);

        when(beneficioService.obterBeneficio(1L)).thenReturn(Optional.of(beneficio));

        mockMvc.perform(get("/api/v1/beneficios/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Beneficio A"));
    }

    @Test
    public void testCreate() throws Exception {
        BeneficioDTO beneficio = new BeneficioDTO(null, "Novo Beneficio", "Descrição", BigDecimal.valueOf(2000), true);
        BeneficioDTO savedBeneficio = new BeneficioDTO(1L, "Novo Beneficio", "Descrição", BigDecimal.valueOf(2000), true);

        when(beneficioService.criarBeneficio(any(BeneficioDTO.class))).thenReturn(savedBeneficio);

        mockMvc.perform(post("/api/v1/beneficios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(beneficio)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    public void testUpdate() throws Exception {
        BeneficioDTO beneficio = new BeneficioDTO(1L, "Beneficio Atualizado", "Descrição Atualizada", BigDecimal.valueOf(1500), true);

        when(beneficioService.obterBeneficio(1L)).thenReturn(Optional.of(beneficio));
        when(beneficioService.atualizarBeneficio(any(BeneficioDTO.class))).thenReturn(beneficio);

        mockMvc.perform(put("/api/v1/beneficios/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(beneficio)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Beneficio Atualizado"));
    }

    @Test
    public void testDelete() throws Exception {
        BeneficioDTO beneficio = new BeneficioDTO(1L, "Beneficio A", "Descrição A", BigDecimal.valueOf(1000), true);

        when(beneficioService.obterBeneficio(1L)).thenReturn(Optional.of(beneficio));
        doNothing().when(beneficioService).deletarBeneficio(1L);

        mockMvc.perform(delete("/api/v1/beneficios/1"))
                .andExpect(status().isNoContent());
    }
}
