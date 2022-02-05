export default function dropdown(dropdownEl, btn = '.js-dropdown-btn', list = '.js-dropdown-list') {
  const dropdownBtn = dropdownEl.querySelector(btn);
  const dropdownList = dropdownEl.querySelector(list);
  dropdownList.style.display = 'none';
  dropdownBtn.addEventListener('click', () => {
    const state = dropdownList.style.display === 'none' ? null : 'none';
    dropdownList.style.display = state;
  });
}
