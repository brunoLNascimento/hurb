const quotation = require('../controllers/quotation_controllers')
    
module.exports = function(server) {	
    //rever rotas
    //quotation, rota para consultar cotação e salvar no banco
    server.get('/quotation/:coinFrom/:coinTo?/:amount?', quotation.quotation)
    
    //getQuotation, rota para consultar cotação com paginação
    server.get('/findQuotation/:id?', quotation.getQuotation)

    //remove, rota para exclusão lógica
    server.delete('/removeQuotation/:id', quotation.remove)
    
}