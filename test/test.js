const app = require('../app')
const mongoose = require('mongoose')
const request = require('supertest')
const config = require('../app/config/config')
let { usdId, ethId, eurId } = {}
const moedaNaoResgistrada = "ESP"
const code = "USD"

const quotationUSD = {
    coinFrom: "USD",
    coinTo: "BRL",
    amount: "125.55"
}

const quotationEUR = {
    coinFrom: "EUR",
    coinTo: "BRL",
    amount: "1992.55"
}

const quotationETH = {
    coinFrom: "ETH",
    coinTo: "BRL",
    amount: "1"
}


mongoose.connect(config.db.urlTeste);

describe( 'Testando api de cotação', () =>{
    setTimeout( function () {
        process.exit()
      }, 4000);

    it('#1 - Cotação com moeda não registrada', done => {
        request(app)
        .get(`/quotation/${moedaNaoResgistrada}/${quotationETH.coinTo}/${quotationETH.amount}`)
        .timeout(3000)
        .expect(400)
        .end(done)
    })

    it('#2 - Cotação USD', done => {
        request(app)
        .get(`/quotation/${quotationUSD.coinFrom}/${quotationUSD.coinTo}/${quotationUSD.amount}`)
        .timeout(3000)
        .expect(function (res) {
            if(res.statusCode == 200){
                usdId = res.body.quotationId
            }else{
                throw Error(res.statusCode)
            }
        })
        .end(done)
    })
    
    it('#3 - Cotação EUR', done => {
        request(app)
        .get(`/quotation/${quotationEUR.coinFrom}/${quotationEUR.coinTo}/${quotationEUR.amount}`)
        .timeout(3000)
        .expect(function (res) {
            if(res.statusCode == 200){
                eurId = res.body.quotationId
            }else{
                throw Error(res.statusCode)
            }
        })
        .end(done)
    })
    
    it('#4 - Cotação ETH', done => {
        request(app)
        .get(`/quotation/${quotationETH.coinFrom}/${quotationETH.coinTo}/${quotationETH.amount}`)
        .timeout(3000)
        .expect(function (res) {
            if(res.statusCode == 200){
                ethId = res.body.quotationId
            }else{
                throw Error(res.statusCode)
            }
        })
        .end(done)
    })

    it('#5 - Busca todos as cotações', done => {
        request(app)
        .get(`/findQuotation/`)
        .timeout(3000)
        .expect(200)
        .end(done)
    })
    
    it('#6 - Busca cotação com ID não numérico', done => {
        request(app)
        .get(`/findQuotation/${code}`)
        .timeout(3000)
        .expect(400)
        .end(done)
    })
    
    it('#7 - Busca cotação com ID e code da moeda', done => {
        request(app)
        .get(`/findQuotation/${usdId}?code=${code}`)
        .timeout(3000)
        .expect(400)
        .end(done)
    })

    it('#8 - Busca todos as cotações página 1, sem resultado', done => {
        request(app)
        .get(`/findQuotation/?page=1`)
        .timeout(3000)
        .expect(400)
        .end(done)
    })

    it('#9 - Busca todos as cotações por code', done => {
        request(app)
        .get(`/findQuotation/?code=${code}`)
        .timeout(3000)
        .expect(200)
        .end(done)
    })

    it('#10 - Busca cotação por ID', done => {
        request(app)
        .get(`/findQuotation/${usdId}`)
        .timeout(3000)
        .expect(200)
        .end(done)
    })

    it('#11 - deleteQuotationUSD' + usdId, done => {
        request(app)
        .delete(`/removeQuotation/${usdId}`)
        .timeout(3000)
        .expect(200)
        .end(done)
    })

    it('#12 - deleteQuotationEUR', done => {
        request(app)
        .delete(`/removeQuotation/${eurId}`)
        .timeout(3000)
        .expect(200)
        .end(done)
    })

    it('#13 - deleteQuotationETH', done => {
        request(app)
        .delete(`/removeQuotation/${ethId}`)
        .timeout(3000)
        .expect(200)
        .end(done)
    })
})  
    
