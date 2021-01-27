const mongoose = require('mongoose');
const Quotation = mongoose.model('Quotation');
const { awesomeApi } = require("../config/config");
const { apiService } = require("../service/awesomeApi_service");
const { saveQuotation } = require("../repository/quotation_repository");

module.exports = {
    async findQuotation(params){
        try {
            if(!params.coinFrom) 
                throw "Moeda principal é um campo obrigatório";
            if(!params.coinTo) 
                throw "Moeda a ser convertida é um campo obrigatório";
            if(!params.amount) 
                throw "Valor a ser convertido é um campo obrigatório";

            let url = `${awesomeApi.url}/${params.coinFrom}-${params.coinTo}/${awesomeApi.retorno}`;
            let foundQuotation = await apiService(url);
            let built = buildModel(params, foundQuotation);
            saveQuotation(built);
            return foundQuotation;
        } catch (error) {
            throw error;
        }
    }
}

function buildModel(params, foundQuotation){
    let quotation = foundQuotation[0]
    quotation.valueQuotation = parseFloat(quotation.high * params.amount).toFixed(2);
    quotation.message = `{Valor a ser cotado $ ${params.amount}, resultado da conversão: ${params.coinFrom} para ${params.coinTo} = ${quotation.valueQuotation}`;
    

    let saveQuotation = new Quotation({
        varBid: quotation.varBid,
        code: quotation.code,
        codein: quotation.codein,
        name: quotation.name,
        high: quotation.high,
        low: quotation.low,
        pctChange: quotation.pctChange,
        bid: quotation.bid,
        ask: quotation.ask,
        timestamp: quotation.timestamp,
        create_date: quotation.create_date,
        message: quotation.message,
        valueQuotation: quotation.valueQuotation
    })
    return saveQuotation
}