package com.example.ejb.controller;

import com.example.ejb.dto.TransferRequest;
import com.example.ejb.service.BeneficioEjbServiceInterface;
import com.example.ejb.domain.Beneficio;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/beneficios")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BeneficioResource {

    @EJB
    private BeneficioEjbServiceInterface service;

    @GET
    public List<Beneficio> findAll() {
        return service.findAll();
    }

    @GET
    @Path("/{id}")
    public Beneficio findById(@PathParam("id") Long id) {
        return service.findById(id);
    }

    @POST
    public Beneficio save(Beneficio beneficio) {
        return service.save(beneficio);
    }

    @POST
    @Path("/transfer")
    public void transfer(TransferRequest request) {
        service.transfer(request.fromId, request.toId, request.amount);
    }
}