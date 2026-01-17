const header = document.getElementById("main-content");
export function SetHeaderInfo(title, desc) {
  header.querySelector("h1").textContent = title;
  header.querySelector("h1").nextElementSibling.textContent = desc;
}
