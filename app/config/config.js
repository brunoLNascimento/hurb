const config = {
    db: {
        url: 'mongodb://localhost:27017/desafioHurb',
        urlTeste: 'mongodb://localhost:27017/desafioHurbTest',
        options: {
            server: {
                socketOptions: {keepAlive: 1},
                auto_reconnect: true
            }
        }
    },

    awesomeApi: {
        url: "https://economia.awesomeapi.com.br",
        timeout: 3000
    }
};

module.exports = config