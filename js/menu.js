/* Menu do cabeçalho. O HTML entrega todos os links mesmo sem JavaScript. */
const botaoMenu = document.querySelector(".menu-botao");
const painelMenu = document.getElementById(botaoMenu.getAttribute("aria-controls"));
const cabecalho = botaoMenu.closest("header");
const telaCelular = window.matchMedia("(max-width: 600px)");

function definirMenu(aberto) {
    botaoMenu.setAttribute("aria-expanded", String(aberto));
}

botaoMenu.addEventListener("click", () => {
    const aberto = botaoMenu.getAttribute("aria-expanded") === "true";
    definirMenu(!aberto);
});

/* Escape devolve o foco ao botão. Ao tocar fora, o foco segue o toque. */
document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && botaoMenu.getAttribute("aria-expanded") === "true") {
        definirMenu(false);
        botaoMenu.focus();
    }
});

document.addEventListener("click", (evento) => {
    if (!cabecalho.contains(evento.target)) {
        definirMenu(false);
    }
});

/* Ao voltar do computador para o celular, o painel começa recolhido. */
telaCelular.addEventListener("change", (evento) => {
    if (!evento.matches) {
        definirMenu(false);
    } else if (botaoMenu.getAttribute("aria-expanded") === "false" && painelMenu.contains(document.activeElement)) {
        botaoMenu.focus();
    }
});

window.addEventListener("pageshow", (evento) => {
    if (evento.persisted) {
        definirMenu(false);
    }
});
cabecalho.classList.add("menu-pronto");
