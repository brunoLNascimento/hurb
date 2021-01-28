const axios = require("axios");
const { awesomeApi } = require("../config/config");

module.exports = {
    async apiService (url){
        return new Promise(async (resolve, reject) => {
            axios.get(url, { timeout: awesomeApi.timeout }
                ).then( response => {
                    resolve(response.data[0]);
                }).catch(error => {
                    reject(error);
                })
            })
        }
}