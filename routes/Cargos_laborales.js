const { Router } = require('express');
const router = Router();
const DB = require('../config/config');



router.get('/Cargos', async(req, res) => {
    let result = await DB.query("SELECT * FROM CARGO_LABORALES", [], false);

    const cargos = result.rows.map(cargo => {
        let userSchema = {
            "COD_CIA": cargo[0],
            "COD_NEGOCIO": cargo[1],
            "COD_LABORAL": cargo[2],
            "DESCRIPCION": cargo[3],
        }
        return userSchema;
    });
    res.json({ cargos })
})




router.post('/Cargos', async(req, res) => {



    const values = [
        req.body.COD_CIA,
        req.body.COD_NEGOCIO,
        req.body.COD_LABORAL,
        req.body.DESCRIPCION
    ]

    let condicional = await DB.query("SELECT * FROM CARGO_LABORALES WHERE COD_CIA= :v1", [req.body.COD_CIA], false);

    console.log(condicional);

    if (condicional.rows.length == 0) {
        let ing = await DB.query("INSERT INTO CARGO_LABORALES (COD_CIA, COD_NEGOCIO, COD_LABORAL, DESCRIPCION) VALUES (:COD_CIA, :COD_NEGOCIO, :COD_LABORAL, :DESCRIPCION)", values, true)



        res.json({ data: ing, error: null })
    } else {
        res.json({ data: null, error: "YA HAY UN USUARIO CON ESTE CODIGO" })


    }



    router.put('/Cargos', async(req, res) => {
        const set = [
            req.body.COD_CIA,
            req.body.COD_NEGOCIO,
            req.body.COD_LABORAL,
            req.body.DESCRIPCION,
            req.body.COD_CIA
        ]

        console.log(set);
        let upd = await DB.query("UPDATE CARGO_LABORALES SET COD_CIA= :v1, COD_NEGOCIO= :v2, COD_LABORAL= :v3, DESCRIPCION= :v4 WHERE COD_CIA= :v5", set, true);

        res.json({ upd, data: req.body });
    })

    router.delete('/Cargos', async(req, res) => {
        const dele = [
            req.body.COD_CIA
        ]


        let del = await DB.query("DELETE FROM CARGO_LABORALES WHERE COD_CIA = :v1", dele, true);

        res.json({ del, data: req.body });
    })










})



module.exports = router;