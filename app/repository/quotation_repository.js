module.exports = {
    
    async save() {
        saveQuotation.save(function(err, saved){
            if(err){
                throw "Erro ao salvar cotação solicitada" + err;
            }else{
                return saved;
            }
        })    
    }
}
