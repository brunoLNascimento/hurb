const config = {
    db: {
        url: 'mongodb+srv://bruno:bruno@cluster0.h6epz.mongodb.net/?retryWrites=true&w=majority',
        urlDocker: 'mongodb://mongo:27017/desafioHurb',
        urlTeste: 'mongodb://localhost:27017/desafioHurbTest',
        options: {
            server: {
                socketOptions: {keepAlive: 1}
                //auto_reconnect: true
            }
        }
    },

    awesomeApi: {
        url: "https://economia.awesomeapi.com.br",
        urlAllQuoatation: "http://economia.awesomeapi.com.br/json/all",
        timeout: 4000,
        retorno: 1
    },

    limit: 10
};

module.exports = config;