const mongoose = require('mongoose');
const AllQuotation = mongoose.model('AllQuotation');
const cron = require('node-cron');
const { apiService } = require("../service/awesomeApi_service");
const { awesomeApi } = require("../config/config");
const { saveAllQuotation } = require("../repository/quotation_repository");
const moment = require('moment');

function schedule(){
    cron.schedule('0 09-18 * * *', async () => {
      console.log('Rodou script automático às ' +moment().format("DD-MM-YYYY HH:mm"));
      try {
          let url = awesomeApi.urlAllQuoatation;
          let foundAll = await apiService(url);
          let built = buildModel(foundAll);
          saveAllQuotation(built)
      } catch (error) {
          console.log("Erro no worker " +error)
      }
    });
}

function buildModel(foundAll){
    let saveQuotation = new AllQuotation({
        code: [foundAll],
        creatAt: moment().format("YYYY-MM-DD HH:mm:ss")
    })
    
    return saveQuotation;
}

schedule();