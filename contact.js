let button=document.querySelector('.toggle');
let body = document.querySelector('body');

// Initialize theme from sessionStorage
const savedTheme = sessionStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  if (button) button.style.transform = 'translateX(30px)';
} else {
  if (button) button.style.transform = 'translateX(0px)';
}

// Toggle dark mode and persist
button.addEventListener('click',function(){
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    sessionStorage.setItem('theme', isDark ? 'dark' : 'light');
    button.style.transform = isDark ? 'translateX(30px)' : 'translateX(0px)';
});