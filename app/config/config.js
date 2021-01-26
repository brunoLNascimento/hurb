const config = {
    db: {
        url: 'mongodb://localhost:27017/desafioHurb',
        urlTeste: 'mongodb://localhost:27017/desafioHurbTest',
        options: {
            db: {native_parser: true},
            server: {
                poolSize: 5,
                socketOptions: {keepAlive: 1},
                auto_reconnect: true
            }
        }
    },

    awesomeApi: {
        url: "https://economia.awesomeapi.com.br"
    }
};

module.exports = config