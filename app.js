'use strict';
const form = document.querySelector('#report');
const issue = form.elements.issue;
const entry = document.querySelector('#entry');
const receipt = document.querySelector('#receipt');
const count = document.querySelector('#count');

function updateDescription() {
  count.textContent = issue.value.length + ' / 1,000';
  issue.setCustomValidity(issue.value && !issue.value.trim()
    ? 'Describe the issue using more than spaces.' : '');
}
issue.addEventListener('input', updateDescription);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  updateDescription();
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  for (const field of ['issue', 'category', 'urgency']) {
    document.querySelector('#summary-' + field).textContent = values.get(field).trim();
  }
  entry.hidden = true;
  receipt.hidden = false;
  document.querySelector('#done').focus();
});

document.querySelector('#restart').addEventListener('click', () => {
  form.reset();
  updateDescription();
  receipt.querySelectorAll('dd').forEach(item => { item.textContent = ''; });
  receipt.hidden = true;
  entry.hidden = false;
  issue.focus();
});
