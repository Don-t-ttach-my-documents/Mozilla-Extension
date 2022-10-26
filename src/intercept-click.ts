reload_event();

document.onclick = reload_event;

function reload_event() {
    const findBtn = document.getElementsByClassName("zimbra-client_menu-item_inner");
    for (const btn of findBtn) {
        if (btn.innerHTML == "Joindre à partir d'un mobile") {
            btn.addEventListener('click', (a) => {
                console.log("Okok");
            })
        }
    }
}