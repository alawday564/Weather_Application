let isMenuOpen = false;

function toggleDropdown() {
  let dropdown = document.getElementById("myDropdown");
  dropdown.classList.toggle("show_dropdown");

  let dropdownIcon = document.getElementsByClassName("expand-icon")[0];
  dropdownIcon.textContent = isMenuOpen ? "expand_more" : "keyboard_arrow_up";
  isMenuOpen = !isMenuOpen;
}

window.onclick = function (event) {
  if (!event.target.matches(".dropdown_name , .dropdown_img")) {
    let dropdowns = document.getElementsByClassName("dropdown_content");
    let dropdownIcon = document.getElementsByClassName("expand-icon")[0];

    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show_dropdown")) {
        openDropdown.classList.remove("show_dropdown");
        dropdownIcon.textContent = "expand_more";
        isMenuOpen = false;
      }
    }
  }
};