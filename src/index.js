import 'normalize-scss/sass/normalize/_import-now.scss'
import './styles/styles.scss'

import dropdown from './js/dropdown';
import customInputTypeNumber from './js/customInputTypeNumber';
import comlexDropdownGuest from './js/comlexDropdownGuest';

const dropdowns = document.querySelectorAll('.js-dropdown');

const numericInput = {
  numericField: '.js-num-field',
  lessBtn: '.js-less-btn',
  moreBtn: '.js-more-btn',
}

Array.from(dropdowns).map(dropdownEl => {
  comlexDropdownGuest(dropdownEl, numericInput);
});
