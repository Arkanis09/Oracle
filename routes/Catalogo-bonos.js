const { Router } = require('express');
const router = Router();
const DB = require('../config/config');

router.get('/Bonos', async(req, res) => {
    let result = await DB.query("SELECT * FROM CATALOGO_BONOS", [], false);

    const bonos = result.rows.map(bono => {
        let userSchema = {
            "COD_CIA": bono[0],
            "COD_BONO": bono[1],
            "NOMBRE_BONO": bono[2]
        }
        return userSchema;
    });
    res.json({ bonos })
})




router.post('/Bonos', async(req, res) => {



    const values = [
        req.body.COD_CIA,
        req.body.COD_BONO,
        req.body.NOMBRE_BONO
    ]

    let condicional = await DB.query("SELECT * FROM CATALOGO_BONOS WHERE COD_CIA= :v1", [req.body.COD_CIA], false);

    console.log(condicional);

    if (condicional.rows.length == 0) {
        let ing = await DB.query("INSERT INTO CATALOGO_BONOS (COD_CIA, COD_BONO, NOMBRE_BONO) VALUES (:COD_CIA, :COD_BONO, :NOMBRE_BONO)", values, true)



        res.json({ data: ing, error: null })
    } else {
        res.json({ data: null, error: "YA HAY UN USUARIO CON ESTE CODIGO" })


    }



    router.put('/Bonos', async(req, res) => {
        const set = [
            req.body.COD_CIA,
            req.body.COD_BONO,
            req.body.NOMBRE_BONO,
            req.body.COD_CIA
        ]

        console.log(set);
        let upd = await DB.query("UPDATE CATALOGO_BONOS SET COD_CIA= :v1, COD_BONO= :v2, NOMBRE_BONO= :v3 WHERE COD_CIA= :v4", set, true);

        res.json({ upd, data: req.body });
    })

    router.delete('/Bonos', async(req, res) => {
        const dele = [
            req.body.COD_CIA
        ]


        let del = await DB.query("DELETE FROM CATALOGO_BONOS WHERE COD_CIA = :v1", dele, true);

        res.json({ del, data: req.body });
    })










})




module.exports = router;