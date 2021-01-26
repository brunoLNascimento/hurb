const mongoose = require('mongoose');
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
    }
}
