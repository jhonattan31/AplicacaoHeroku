let formNome = document.querySelector(".form-nome");
let formGrupo = document.querySelector(".form-grupo");
let formMensagem = document.querySelector(".form-mensagem");

let listaGrupos = document.querySelector(".lista-grupos");
let listaMensagens = document.querySelector(".lista-mensagens");

let overlayModal = document.querySelector(".overlay-modal");

userNome = "";
idGrupo = "";
idGrupoAnterior = "";
grupoDivs = "";

formNome.addEventListener("submit", (event) => {
    event.preventDefault();

    userNome = (document.querySelector(".form-nome input")).value;

    if(userNome == ""){
        alert("Preencha o campo corretamente");
    }else{
        let userNomeDiv = document.querySelector(".container .layout .cabecalho .nome-user");
        let userNomeSpan = document.createElement("span");
        userNomeSpan.textContent = userNome;
        userNomeDiv.appendChild(userNomeSpan);

        overlayModal.classList.add("close")
        getGrupos()
    }
})

formGrupo.addEventListener("submit", (event)=>{
    event.preventDefault();

    let inputGrupo = document.querySelector(".form-grupo input");

    if(inputGrupo.value == "") {
        alert("Preencha o campo corretamente");
    }else{
        inserirGrupo(inputGrupo.value);

        inputGrupo.value = "";
    }
})

formMensagem.addEventListener("submit", (event)=>{
    event.preventDefault();

    let inputMensagem = document.querySelector(".form-mensagem input");

    if(inputMensagem.value == "") {
        alert("Preencha o campo corretamente");
    }else{
        inserirMensagem(userNome, inputMensagem.value);

        inputMensagem.value = "";
    }
    
})

function criarGrupo(name, id){

    let grupo = document.createElement("div");
    let grupoImg = document.createElement("div");
    let grupoNome = document.createElement("div");

    let imgGrupo = document.createElement("img");
    let spanNome = document.createElement("span");

    grupo.classList.add("grupo");
    grupoImg.classList.add("grupo-img");
    grupoNome.classList.add("grupo-nome");

    imgGrupo.src = "https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824147_960_720.png";
    imgGrupo.alt = "Imagem";

    spanNome.textContent = name;

    grupoImg.appendChild(imgGrupo);
    grupoNome.appendChild(spanNome);
    

    grupo.appendChild(grupoImg);
    grupo.appendChild(grupoNome);

    let strongIdGrupo = document.createElement("strong");

    if(id == null ){
        strongIdGrupo.textContent = idGrupoAnterior + 1;
    }else{
        strongIdGrupo.textContent = id;
    }

    idGrupoAnterior = parseInt(strongIdGrupo.textContent);
    
    grupo.appendChild(strongIdGrupo)


    grupo.addEventListener("click", (event) => {
        event.preventDefault();

        idGrupo= parseInt(strongIdGrupo.textContent);

        getMensagens();
        formMensagem.classList.remove("close");

        grupoDivs.forEach(gp => {
            gp.classList.remove("active");
        });

        grupo.classList.add("active");

        let mensagensContainer = document.querySelector(".container-mensagens");
        mensagensContainer.classList.add("wallpaper")

    })

    return grupo;
}

function getGrupos(){
    axios({
        method: "GET",
        url: "https://server-json-lms.herokuapp.com/grupos"
    }).then((response) => {
        for (const grupo of response.data) {
            listaGrupos.appendChild(criarGrupo(grupo.nome, grupo.id))
        }

        grupoDivs = document.querySelectorAll(".grupo");

    }).catch((error) => {
        console.log(error);
    })
}

function inserirGrupo(nome){
    axios({
        method: "POST",
        url: "https://server-json-lms.herokuapp.com/grupos",
        data: {
            nome: nome
        }
    }).then((response) => {
        listaGrupos.appendChild(criarGrupo(response.data.nome));

        grupoDivs = document.querySelectorAll(".grupo");
    }).catch((error) => {
        console.log(error);
    })
}

function criarMensagem(user, text){

    let mensagem = document.createElement("div");
    let usuario = document.createElement("div");
    let texto = document.createElement("div");

    let strongUser = document.createElement("strong");
    let spanTexto = document.createElement("span");

    mensagem.classList.add("mensagem");
    usuario.classList.add("usuario");
    texto.classList.add("texto");

    strongUser.textContent = user;
    spanTexto.textContent = text;

    //strongUser.style.color = generateColorRandom(); 

    usuario.appendChild(strongUser);
    texto.appendChild(spanTexto);

    mensagem.appendChild(usuario);
    mensagem.appendChild(texto);

    return mensagem;

}

function getMensagens(){
    axios({
        method: "GET",
        url: "https://server-json-lms.herokuapp.com/grupos/"+idGrupo+"/mensagens"
    }).then((response) => {
        listaMensagens.innerHTML = "";
        for (const mensagem of response.data) {
            listaMensagens.appendChild(criarMensagem(mensagem.nome, mensagem.corpo));
        }
    }).catch((error) => {
        console.log(error);
    })
}

function inserirMensagem(user, text){
    axios({
        method: "POST",
        url: "https://server-json-lms.herokuapp.com/mensagens",
        data: {
            nome: user,
            corpo: text,
            grupoId: idGrupo
        }
    }).then((response) => {
        listaMensagens.appendChild(criarMensagem(response.data.nome, response.data.corpo))
    }).catch((error) => {
        console.log(error);
    })
}