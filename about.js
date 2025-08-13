let button=document.querySelector('.toggle');
let body = document.querySelector('body');
button.addEventListener('click',function(){
    body.classList.toggle('dark-mode');
    index = body.classList.contains('dark-mode') ? 1 : 0;
    button.style.transform = index ? 'translateX(30px)' : 'translateX(0px)';
});