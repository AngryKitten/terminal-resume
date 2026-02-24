let inputRef;
let outputRef;
let inputRaw = '';
let matchKeys = /^[a-zA-Z0-9./\:]$/;

(function () {
  inputRef = document.getElementById('terminal-input-insert');
  outputRef = document.getElementById('terminal-output');
  document.addEventListener('keydown', event => {
    event.preventDefault();
    if (event.key === 'Enter') {
      processInput();
    } else if (event.key === 'Backspace') {
      inputRaw = inputRaw.substring(0, inputRaw.length - 1);
      inputRef.innerHTML = inputRaw.replaceAll(' ', '&nbsp;');
    } if (event.key === ' ') {
      // Have to use HTML character entity '&nbsp;' so cursor actually moves with spaces.
      // & non-breaking space ;
      inputRaw = `${inputRaw} `;
      inputRef.innerHTML = inputRaw.replaceAll(' ', '&nbsp;');
    } else if (matchKeys.test(event.key)) {
      inputRaw = `${inputRaw}${event.key}`;
      inputRef.innerHTML = inputRaw.replaceAll(' ', '&nbsp;');
    }
  });
})();

function processInput() {
  if (outputRef.innerHTML === '') {
    outputRef.innerHTML = `>${inputRaw}`;
  } else {
    outputRef.innerHTML = `${outputRef.innerHTML}<br>>${inputRaw}`;
  }
  inputRaw = inputRaw.trim();
  if (inputRaw === 'clear') {
    inputRaw = '';
    inputRef.innerHTML = '';
    outputRef.innerHTML = '';
  } else if (outputStrings[inputRaw]) {
    outputRef.innerHTML = `${outputRef.innerHTML}<br>${outputStrings[inputRaw]}`;
  } else if (inputRaw.includes('go to')) {
    // Can add checks for malformed url but I don't feel like it.
    const tempLink = document.createElement('a');
    tempLink.href = inputRaw.replaceAll(' ', '').replaceAll('goto', '');
    tempLink.setAttribute('target', '_blank');
    tempLink.click();
  } else {
    outputRef.innerHTML = `${outputRef.innerHTML}<br>'${inputRaw}' is not a recognized command, please type 'help' for options.`;
  }
  inputRaw = '';
  inputRef.innerHTML = '';
}

// Need to be raw HTML.
let outputStrings = {
  'help': `
    'clear': Clears the console output.<br>
    'go to': Opens typed URL (e.g. https://www.google.com) in a new tab.<br>
    'resume': Shows {user}'s current resume.
  `,
  'resume': `
    Caleb Crawford (Slab)<br><br>
    Work Experience: none<br>
    Schooling: none<br>
    Smart: no
  `,
};