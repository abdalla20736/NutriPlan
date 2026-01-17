function ToggleActiveButton(
  inputs,
  activeButtonClass,
  classesToRemove,
  classesToAdd = []
) {
  var currentActive = inputs.querySelector(activeButtonClass);

  if (currentActive) {
    currentActive.classList.remove(...classesToRemove);
    currentActive.classList.add(...classesToAdd);
  }
}

function RegisterMultiEvents(inputs, event, action) {
  for (const input of inputs) {
    input.addEventListener(event, (e) => action(e));
  }
}

export { ToggleActiveButton, RegisterMultiEvents };
