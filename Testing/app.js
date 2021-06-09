function editData(e) {
  const el = e.target;
  const input = document.createElement("input");
  input.setAttribute("value", el.textContent);
  input.setAttribute("size", "40em");
  el.replaceWith(input);

  const save = function() {
    const previous = document.createElement(el.tagName.toLowerCase());
    previous.onclick = editData;
    previous.textContent = input.value;
    input.replaceWith(previous);
  };

  /**
    We're defining the callback with `once`, because we know that
    the element will be gone just after that, and we don't want 
    any callbacks leftovers take memory. 
    Next time `p` turns into `input` this single callback 
    will be applied again.
  */
  input.addEventListener('blur', save, {
    once: true,
  });
  input.focus();
}

for (const child of document.querySelectorAll('[data-editable]')) {
  child.onclick = editData;
}