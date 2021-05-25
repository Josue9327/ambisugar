const express = require('express');
const router = express.Router();
const rsa = require('node-rsa');
const pool = require('../database');

router.post('/generar_pdf', async(req, res)=>{
    var resultado = req.body.resultado;
    let buffers =  [];
    var pdf_document = require('pdfkit');
    var pdf = new pdf_document;
    pdf.on('data', buffers.push.bind(buffers));
    pdf.on('end', ()=>{
        
        let pdfdata = Buffer.concat(buffers);
        var key = new rsa();
    const privateKey = key.importKey(req.user.privaka, 'pkcs8-private-pem');
    const publicKey = key.importKey(req.user.publika, 'pkcs8-public-pem');
    const sign = privateKey.sign(pdfdata);
    const verify = publicKey.verify(pdfdata, sign);
    });
    pdf.pipe(res)
    pdf.text('Resultados')
    .fillColor('red', 305, 150)
    .fontSize(17);
    pdf.text("Quimica:" + resultado)
    .fillColor('red', 305, 150)
    .fontSize(17);
    pdf.end();

    

    
    res.download("Resultados.pdf");
    
});

module.exports = router;