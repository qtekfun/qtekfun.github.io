document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.highlighter-rouge').forEach(block => {
    const button = document.createElement('button');
    button.className = 'copy-code-button';
    button.textContent = 'Copy';
    block.appendChild(button);

    button.addEventListener('click', () => {
      const code = block.querySelector('code').innerText;
      navigator.clipboard.writeText(code).then(() => {
        button.textContent = 'Copied!';
        button.classList.add('copied');
        setTimeout(() => {
          button.textContent = 'Copy';
          button.classList.remove('copied');
        }, 2000);
      });
    });
  });
});
