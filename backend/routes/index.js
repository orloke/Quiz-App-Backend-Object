var express = require('express');
var Questao = require('../modelos/questoes');
var fs = require('fs');
var router = express.Router();
var Q = new Questao()

/* GET home page. */
router.get('/', function(req, res, next) {
  Questao.LerTodos(function(dados){
    res.render('index', { title: 'Questões', questao: dados });
  })
});

router.post('/cadastrar-questao', function(req, res, next) {

  Q.question= req.body.question,
  Q.a = req.body.a,
  Q.b = req.body.b,
  Q.c = req.body.c,
  Q.d = req.body.d,
  Q.r = req.body.r,

  Q.salvar(function(questao){
    res.render('index', { title: 'Adicionar Questão', questao: questao });
  })
});

router.post('/buscar', function(req, res, next) {
  Questao.Buscar(req,function(dadosPes){
    res.render('index', { title: 'Adicionar Questão', questao: dadosPes })
  })
});

router.get('/alterar', function(req, res){
  Q.alterar(req, function(j){
    res.render('alterarQ', { title: 'Adicionar Questão', questao: j })
  })

})

router.get('/responder', function(req, res){
  p = 0
  Questao.LerTodos(function(dados){
    i = parseInt(req.query.i)
    res.render('responder', { title: 'Responder', questao:dados[i],l:i, p:p });
  })
})

router.post('/responder', function(req, res){
  Questao.Responder(function(n){    
    res.render('fim', { title: 'Fim', p:n })
  })
})

router.post('/alterar-questao', function(req, res, next) {
  
  Q.question= req.body.question,
  Q.a = req.body.a,
  Q.b = req.body.b,
  Q.c = req.body.c,
  Q.d = req.body.d,
  Q.r = req.body.r,
  
  Q.alterarQ(req,function(dados){
    res.render('index', { title: 'Questão', questao: dados })
  })
});

router.get('/excluir', function(req, res){
  Q.excluir(req,function(novosDados){
    res.render('index', { title: 'Questão', questao: novosDados });
  })  
})

module.exports = router;
