const { Router } = require('express');
const router = Router();
const DB = require('../config/config');


router.get('/Bancos', async(req, res) => {
    let result = await DB.query("SELECT * FROM BANCOS", [], false);

    const bancos = result.rows.map(banco => {
        let userSchema = {
            "COD_CIA": banco[0],
            "COD_BANCO": banco[1],
            "BANCODESC": banco[2]
        }
        return userSchema;
    });
    res.json({ bancos })
})




router.post('/bancos', async(req, res) => {



    const values = [
        req.body.COD_CIA,
        req.body.COD_BANCO,
        req.body.BANCODESC
    ]

    let condicional = await DB.query("SELECT * FROM BANCOS WHERE COD_CIA= :v1", [req.body.COD_CIA], false);

    console.log(condicional);

    if (condicional.rows.length == 0) {
        let ing = await DB.query("INSERT INTO BANCOS (COD_CIA, COD_BANCO, BANCODESC) VALUES (:COD_CIA, :COD_BANCO, :BANCODESC)", values, true)



        res.json({ data: ing, error: null })
    } else {
        res.json({ data: null, error: "YA HAY UN USUARIO CON ESTE CODIGO" })


    }



    router.put('/bancos', async(req, res) => {
        const set = [
            req.body.COD_CIA,
            req.body.COD_BANCO,
            req.body.BANCODESC,
            req.body.COD_CIA
        ]

        console.log(set);
        let upd = await DB.query("UPDATE BANCOS SET COD_CIA= :v1, COD_BANCO= :v2, BANCODESC= :v3 WHERE COD_CIA= :v4", set, true);

        res.json({ upd, data: req.body });
    })

    router.delete('/bancos', async(req, res) => {
        const dele = [
            req.body.COD_CIA
        ]


        let del = await DB.query("DELETE FROM ASISTENCIA WHERE COD_CIA = :v1", dele, true);

        res.json({ del, data: req.body });
    })










})


router.put('/bancos', async(req, res) => {
    const set = [
        req.body.COD_CIA,
        req.body.COD_BANCO,
        req.body.BANCODESC,
        req.body.COD_CIA
    ]

    console.log(set);
    let upd = await DB.query("UPDATE BANCOS SET COD_CIA= :v1, COD_BANCO= :v2, BANCODESC= :v3 WHERE COD_CIA = :v4", set, true);

    res.json({ upd, data: req.body });
})

router.delete('/bancos', async(req, res) => {
    const dele = [
        req.body.COD_CIA
    ]


    let del = await DB.query("DELETE FROM BANCOS WHERE COD_CIA = :v1", dele, true);

    res.json({ del, data: req.body });
})

module.exports = router;