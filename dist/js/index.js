const projectCards = document.querySelectorAll(
  '.project-card .learn-more-button'
);
for (const projectCard of projectCards) {
  projectCard.addEventListener('click', function () {
    const projectDetailsWindow = this.previousElementSibling;
    projectDetailsWindow.classList.remove('hidden');
  });
}

const projectDetailsCloseButtons = document.querySelectorAll(
  '.project-summary__close-icon'
);
for (const projectDetailsCloseButton of projectDetailsCloseButtons) {
  projectDetailsCloseButton.addEventListener('click', function () {
    this.parentElement.classList.add('hidden');
  });
}

document.addEventListener('keydown', function (key) {
  if (key.code === 'Escape') {
    const projectSummary = document.querySelectorAll('.project-summary');
    projectSummary.forEach(function (summary) {
      if (!summary.classList.contains('hidden')) {
        summary.classList.add('hidden');
      }
    });
  }
});
