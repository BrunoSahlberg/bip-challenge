package com.example.backend.controller;

import com.example.backend.dto.BeneficioDTO;
import com.example.backend.service.BeneficioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/beneficios")
public class BeneficioController {

    @Autowired
    private BeneficioService beneficioService;

    @GetMapping
    public ResponseEntity<List<BeneficioDTO>> list() {
        List<BeneficioDTO> beneficios = beneficioService.listarBeneficios();
        return ResponseEntity.ok(beneficios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BeneficioDTO> getById(@PathVariable Long id) {
        Optional<BeneficioDTO> beneficio = beneficioService.obterBeneficio(id);
        return beneficio.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BeneficioDTO> create(@RequestBody BeneficioDTO beneficio) {
        BeneficioDTO savedBeneficio = beneficioService.criarBeneficio(beneficio);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBeneficio);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BeneficioDTO> update(@PathVariable Long id, @RequestBody BeneficioDTO beneficio) {
        if (beneficioService.obterBeneficio(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        beneficio.setId(id);
        BeneficioDTO updatedBeneficio = beneficioService.atualizarBeneficio(beneficio);
        return ResponseEntity.ok(updatedBeneficio);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (beneficioService.obterBeneficio(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        beneficioService.deletarBeneficio(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/transfer")
    public ResponseEntity<String> transfer(@RequestParam Long fromId, @RequestParam Long toId, @RequestParam BigDecimal amount) {
        try {
            beneficioService.transfer(fromId, toId, amount);
            return ResponseEntity.ok("Transferência realizada com sucesso");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro na transferência: " + e.getMessage());
        }
    }
}
