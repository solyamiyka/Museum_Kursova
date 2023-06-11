const burger = document.querySelector('.burger')
const headermenu = document.querySelector('.header_menu')
const lenguage = document.querySelector('.lenguage_block')
burger.addEventListener('click', function(){
    burger.classList.toggle('active_burger')
    headermenu.classList.toggle('active_burger')
    lenguage.classList.toggle('active_burger')
})
