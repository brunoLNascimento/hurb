const axios = require("axios");
const { awesomeApi } = require("../config/config");

module.exports = {
    async awesomeApi (params){
        let url = `${awesomeApi.url}/${params.coinFrom}-${params.coinTo}/${awesomeApi.retorno}`;
        return await axios.get(url, { timeout: awesomeApi.timeout }
            ).then( response => {
                return response.data;
            }).catch(error => {
                throw error;
            })
    }
}