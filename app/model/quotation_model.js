const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoincrement = require('mongoose-sequence')(mongoose);

const quotation = new Schema({
    varBid: { type: Number },
    code: { type: String},
    codein:{ type: String },
    name: { type: String },
    high: { type: Number },
    low: { type: Number },
    pctChange: { type: Number },
    bid: { type: Number },
    ask: { type: Number },
    timestamp: { type: Number },
    create_date: { type: Date },
    message: { type: String },
    valueQuotation: { type: Number },
    creatAt: { type: String },
    active: { type: Boolean, default: true}
})

quotation.plugin(autoincrement, {inc_field: 'quotationId'}).set('toJSON', {
    transform: function(doc, ret){
        delete ret._id,
        delete ret.id,
        delete ret.__v,
        delete ret.active
    },
    getters: true,
    virtuals: true
})

mongoose.model('Quotation', quotation);


