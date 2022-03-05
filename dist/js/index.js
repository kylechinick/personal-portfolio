const projectButtons = [
  ...document.querySelectorAll('.project-card .learn-more-button')
];

for (button of projectButtons) {
  button.addEventListener('click', function () {
    const projectDetailsCard = this.previousElementSibling;
    projectDetailsCard.classList.remove('hidden');
    const closeProjectDetailsCardButton = projectDetailsCard.firstElementChild;
    closeProjectDetailsCardButton.addEventListener('click', function () {
      projectDetailsCard.classList.add('hidden');
    });
    document.addEventListener('keydown', function (key) {
      if (key.code === 'Escape') {
        projectDetailsCard.classList.add('hidden');
      } else {
        return;
      }
    });
  });
}
