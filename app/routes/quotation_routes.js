const quotation = require('../controllers/quotation_controllers')
    
module.exports = function(server) {	
    //quotation, rota para consultar cotação e salvar no banco
    server.get('/quotation/:coinFrom/:amount?', quotation.quotation)
    
    //getQuotation, rota para consultar cotação com paginação
    server.get('/findQuotation', quotation.getQuotation)

    //remove, rota para exclusão lógica
    server.delete('/removeQuotation/:id', quotation.remove)
    
}