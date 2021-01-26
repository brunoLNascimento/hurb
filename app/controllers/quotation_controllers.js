const { findQuotation } = require('../service/quotation_service');


module.exports = {
    async quotation (req, res){
        try {
            let found = await findQuotation(req.params);
            return res.status(200).send(found);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    }
}