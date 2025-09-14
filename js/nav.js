// Lógica para o menu lateral deslizante (sidebar)

// Seleciona os elementos do DOM
const menuBtn = document.getElementById( 'menu-btn' )
const closeMenuBtn = document.getElementById( 'close-menu-btn' )
const sidebarMenu = document.getElementById( 'sidebar-menu' )
const menuOverlay = document.getElementById( 'menu-overlay' )

/**
 * Abre o menu lateral.
 */
function openMenu () {
    if ( sidebarMenu && menuOverlay ) {
        sidebarMenu.classList.add( 'open' )
        menuOverlay.classList.add( 'open' )
    }
}

/**
 * Fecha o menu lateral.
 */
function closeMenu () {
    if ( sidebarMenu && menuOverlay ) {
        sidebarMenu.classList.remove( 'open' )
        menuOverlay.classList.remove( 'open' )
    }
}

// Adiciona os "ouvintes" de eventos
if ( menuBtn ) {
    // Clicar no botão de hambúrguer abre o menu
    menuBtn.addEventListener( 'click', openMenu )
}

if ( closeMenuBtn ) {
    // Clicar no 'X' dentro do menu fecha o menu
    closeMenuBtn.addEventListener( 'click', closeMenu )
}

if ( menuOverlay ) {
    // Clicar fora do menu (no overlay) também fecha o menu
    menuOverlay.addEventListener( 'click', closeMenu )
}

