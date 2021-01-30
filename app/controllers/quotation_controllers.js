const { findQuotation, quotation } = require('../service/quotation_service');


module.exports = {
    async quotation (req, res){
        try {
            let found = await findQuotation(req.params);
            return res.status(200).send(found);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message || error);
        }
    },

    async getQuotation(req, res){
        try {
            let params = {
                id: req.params.id,
                page: parseInt( req.query.page ? req.query.page : 0 ),
                code: req.query.code.toUpperCase()
            };
                
            let found = await quotation(params);
            return res.status(200).send(found);
        } catch (error) {
            return res.status(400).send(error.message || error);
        }
    }
}