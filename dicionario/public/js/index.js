const form = document.querySelector('form');
const divResultado = document.querySelector('div#resultado');
const scriptTemplate = document.querySelector('#template');
const select = document.querySelector('select');

select.textContent="";
form.addEventListener('submit', function(e) {
  busca(form.dic.value);
  e.preventDefault();
});

function ajax(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = callback;
  xhr.send();
}
palavra="";
function busca(dic) { 
  
  const url = `http://dicionario-aberto.net/search-json/${dic}`
  ajax(url, function(e) {
    printa(JSON.parse(e.target.response));
  });
  var palavra = document.querySelector('textarea').value;
 
  select.textContent= palavra;
  opcao = document.createElement("OPTION");
  opcao.textContent= palavra;
  document.getElementById('select').appendChild(opcao);
  
}

function printa(json) {
    console.log(json);
    const template = scriptTemplate.innerText;
    const handlebars = Handlebars.compile(template);
    if (json.entry.sense[0].def=="") {
      e = json.entry.sense[1].def.indexOf("<br/>");
      while (e!=-1){
        e = json.entry.sense[1].def.indexOf("<br/>");
        json.entry.sense[1].def = json.entry.sense[1].def.replace("<br/>","");
      }
    }
    else{
      e = json.entry.sense[0].def.indexOf("<br/>");
      while (e!=-1){
        e = json.entry.sense[0].def.indexOf("<br/>");
        json.entry.sense[0].def = json.entry.sense[0].def.replace("<br/>","");

      }
    }
    if (json.entry.sense[0].def==""){
    const html = handlebars(json.entry.sense[1]);
    divResultado.innerHTML = html;
    }
    else {
      const html = handlebars(json.entry.sense[0]);
      divResultado.innerHTML = html; 
    }
    
}



