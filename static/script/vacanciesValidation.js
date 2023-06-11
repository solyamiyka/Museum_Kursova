const nameInput = document.getElementById('nameSurnameInput');
const nameRegex = /^([a-zA-Zа-яА-ЯІіЇїЄєҐґ]+\s?)*$/;
const butArr = document.querySelector('.buttonSend')
const underBut = document.querySelector('.underbuttontext')
const inputVac = document.querySelector('.inputVac')


butArr.addEventListener('click', function(){
  if(inputVac.value == ''){
    underBut.innerText = 'Будьласка заповніть поля!'
  }else{
    setTimeout(function(){
      underBut.innerText = 'Ваш запит успішно оброблено!'
    }, 1000)
  }
})

nameInput.addEventListener('input', () => {
  const name = nameInput.value.trim();
  if (name === '' || nameRegex.test(name)) {
    // Дані є валідними або рядок пустий
    nameInput.classList.remove('error');
    document.getElementById('notValidName').textContent = ""; // Очистити повідомлення про помилку
  } else {
    document.getElementById('notValidName').textContent = "Ви ввели неправильні дані! Спробуйте ще раз.";
    nameInput.classList.add('error');
  }
});


const emailInput = document.getElementById('emailInput');
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z-.]{2,6}$/;

emailInput.addEventListener('blur', () => {
  const email = emailInput.value.trim();
  if (email === '' || emailRegex.test(email)) {
    // Дані є валідними
    emailInput.classList.remove('error');
    document.getElementById('notValidEmail').textContent = ""; // Очистити повідомлення про помилку
  } else {
    document.getElementById('notValidEmail').textContent = "Ви ввели неправильні дані! Спробуйте ще раз.";
    emailInput.classList.add('error');
  }
});











// const nameInput = document.getElementById('nameSurnameInput');
// const nameRegex = /^[a-zA-Zа-яА-ЯІіЇїЄєҐґ]{2,}$`/;

// nameInput.addEventListener('input', () => {
//   const name = nameInput.value.trim();
//   if (nameRegex.test(name)) {
//     // Дані є валідними
//     nameInput.classList.remove('error');
//   } else {
//     document.getElementById('notValidName').innerHTML = "<span style='color:red;'>Ви ввели не правильні дані! Спробуйте ще раз!";
//     nameInput.classList.add('error');
//   }
// });


// const emailInput = document.getElementById('emailInput');
// const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

// nameInput.addEventListener('input', () => {
//   const name = emailInput.value.trim();
//   if (emailRegex.test(name)) {
//     // Дані є валідними
//     emailInput.classList.remove('error');
//   } else {
//     document.getElementById('notValidEmail').innerHTML = "<span style='color:red;'>Ви ввели не правильні дані! Спробуйте ще раз!";
//     emailInput.classList.add('error');
//   }
// });
