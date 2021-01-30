const axios = require("axios");
const { awesomeApi } = require("../config/config");

module.exports = {
    async apiService (url){
        return new Promise(async (resolve, reject) => {
            axios.get(url, { timeout: awesomeApi.timeout }
                ).then( response => {
                    resolve(response.data[0]);
                }).catch(error => {
                    let err = "Erro na conversão dos valores na apiAwesome: ";
                    if(error.response.status == 404)
                        reject( err + error.response.data.message);
                    else{
                        reject( err + error.response.data.message || error.message);
                    }
                })
            })
        }
}