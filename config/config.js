//IMPORTO LA DEPENDENCIA ORACLEDB PARA PODER LA CONEXIÓN A LA BASE DE DATOS
const oracledb = require("oracledb");

//const fs = require('fs');

/*let libPath;
if (process.platform === 'win32') { // Windows
    libPath = 'C:\\Users\\Wilfredo\\Desktop\\instantclient_21_3';
} else if (process.platform === 'darwin') { // macOS
    libPath = process.env.HOME + '/Downloads/instantclient_19_8';
}
if (libPath && fs.existsSync(libPath)) {
    oracledb.initOracleClient({ libDir: libPath });
}*/

async function query(sql, binds, autoCommit) {
    //EL AUTOCOMMIT SIRVE PARA GARANTIZAR LAS TRANSACCIONES DESDE LA APP HASTA LA BASE DE DATOS
    //SE USA "sql" PARA PODER USAR SU LENGUAJE DESDE JS

    let con = await oracledb.getConnection();
    let result = await con.execute(sql, binds, { autoCommit });
    await con.close();
    return result;
}
// SE EXPORTA EL MODULO PARA EL USO FÁCIL EN ROUTES.JS

module.exports = { query };