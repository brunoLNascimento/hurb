const { awesomeApi } = require("../service/awesomeApi_service");

module.exports = {
    async findQuotation(params){
        try {
            if(!params.coinFrom) 
                throw "Moeda principal é um campo obrigatório";
            if(!params.coinTo) 
                throw "Moeda a ser convertida é um campo obrigatório";
            if(!params.amount) 
                throw "Valor a ser convertido é um campo obrigatório";

            let foundQuotation = await awesomeApi(params);
            return foundQuotation;
        } catch (error) {
            throw error;
        }
    }
}