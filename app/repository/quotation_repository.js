const mongoose = require('mongoose');
const Quotation = mongoose.model('Quotation');
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

    async  saveAllQuotation(allQuotation) {
        //return false
        allQuotation.save(function(err, response){
            if(err){
                throw "Erro ao salvar cotação solicitada" + err;
            }else{
                return response;
            }
        })    
    }
}
