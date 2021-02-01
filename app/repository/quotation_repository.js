const mongoose = require('mongoose');
const Quotation = mongoose.model('Quotation');
const AllQuotation = mongoose.model('AllQuotation');
const { limit } = require('../config/config');
mongoose.set('debug', true)


module.exports = {
    
    async saveQuotation(quotation) {
        quotation.save(function(err, saved){
            if(err){
                throw "Erro ao salvar cotação solicitada" + err;
            }else{
                return saved;
            }
        })    
    },

    async findDbQuotation(query){
        return await AllQuotation.findOne(query, function(err, res){
            if(err) return "Erro ao consultar findDbQuotation: " + err;
            else return res;
        }).sort({'creatAt': -1}).limit(1).skip(0);
    },

    async findQuotationBy(query, skip){
        return await Quotation.find(query, function(err, res){
            if(err) return "Erro ao consultar findQuotationBy: " + err;
            else return res;
        }).sort({'creatAt': -1}).limit(limit).skip(skip);
    },

    async saveAllQuotation(allQuotation) {
        allQuotation.save(function(err, response){
            if(err){
                throw "Erro ao salvar cotação solicitada" + err;
            }else{
                return response;
            }
        })    
    },

    async deleteQuotation(findQuery, updatequery){
        return await Quotation.updateOne(findQuery, { $set: { active: false }}, function(err, res){
            if(err) return "Erro em deleteQuotation: " + err;
            else return res;
        });
    },
}
