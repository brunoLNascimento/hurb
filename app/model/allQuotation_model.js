const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * AllQuotation: Model salva a consulta feita pela url: http://economia.awesomeapi.com.br/json/all
 * Dessa forma não é necessário consultar a api awesomeapi todas as vezes que uma consulta for feita
 * será válidado uma hora para que possa ser utilizado o valor salvo em AllQuotation
*/
const allQuotation = new Schema({ 
    code: {},
    creatAt: { type: String }
    }
)

allQuotation.set('toJSON', {
    getters: true,
    virtuals: true
})

mongoose.model('AllQuotation', allQuotation);


