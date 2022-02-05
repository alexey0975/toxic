import dropdown from "./dropdown";
import customInputTypeNumber from "./customInputTypeNumber";

export default function comlexDropdownGuest(dropdownEl, { numericField, lessBtn, moreBtn }, inputField = '.js-dropdown-field', dropdownItemEl = '.js-dropdown-item') {
  dropdown(dropdownEl);
  const dropdownItems = dropdownEl.querySelectorAll(dropdownItemEl);
  const mainIntput = dropdownEl.querySelector(inputField);
  let guestCounts = [];
  const numInputs = Array.from(dropdownItems).map(item => {
    const less = item.querySelector(lessBtn);
    const more = item.querySelector(moreBtn);
    const field = item.querySelector(numericField);
    return customInputTypeNumber(field, less, more);
  });

  numInputs.map((input, index) => {
    [input.lessBtn, input.moreBtn].map(btn => {
      btn.addEventListener('click', () => {
        guestCounts[index] = Number(input.field.value);
        mainIntput.value = getHowManyGuests(guestCounts);
      });

      btn.addEventListener('mouseout', () => {
        guestCounts[index] = Number(input.field.value);
        mainIntput.value = getHowManyGuests(guestCounts);
      });
    });
    input.field.addEventListener('input', () => {
      guestCounts[index] = Number(input.field.value);
      mainIntput.value = getHowManyGuests(guestCounts);
    });
  });

  function getHowManyGuests(countsArr) {
    const count = countsArr.reduce((prev, current) => prev + current);
    const lastCountNum = Number(String(count).slice(-1));
    const lastCountDec = Number(String(count).slice(-2));

    const endWorld =
      lastCountDec > 10 && lastCountDec < 20 || lastCountNum > 4 || lastCountNum === 0 ? 'ей'
        : lastCountNum === 1 ? 'ь' : 'я';
    if (count === 0) return 'Сколько гостей'
    return `${count} гост${endWorld}`;
  }

  // осталось доделать кнопки 'очистить' и 'применить'
}
