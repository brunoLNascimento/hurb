const mongoose = require('mongoose');
const Quotation = mongoose.model('Quotation');
const { awesomeApi, limit } = require("../config/config");
const { apiService } = require("../service/awesomeApi_service");
const { saveQuotation, findDbQuotation, findQuotationBy } = require("../repository/quotation_repository");
const moment = require("moment");

module.exports = {
    async findQuotation(params){
        try {
            if(!params.coinFrom) 
                throw "Moeda principal é um campo obrigatório";
            if(!params.coinTo) 
                throw "Moeda a ser convertida é um campo obrigatório";
            if(!params.amount) 
                throw "Valor a ser convertido é um campo obrigatório";
            
            let foundDB = await findQuotationDB(params);
            if(!foundDB){
                let url = `${awesomeApi.url}/${params.coinFrom}-${params.coinTo}/${awesomeApi.retorno}`;
                foundDB = await apiService(url);
            }

            let built = buildModel(params, foundDB);
            saveQuotation(built);
            return foundDB;
        } catch (error) {
            throw error;
        }
    },

    async quotation(params){
        try{
            if(isNaN(params.page)) throw "Página deve ser númerico"
            
            let query = { };
            let skip = params.page * limit;            

            if(params.id) {
                query = { active: true, idQuotation : params.id };
            } else if(params.code) {
                query = { active: true, code: params.code };
            } else {
                query = { active: true }
            } 

            let foundDB = await findQuotationBy(query, skip);
            return foundDB;
        } catch (error) {
            throw error;
        }
    }
}

async function findQuotationDB(params){
    try {
        let getDate = moment().add(-1, 'hour').format("YYYY-MM-DD HH:mm:ss");
        let foundDB = await findDbQuotation();
        //Caso a hora atual, depreciada 1 hora, seja menor que a data da última consulta, seguir processo para pegar os dados da base
        if(getDate <= foundDB.creatAt){
            for (let key of Object.keys(foundDB.code)) {
                if(key == params.coinFrom){
                   return (foundDB.code[key])
                }
            }
        }else{
            return;
        }
    } catch (error) {
        console.log("Erro ao consultar na base a cotação!")
    }
}

function buildModel(params, quotation){
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
        valueQuotation: quotation.valueQuotation,
        creatAt: moment().format("YYYY-MM-DD HH:mm:ss")
    })
    return saveQuotation
}