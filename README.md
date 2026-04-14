# 🏗️ Desafio Fullstack Integrado
🚨 Instrução Importante (LEIA ANTES DE COMEÇAR)
❌ NÃO faça fork deste repositório.

Este repositório é fornecido como modelo/base. Para realizar o desafio, você deve:
✅ Opção correta (obrigatória)
Clique em “Use this template” (se este repositório estiver marcado como Template)
OU
Clone este repositório e crie um NOVO repositório público em sua conta GitHub.
📌 O resultado deve ser um repositório próprio, independente deste.

## 🎯 Objetivo
Criar solução completa em camadas (DB, EJB, Backend, Frontend), corrigindo bug em EJB e entregando aplicação funcional.

## 📦 Estrutura
- db/: scripts schema e seed
- ejb-module/: serviço EJB com bug a ser corrigido
- backend-module/: backend Java 8+
- frontend/: app Angular
- docs/: instruções e critérios
- .github/workflows/: CI

## ✅ Tarefas do candidato
1. Executar db/schema.sql e db/seed.sql
2. Corrigir bug no BeneficioEjbService
3. Implementar backend CRUD + integração com EJB
4. Desenvolver frontend Angular consumindo backend
5. Implementar testes
6. Documentar (Swagger, README)
7. Enviar link para recrutadora com seu repositório para análise

## 🐞 Bug no EJB
- Transferência não verifica saldo, não usa locking, pode gerar inconsistência
- Espera-se correção com validações, rollback, locking/optimistic locking

## 📊 Critérios de avaliação
- Arquitetura em camadas (20%)
- Correção EJB (20%)
- CRUD + Transferência (15%)
- Qualidade de código (10%)
- Testes (15%)
- Documentação (10%)
- Frontend (10%)

---

# Projeto - Integração Spring Boot + Jakarta EJB

## 🧠 Arquitetura

O projeto é dividido em dois módulos:

- **ejb-module**
  - Jakarta EJB (`@Stateless`)
  - Exposição via REST (JAX-RS)
  - Responsável pela lógica de negócio

- **backend-module**
  - Spring Boot
  - Consome o EJB via HTTP (REST)
  - Utiliza DTOs (sem acoplamento com entidade)

- **frontend**
  - Angular
  - Consumidor do backend-module em Spring

### Fluxo da aplicação

Spring Boot → REST → EJB (WildFly) → Banco H2

---

## ⚙️ Pré-requisitos

- Java 17+
- Maven
- WildFly

---

## 📦 Build do projeto

Na raiz do projeto:

```bash
mvn clean package