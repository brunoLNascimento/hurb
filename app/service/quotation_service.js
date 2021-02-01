const mongoose = require('mongoose');
const Quotation = mongoose.model('Quotation');
const { awesomeApi, limit } = require("../config/config");
const { apiService } = require("../service/awesomeApi_service");
const { saveQuotation, findDbQuotation, findQuotationBy, deleteQuotation } = require("../repository/quotation_repository");
const moment = require("moment");
const coinsFrom = require('../helper/helper');

module.exports = {
    async findQuotation(params){
        try {
            /**
             * Cotação pesquisa na base allQuotation, caso esteja fora dos parametros de consultas
             * determinados, sistema irá consultar a api AwesomeApi e seguirá fluxo para salvar,
             * caso esteja dentro dos parametos, sistema irá usar os valores salvos anteriormente e 
             * seguirá fluxo para salvar a consulta
             * 
            */
            if(!params.coinFrom) 
                throw "Moeda principal é um campo obrigatório";
            if(!params.coinTo) 
                throw "Moeda a ser convertida é um campo obrigatório";
            if(!params.amount) 
                throw "Valor a ser convertido é um campo obrigatório";
            
            params.coinFrom = params.coinFrom.toUpperCase();
            params.coinTo = params.coinTo.toUpperCase();

            checkCoin(params.coinFrom);
            let foundDB = await findQuotationDB(params);
            if(!foundDB){
                //caso não seja encontrada uma cotação na última hora na base, a api, irá buscar a cotação
                let url = `${awesomeApi.url}/${params.coinFrom}-${params.coinTo}/${awesomeApi.retorno}`;
                foundDB = await apiService(url);
            }

            let built = buildModel(params, foundDB);
            let response = await saveQuotation(built);
            return response;
        } catch (error) {
            throw error;
        }
    },

    async quotation(params){
        try{
            /**
             * Consulta cotação: por id, pelo código da moeda ou pot página. Consulta é limitada a 10 registro por página
             */
            if(isNaN(params.page)) throw "Página deve ser númerico"
            if(params.id && params.code) throw "Favor escolha sua busca por ID ou CODE"
            
            let query = { };
            let skip = params.page * limit;            

            if(params.id) {
                query = { active: true, quotationId : params.id };
            } else if(params.code) {
                checkCoin(params.code)
                query = { active: true, code: params.code };
            } else {
                query = { active: true }
            } 

            let foundDB = await findQuotationBy(query, skip);
            if(foundDB.length) return foundDB;
            else throw "Nenhum resultado encontrado para a busca"
        } catch (error) {
            throw error;
        }
    },

    async deleteQuotation(id){
        try {
            /**
             * Deleta a cotação por ID: Busca na base e caso encontre o ID. 
             * O 'delete' é lógico, é setado como active false  
            */

            if(isNaN(id)) throw "O id da cotação, deve ser númerico"

            let findQuery = { active: true, quotationId: id };
            let found = await findQuotationBy(findQuery);
            if(!found.length) 
                throw `Id ${id} não encontrado, favor verifique o id da cotação`;
            return await deleteQuotation(findQuery);            
        } catch (error) {
            throw error
        }
    }
}

async function findQuotationDB(params){
    try {
        /**
         * Busca na base a cotação para todas as moeda
         * Caso a hora atual depreciada 1 hora, seja menor que a data da última consulta, 
         * o sistema irá pegar os valores que estão na base, de acordo com a última consulta salva.
         * A consulta é feita atráves do worker, que a cada 1 hora, nos horários de 09 às 18, faz uma busca 
         * e atualiza a base.
        */

        let getDate = moment().add(-1, 'hour').format("YYYY-MM-DD HH:mm:ss");
        let foundDB = await findDbQuotation();
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
        console.log("Não foi possível consultar a base de cotação!")
    }
}

function buildModel(params, quotation){
    /**
     * monta model para salvar na base
    */

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

function checkCoin(code){
    //CheckCoin: verifica, se as moedas enviadas para cotação estão cadastradas
    //Se a moeda não estiver no cadastro, irá retornar a msg: Verifique a moeda coinFrom e as moedas registradas
    try {
        let find = coinsFrom.find(el => el == code)
        if(!find) throw "Verifique a moeda coinFrom: " + coinsFrom
    } catch (error) {
        throw error
    }
}