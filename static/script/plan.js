const nameInput = document.getElementById('nameSurnameInput');
const nameRegex = /^([a-zA-Zа-яА-ЯІіЇїЄєҐґ]+\s?)*$/;
const notValidName = document.createElement('span');
notValidName.id = 'notValidName';

nameInput.addEventListener('input', () => {
  const name = nameInput.value.trim();
  if (name === '' || nameRegex.test(name)) {
    // Дані є валідними або рядок пустий
    nameInput.classList.remove('error');
    const notValidName = document.getElementById('notValidName');
    if (notValidName) {
      notValidName.remove(); // Видалити елемент, якщо він існує
    }
  } else {
    notValidName.textContent = "Ви ввели неправильні дані! Спробуйте ще раз.";
    notValidName.classList.add('error');
    nameInput.insertAdjacentElement('afterend', notValidName); // Вставити елемент після інпута
    nameInput.classList.add('error');
  }
});

const numberInput = document.getElementById('numberInput');
const numRegex = /^\+?(\d{1,3})?\s?(\d{3})?\s?\d{3}\s?\d{2}\s?\d{2}$/;
const notValidNum = document.createElement('span');
notValidNum.id = 'notValidNum';

numberInput.addEventListener('blur', () => {
  const number = numberInput.value.trim();
  if (number === '' || numRegex.test(number)) {
    // Дані є валідними або рядок пустий
    numberInput.classList.remove('error');
    const notValidNum = document.getElementById('notValidNum');
    if (notValidNum) {
        notValidNum.remove(); // Видалити елемент, якщо він існує
    }
  } else {
    notValidNum.textContent = "Ви ввели неправильні дані! Спробуйте ще раз.";
    notValidNum.classList.add('error');
    numberInput.insertAdjacentElement('afterend', notValidNum); // Вставити елемент після інпута
    numberInput.classList.add('error');
  }
});

const dateInput = document.getElementById('dateInput');
const notValidDate = document.createElement('span');
notValidDate.id = 'notValidDate';

dateInput.addEventListener('input', () => {
  const selectedDate = new Date(dateInput.value);
  const currentDate = new Date();

  currentDate.setHours(0, 0, 0, 999);

  if (selectedDate < currentDate) {
    notValidDate.textContent = "Ви вибрали неправильні дані, тобто минулі дні! Спробуйте ще раз.";
    notValidDate.classList.add('error');
    dateInput.insertAdjacentElement('afterend', notValidDate); // Вставити елемент після інпута
    dateInput.classList.add('error');
  } else{
    dateInput.classList.remove('error');
    const notValidDate = document.getElementById('notValidDate');
    if (notValidDate) {
        notValidDate.remove(); // Видалити елемент, якщо він існує
    }
  }
});


const cardNum = document.getElementById('input_cartinfo');
const cardRegex = /^[0-9]{4}(?:\s?[0-9]{4}){3}$/;

cardNum.addEventListener('blur', () => {
  const number = cardNum.value.trim();
  if (number === '' || cardRegex.test(number)) {
    // Дані є валідними або рядок пустий
    cardNum.style.color = '#232323';
  } else {
    cardNum.style.color = '#fd0502';
  }
});

const CVV = document.getElementById('input_cart_cvv');
const cvvRegex = /^[0-9]{3,4}$/;

CVV.addEventListener('blur', () => {
    const cvvNum = CVV.value.trim();
    if (cvvNum === '' || cvvRegex.test(cvvNum)) {
        // Дані є валідними або рядок пустий
        CVV.style.color = '#232323';
      } else {
        CVV.style.color = '#fd0502';
      }
})

const date = document.getElementById('input_cart_time');
date.addEventListener('input', () => {
    const selectedDate = new Date(date.value);
    const currentDate = new Date();
  
    // Встановлюємо час 23:59:59 для поточної дати, щоб отримати останню мілісекунду дня
    currentDate.setHours(23, 59, 59, 999);
  
    if (selectedDate < currentDate) {
      date.style.color = '#fd0502';
      console.log(selectedDate)
      console.log(currentDate)
    } else{
      date.style.color = '#232323';
    }
});


////////MODAL WINDOW//////////
const popupButton = document.getElementById('popupButton');
const modal = document.getElementById('modal');
const closeModal = document.getElementsByClassName('close')[0];
const formValuesContainer = document.getElementById('formValues');
const notFilledData = document.createElement('p');
notFilledData.id = 'notFilledData';
const mainForm = document.getElementById('mainForm');

popupButton.addEventListener('click', () => {
  
  let inputs = document.querySelectorAll('input, select');

  let allFilled = true;
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') {
      allFilled = false;
      break;
    }
  }
  
  if (allFilled) {
    const nameSurname = document.getElementById('nameSurnameInput').value;
    const visitDate = document.getElementById('dateInput').value;
    const selectedTariff = document.querySelector('.input_pryce option:checked').text;
  
    // Відображення даних в модальному вікні
    formValuesContainer.innerHTML = `
      <p class="infoForticket"><strong>Ім'я та прізвище:</strong> ${nameSurname}</p>
      <p class="infoForticket"><strong>Дата відвідування:</strong> ${visitDate}</p>
      <p class="infoForticket"><strong>Вибраний тариф:</strong> ${selectedTariff}</p>
    `;
    if(notFilledData){
      notFilledData.remove();
      notFilledData.classList.remove('error');
    }
    
    // Відкриття модального вікна
    modal.style.display = 'block';
  } else {
    notFilledData.textContent = "Ви не ввели всі дані! Спробуйте ще раз.";
    notFilledData.classList.add('error');
    mainForm.insertAdjacentElement('afterend', notFilledData); 
    // console.log('Будь ласка, заповніть всі поля.');
  }

});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});


const ticketButton = document.getElementById('ticket_button');
const modalContent = document.querySelector('.modal-content');

ticketButton.addEventListener('click', () => {
  html2canvas(modalContent)
    .then(function(canvas) {
      // Створення посилання для завантаження
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'modal_content.png';

      // Клік по посиланню для завантаження
      link.click();
    });
});

