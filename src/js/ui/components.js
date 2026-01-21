const appLoadingOverlay = document.getElementById("app-loading-overlay");

export function ToggleAppLoading(isLoading) {
  appLoadingOverlay.style.transition = "opacity 0.5s ease-out";

  if (isLoading) {
    appLoadingOverlay.classList.remove("hidden");
    requestAnimationFrame(() => {
      appLoadingOverlay.style.opacity = "1";
    });
  } else {
    appLoadingOverlay.style.opacity = "0";

    appLoadingOverlay.addEventListener(
      "transitionend",
      () => {
        appLoadingOverlay.classList.add("hidden");
      },
      { once: true },
    );
  }
}

export function ShowOnDeletedToast(msg) {
  let toast = document.createElement("div");
  toast.innerHTML = `<div class="fixed bottom-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 toast-notification">${msg}</div>`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 5000);
}

export function ShowOnErrorToast(message) {
  const errorToast = document.createElement("div");
  errorToast.className =
    "fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 toast-notification";
  errorToast.innerHTML = message;
  document.body.appendChild(errorToast);
  setTimeout(() => {
    errorToast.remove();
  }, 2000);
}

export function ShowOnSuccessToast(msg) {
  const successToast = document.createElement("div");
  successToast.className =
    "fixed bottom-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 toast-notification";
  successToast.innerHTML = `
        ${msg}
    `;

  document.body.appendChild(successToast);
  setTimeout(() => {
    successToast.remove();
  }, 2000);
}
