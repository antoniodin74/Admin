var express = require('express');
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });
const odbc = require('odbc');
var validator = require('express-validator');
var axios = require("axios");

//As400
async function getAs(pars){
	console.log('PARS: ' + pars);
	
	var num = Number(pars.start);	
		
		if(pars.start!==undefined){
			if(num !== 0){
				var dtini=(pars.start);
				var aa = dtini.substring(6, 10);
				var mm = dtini.substring(3, 5);
				var gg = dtini.substring(0, 2);
				var dtini = aa + '-' + mm + '-' + gg;
				var dtfin=(pars.end);
				var aa = dtfin.substring(6, 10);
				var mm = dtfin.substring(3, 5);
				var gg = dtfin.substring(0, 2);
				var dtfin = aa + '-' + mm + '-' + gg;
		} else {
		const dtday = new Date();
		const dtday1 = new Date();
		dtday1.setDate(dtday.getDate() - 1);
		var dtfin = giraData(dtday);
		var dtini = giraData(dtday1);
	 	} 
	} else {
		const dtday = new Date();
		const dtday1 = new Date();
		dtday1.setDate(dtday.getDate() - 1);
		var dtfin = giraData(dtday);
		var dtini = giraData(dtday1);
	 	} 

	var whereCampi = await DecWhere(pars);
	if(whereCampi === undefined){
		whereCampi = ' LAARE0 = ? AND LABDT0 >= ? AND LABDT0 <=? '
	}
	var where = ' WHERE ' +   whereCampi;
	
	var anno = 2023;
	var paramanno = anno;
	var paramDtini = dtini;
	var paramDtfin = dtfin;
	var param =[
		paramanno,
		paramDtini,
		paramDtfin
	];

	console.log('WHERE: ' + where);
	console.log('PARAM: ' + param);

	const cn1 = "DSN=nodejs;UID=dinoceraa;PWD=antodino";
	const connection = await odbc.connect(cn1);
	const data = await connection.query('SELECT LAARE0, LANRE0, LADER0, LATBO0,LABNR0,LABDT0,LABTI0,LASTR0,COUNT(*) as TCNT  FROM L0__STDAT.LABOLF0' + where + 'GROUP BY LAARE0, LANRE0, LADER0, LATBO0, LATBO0,LABNR0,LABDT0,LABTI0,LASTR0 ORDER BY LANRE0' , param);
	return data;
}

async function DecWhere(pars) {
	for (var prop in pars) {
		var campi;
		//console.log(prop + ": " + pars[prop]);

		if(pars[prop]!==undefined && +pars[prop]!==0 && pars[prop]!==""){
			if(campi===undefined){
				if(prop === 'start') {
					prop = 'LABDT0';
					campi = prop + ' >= ? ';
				}
				 else if(prop === 'end') {
					prop = 'LABDT0';
					campi = prop + ' <= ? ';
				}
				else {
					campi = prop + '= ? ';
				}
				//campi = prop + '= ? '; 
				//console.log("WHERE "+campi);
			}else{
				if(prop === 'start') {
					prop = 'LABDT0';
					campi += 'AND ' + prop + ' >= ? '; 
				}
				else if(prop === 'end') {
					prop = 'LABDT0';
					campi += 'AND ' + prop + ' <= ? '; 
				}
				else {
					campi += 'AND ' + prop + '= ? '; 
				}
				//campi += 'AND ' + prop + '= ? '; 
				//console.log("WHERE "+campi);
			}
		};
	  }
	  return campi;
  }

function giraData (data) {
	gg = data.getDate();
	mm = data.getMonth()+1;
	aa = data.getFullYear();
	let ggg = "";
	if(gg<10){
		ggg = "0"+gg;
	}else{
		ggg = gg;
	}
	let mmm = "";
	if(mm<10){
		mmm = "0"+mm;
	}else{
		mmm = mm;
	}
	const dtgira = aa +'-'+ mmm + '-' + ggg;
	return dtgira;
}

module.exports =  {
	getAs
};