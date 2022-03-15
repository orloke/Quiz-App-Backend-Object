require('../config/app')
var fs = require('fs');

var Questao = function(){
    this.question = ''
    this.a =''
    this.b =''
    this.c =''
    this.d =''
    this.r =''

    this.excluir = (req,callback) => {
        Questao.LerTodos(function(dados){
          let novosDados = []
          for(i = 0; i<dados.length; i++){
            if(req.query.question != dados[i].question){
              novosDados.push(dados[i])
            }
          }
          Questao.SalvarTodos(novosDados)
          callback.call(null,novosDados)
        })

    }

    this.alterar = (req,callback) => {
      Questao.LerTodos(function(dados){
        for(i = 0; i<dados.length; i++){
          if(req.query.question == dados[i].question){
            novosDados = dados[i]
          }
        }
        callback.call(null,novosDados)
      })
    }

    this.alterarQ = (req,callback)=>{
      let question = this.question 
      let a = this.a
      let b = this.b
      let c = this.c
      let d = this.d
      let r = this.r
      Questao.LerTodos(function(dados){
        for(i = 0; i<dados.length;i++){
          if(req.query.question == dados[i].question){
            dados[i].question = req.body.question
            dados[i].a = a
            dados[i].b = b
            dados[i].c = c
            dados[i].d = d
            dados[i].r = r
          }
        }
        Questao.SalvarTodos(dados)
        callback.call(null, dados)
      })
    }

    this.salvar = (callback) => {
      let question = this.question 
      let a = this.a
      let b = this.b
      let c = this.c
      let d = this.d
      let r = this.r
      Questao.LerTodos(function(questao){

        hash = {
          question: question,
          a: a,
          b: b,
          c: c,
          d: d,
          r: r,
        }

        questao.push(hash)
        Questao.SalvarTodos(questao)
        callback.call(null,questao)           
      })
    }
}

Questao.SalvarTodos = (array) => {
    fs.writeFile(caminho, JSON.stringify(array), function(err){
        if(err){
          console.log('Não foi possível gravar os dados')
        }
    })
}

Questao.Buscar = (req, callback) =>{
  Questao.LerTodos(function(dados){
    let dadosPes =[]
    for(i = 0; i<dados.length;i++){
      if(dados[i].question.indexOf(req.body.question) != -1){
        dadosPes.push(dados[i])
      }
    }
    callback.call(null, dadosPes)
  })
}

Questao.LerTodos = (callback) => {
    fs.readFile(caminho, function(err,data){
      if(err){
        console.log('Não foi possível encontrar os dados')
        return
      }
      else{
        dados = JSON.parse(data)
        callback.call(null,dados)
      }
    })
}

Questao.Responder = (callback) => {
  Questao.LerTodos(function(dados){
    if(parseInt(req.query.i)<dados.length-1){
      i = parseInt(req.query.i) + 1
      if(req.body.alternativa == dados[parseInt(req.query.i)].r){
         p++
      }
      res.render('responder', { title: 'Responder', questao:dados[i], l:i, p:p })
    }
    if((req.query.i)==dados.length-1){
      if(req.body.alternativa == dados[parseInt(req.query.i)].r){
        p++
      }
    callback.call(p)
    }
  })
}

module.exports = Questao