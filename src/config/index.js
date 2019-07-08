export const configAccessHeader = (req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type', 'x-access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader('Charset', 'UTF-8');

    // Pass to next layer of middleware
    next();
}

export const config = {
    hostname: 'http://localhost',
    servername: 'localhost',
    port: 3000,
    database: {
        mongo: {
            dbname: '',
            port: null
        },
        mssql: {
            server: '',
            database: '',
            user: '',
            password: '',
            connectionTimeout: 50000,
            parseJSON: true,
            option: { encrypt: false }
        }
    },
    mailer: {
        smtp: {
            host: 'smtpo365',
            port: 25,
            secure: false
        },
        header: {
            from: '',
            headers: {
                'X-Laziness-level': 1000
            }
        },
        config: {
            from: '',
            to: '',
            cc: ''
        },
        configTest: {
            from: '',
            to: '',
            cc: ''
        }
    },
    schedule: {
        job: ['00 00 10 * *', '00 00 14 * *', '00 49 16 * *'],
        workingDay: '1-5',
        timeZone: 'Asia/Bangkok'
    },
    auth: {
        user: '',
        pass: ''
    }
}


