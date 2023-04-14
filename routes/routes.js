//ARCHIVO DONDE HAGO LAS PETICIONES GET, PUT, POST Y DELETE DESDE EL BACKEND PARA QUE LA BASE DE DATOS ELEGIDA ME LO LEA


const { Router } = require('express');
const router = Router();
const DB = require('../config/config');

router.get('/', (req, res) => {
    res.status(200).json({
        message: "prueba"
    });
});
// AQUI INICIA EL CRUD DE EMPLEADO
router.get('/empleado', async(req, res) => {
    let result = await DB.query("SELECT * FROM empleado ORDER BY COD_CIA", [], false);

    const empleados = result.rows.map(empleado => {
        let userSchema = {
            "COD_CIA": empleado[0],
            "COD_NEGOCIO": empleado[1],
            "COD_EMPLEADO": empleado[2],
            "PRIMER_NOMBRE": empleado[3],
            "SEGUNDO_NOMBRE": empleado[4],
            "PRIMER_APELLIDO": empleado[5],
            "SEGUNDO_APELLIDO": empleado[6],
            "FECHA_NACIMIENTO": empleado[7],
            "DUI": empleado[8],
            "NIT": empleado[9],
            "PASAPORTE": empleado[10],
            "COD_AFP": empleado[11],
            "NUMERO_SEGURO_SOCIAL": empleado[12],
            "NUMERO_AFP": empleado[13],
            "SEXO": empleado[14],
            "ESTADO_CIVIL": empleado[15],
            "DIRECCION": empleado[16],
            "TELEFONO": empleado[17],
            "CURRICULUM": empleado[18],
            "FOTO": empleado[19],
            "TITULO_UNIVERSITARIO": empleado[20],
            "CONTRATO_LABORAL": empleado[21],
            "DOCUMENTOS_PERSONALES": empleado[22],
            "FECHA_INICIA_CONTRATO": empleado[23],
            "FECHA_FINALIZA_CONTRATO": empleado[24],
            "MESES_CONTRATO": empleado[25],
            "PRESTACIONES": empleado[26],
            "COD_LABORAL": empleado[27],
            "ORDEN_DESCUENTO": empleado[28],
            "ESTATUS_EMPLEADO": empleado[29],
            "CUENTA_BANCARIA": empleado[30],
            "COD_BANCO": empleado[31],
            "EMAIL": empleado[32]
        }

        return userSchema;
    });

    res.json({ empleados });
});




router.post('/empleado', async(req, res) => {



    const values = [
        req.body.COD_CIA,
        req.body.COD_NEGOCIO,
        req.body.COD_EMPLEADO,
        req.body.PRIMER_NOMBRE,
        req.body.SEGUNDO_NOMBRE,
        req.body.PRIMER_APELLIDO,
        req.body.SEGUNDO_APELLIDO,
        req.body.COD_AFP,
        req.body.FECHA_NACIMIENTO
    ]

    let condicional = await DB.query("SELECT * FROM EMPLEADO WHERE COD_CIA= :v1", [req.body.COD_CIA], false);

    console.log(condicional);

    if (condicional.rows.length == 0) {
        let ing = await DB.query("INSERT INTO EMPLEADO (COD_CIA, COD_NEGOCIO, COD_EMPLEADO, PRIMER_NOMBRE, SEGUNDO_NOMBRE, PRIMER_APELLIDO, SEGUNDO_APELLIDO, COD_AFP, FECHA_NACIMIENTO) VALUES (:COD_CIA, :COD_NEGOCIO, :COD_EMPLEADO, :PRIMER_NOMBRE, :SEGUNDO_NOMBRE, :PRIMER_APELLIDO, :SEGUNDO_APELLIDO, :COD_AFP, :FECHA_NACIMIENTO)", values, true)



        res.json({ data: ing, error: null })
    } else {
        res.json({ data: null, error: "YA HAY UN USUARIO CON ESTE CODIGO" })


    }









})


router.put('/empleado', async(req, res) => {
    const set = [
        req.body.COD_CIA,
        req.body.COD_NEGOCIO,
        req.body.COD_EMPLEADO,
        req.body.PRIMER_NOMBRE,
        req.body.SEGUNDO_NOMBRE,
        req.body.PRIMER_APELLIDO,
        req.body.SEGUNDO_APELLIDO,
        req.body.COD_AFP,
        req.body.COD_CIA
    ]

    console.log(set);
    let upd = await DB.query("UPDATE EMPLEADO SET COD_CIA = :v1, COD_NEGOCIO = :v2, COD_EMPLEADO = :v3, PRIMER_NOMBRE = :v4, SEGUNDO_NOMBRE= :v5, PRIMER_APELLIDO= :v6, SEGUNDO_APELLIDO= :v7, COD_AFP= :v8 WHERE COD_CIA = :v9", set, true);

    res.json({ upd, data: req.body });
})

router.delete('/empleado', async(req, res) => {
    const dele = [
        req.body.COD_CIA
    ]


    let del = await DB.query("DELETE FROM EMPLEADO WHERE COD_CIA = :v1", dele, true);

    res.json({ del, data: req.body });
})



// AQUI FINALIZA EL CRUD EMPLEADO

// AQUI INICIA EL CRUD ASISTENCIA

router.get('/Asistencia', async(req, res) => {
    let result = await DB.query("SELECT * FROM ASISTENCIA", [], false);

    const asistencias = result.rows.map(asistencia => {
        let userSchema = {
            "COD_CIA": asistencia[0],
            "COD_NEGOCIO": asistencia[1],
            "ANIO": asistencia[2],
            "MES": asistencia[3],
            "TIPO_PLANILLA": asistencia[4],
            "COD_EMPLEADO": asistencia[5],
            "DIAS_TRABAJADOS": asistencia[6],
            "SALARIO_MENSUAL": asistencia[7],
            "SALARIO_DEVENGADO": asistencia[8],
            "METODO": asistencia[9],
        }

        return userSchema;
    });

    res.json({ asistencias });
});

router.post('/Asistencia', async(req, res) => {



    const values = [
        req.body.COD_CIA,
        req.body.COD_NEGOCIO,
        req.body.ANIO,
        req.body.MES,
        req.body.TIPO_PLANILLA,
        req.body.COD_EMPLEADO,
        req.body.DIAS_TRABAJADOS,
        req.body.SALARIO_MENSUAL,
        req.body.SALARIO_DEVENGADO,
        req.body.METODO
    ]

    let condicional = await DB.query("SELECT * FROM ASISTENCIA WHERE COD_CIA= :v1", [req.body.COD_CIA], false);

    console.log(condicional);

    if (condicional.rows.length == 0) {
        let lecturaAsistencia = await DB.query("INSERT INTO ASISTENCIA (COD_CIA, COD_NEGOCIO, ANIO, MES, TIPO_PLANILLA, COD_EMPLEADO, DIAS_TRABAJADOS, SALARIO_MENSUAL, SALARIO_DEVENGADO, METODO) VALUES (:COD_CIA, :COD_NEGOCIO, :ANIO, :MES, :TIPO_PLANILLA, :COD_EMPLEADO, :DIAS_TRABAJADOS, :SALARIO_MENSUAL, :SALARIO_DEVENGADO, :METODO)", values, true)



        res.json({ data: lecturaAsistencia, error: null })
    } else {
        res.json({ data: null, error: "YA HAY UN USUARIO CON ESTE CODIGO" })


    }
})

router.put('/Asistencia', async(req, res) => {
    const set = [
        req.body.COD_CIA,
        req.body.COD_NEGOCIO,
        req.body.ANIO,
        req.body.MES,
        req.body.TIPO_PLANILLA,
        req.body.COD_EMPLEADO,
        req.body.DIAS_TRABAJADOS,
        req.body.SALARIO_MENSUAL,
        req.body.SALARIO_DEVENGADO,
        req.body.METODO,
        req.body.COD_CIA
    ]

    console.log(set);
    let upd = await DB.query("UPDATE ASISTENCIA SET COD_CIA= :v1, COD_NEGOCIO= :v2, ANIO= :v3, MES= :v4, TIPO_PLANILLA= :v5, COD_EMPLEADO= :v6, DIAS_TRABAJADOS= :v7, SALARIO_MENSUAL= :v8, SALARIO_DEVENGADO= :v9, METODO= :v10 WHERE COD_CIA= :v11", set, true);

    res.json({ upd, data: req.body });
})

router.delete('/Asistencia', async(req, res) => {
    const dele = [
        req.body.COD_CIA
    ]


    let del = await DB.query("DELETE FROM ASISTENCIA WHERE COD_CIA = :v1", dele, true);

    res.json({ del, data: req.body });
})




//AQUI TERMINA EL CRUD ASISTENCIA


// AQUI INICIA EL CRUD BANCOS






//AQUI TERMINA EL CRUD BANCOS




module.exports = router;