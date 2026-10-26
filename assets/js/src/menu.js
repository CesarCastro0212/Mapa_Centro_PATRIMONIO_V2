var menuAct = false;

function clearSubmenus() {
    document.getElementById("submenuBarrioHistoricoUniversitario").innerHTML = "";
    document.getElementById("submenuCorredorCarolino").innerHTML = "";
    document.getElementById("submenuCorredorJesuita").innerHTML = "";
    document.getElementById("submenuCorredorSanJose").innerHTML = "";
    document.getElementById("submenuCorredorAnalco").innerHTML = "";

    // Resetear flags de submenús
    submenuBarrioHistoricoUniversitario = false;
    submenuCorredorCarolino = false;
    submenuCorredorJesuita = false;
    submenuCorredorSanJose = false;
    submenuCorredorAnalco = false;
}

function closeMenuPanel() {
    document.getElementById("control-overlay").className = "menu-hidden";
    menuAct = false;
    clearSubmenus();
}

function menu_visibility() {
    console.log("muestrate");
    if (menuAct == false) {
        document.getElementById("control-overlay").className = "menu-visible";
        menuAct = true;
        console.log("visible");
    } else {
        closeMenuPanel();
        console.log("hidden");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("control-overlay");
    if (!menu) return;

    const stopMapGesture = (event) => {
        event.stopPropagation();
    };

    menu.addEventListener("touchstart", stopMapGesture, { passive: true });
    menu.addEventListener("touchmove", stopMapGesture, { passive: true });
    menu.addEventListener("touchend", stopMapGesture, { passive: true });
    menu.addEventListener("wheel", stopMapGesture, { passive: true });
});

/**
 * Cierra el menú al hacer clic/toque fuera del panel y fuera del ícono que lo abre.
 */
document.addEventListener("click", function(e) {
    if (!menuAct) return; // Menú ya cerrado, nada que hacer

    var overlay  = document.getElementById("control-overlay");
    var menuIcon = document.querySelector(".menu_icon");

    // Si el clic fue dentro del panel o sobre el ícono → no cerrar
    if (overlay.contains(e.target) || (menuIcon && menuIcon.contains(e.target))) return;

    closeMenuPanel();
}, false);
