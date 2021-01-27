const axios = require("axios");
const { awesomeApi } = require("../config/config");

module.exports = {
    async apiService (url){
        return new Promise(async (resolve, reject) => {
            await axios.get(url, { timeout: awesomeApi.timeout }
                ).then( response => {
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                })
                
            })
        }
}