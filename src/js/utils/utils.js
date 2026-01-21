function RegisterMultiEvents(inputs, event, action) {
  for (const input of inputs) {
    input.addEventListener(event, (e) => action(e));
  }
}

export { RegisterMultiEvents };
