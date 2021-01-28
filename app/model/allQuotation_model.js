const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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


