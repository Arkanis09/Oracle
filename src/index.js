const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const conn = require('../config/config');

const router = require('../routes/routes')
const oracledb = require('oracledb');

const bancos = require('../routes/Bancos');
const cargos = require('../routes/Cargos_laborales');
const bonos = require('../routes/Catalogo-bonos');

/*CONFIGURACIONES*/

const db = {
    user: "Mefisto",
    password: "Paradise30",
    connectString: "localhost:1521/xepdb1",
    //connectString: "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=192.168.6.129)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=xepdb1)))",

};

app.set('port', 2020);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(router);
app.use(bancos);
app.use(cargos);
app.use(bonos);

app.listen(app.get('port'), async() => {
    await oracledb.createPool(db);
    console.log("server status 200 on port 2020")
});