const axios = require("axios");
const { awesomeApi, timeout } = require("../config/config");

module.exports = {
    async awesomeApi (params){
        let url = `${awesomeApi.url}/${params.coinFrom}-${params.coinTo}/${1}`;
        return await axios.get(url, { timeout: timeout }
            ).then( response => {
                return response.data;
            }).catch(error => {
                throw error;
            })
    }
}