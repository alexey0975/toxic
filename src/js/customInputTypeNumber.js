import holdBtn from "./holdBtn";

export default function customInputTypeNumber(field, lessBtn, moreBtn) {
  let fieldValue = Number(field.value);
  function refreshValue() {
    fieldValue = Number(field.value);
    field.value = fieldValue;
    lessBtn.disabled = fieldValue === 0;
    moreBtn.disabled = fieldValue === 99;
    return fieldValue;
  }

  holdBtn.call(moreBtn, () => {
    // здесь 98 а не 99 потому что рефреш здесь не делается
    // счетчик дойдет до 98 если отпустить мышь, потом сработает событие click и станет 99
    // а если отвести мышь в сторону с зажатой кнопкой, то так и останется 98,
    // если делать рефреш то событие 'click' не сработет при достижении максимального результата
    // так как button станет disabled и это плохо повлияет на дальнейшую обработку дропдауна
    field.value = fieldValue + 1;
    fieldValue = Number(field.value);
  }, () => fieldValue === 98);

  holdBtn.call(lessBtn, () => {
    field.value = fieldValue - 1;
    fieldValue = Number(field.value);
  }, () => fieldValue === 1);

  lessBtn.addEventListener('click', () => {
    field.value = fieldValue - 1;
    refreshValue();
  });

  moreBtn.addEventListener('click', () => {
    field.value = fieldValue + 1;
    refreshValue();
  });

  field.addEventListener('keypress', (event) => {
    if (isNaN(event.key) || event.key === ' ') event.preventDefault();
    refreshValue();
  })

  field.addEventListener('input', () => {
    if (Number(field.value) > 99 || Number(field.value) < 0) field.value = fieldValue;
    refreshValue();
  })

  return {
    lessBtn,
    moreBtn,
    field,
  };
}
