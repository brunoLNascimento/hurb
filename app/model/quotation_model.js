const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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
    active: { type: Boolean, default: true}
})

quotation.set('toJSON', {
    getters: true,
    virtuals: true
})

mongoose.model('Quotation', quotation);

