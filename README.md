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