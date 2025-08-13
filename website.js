let button=document.querySelector('.toggle');
let nav=document.querySelector('.navbar');
let toggleframe=document.querySelector('.toggleframe');
let navtext=document.querySelectorAll('.nav li a');
let navlogo=document.querySelector('.logo');
let body=document.querySelector('body');
let box=document.querySelectorAll('.box');
let circle=document.querySelectorAll('.circle');
let h2=document.querySelectorAll('h2');
let cont=document.querySelector('.container');
let add=document.querySelector('.add');
let index=0; //0 for light and 1 for dark
const arrow = document.querySelector('.arrow');
let checkboxs=document.querySelectorAll('task');
let tasks=document.querySelector('.tasks');
let flag = false;
let groupnum = 1;
//animations
// Function to animate the button
function animateButton(addbutton, donebutton) {
  addbutton.animate([
    {transform: 'translateX(120px)'},
    {transform: 'translateX(0px)'},
  ], {
    duration: 300,
    fill: 'forwards'
  }
  );
  setTimeout(() => {
  donebutton.style.opacity = '1';
  donebutton.style.zIndex = '0';
  }, 300);

}
function animateedit(items) {
  items.forEach(item => {
  item.style.display = item.style.display === 'flex' ? 'none' : 'flex';
  if (item.style.display === 'flex') {
    item.animate({
      opacity: [0, 1],
      transform: ['scale(0.2)', 'scale(5)']
    }, {
      duration: 300,
      fill: 'forwards'
    });
    }
     if (item.style.display === 'none') {
      item.style.display = 'flex';
     const anim = item.animate({
      opacity: [1, 0],
      transform: ['scale(5)', 'scale(0.2)']
    }, {
      duration: 300,
      fill: 'forwards'
    });
anim.onfinish = () => {
      item.style.display = 'none';
    };
    }
    });
  }

// Function to create confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        document.body.appendChild(confetti);

        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 3000 + Math.random() * 2000,
            easing: 'ease-in'
        });

        animation.onfinish = () => confetti.remove();
    }
}
  // Animate the arrow
arrow.animate([
    {left: '0'},
    {left: '30px'},
    {left: '0'}
  ],{
    duration: 1500,
    iterations: Infinity
  });
  // Toggle dark mode
button.addEventListener('click',function(){
    body.classList.toggle('dark-mode');
    index = body.classList.contains('dark-mode') ? 1 : 0;
    button.style.transform = index ? 'translateX(30px)' : 'translateX(0px)';
});
//end of animations

// update the percentage of tasks completed
function updatepercent(taskid){
  let checkbox = document.querySelectorAll(`.task[group="${taskid}"]`);
  let circle = document.querySelector(`.circle-${taskid}`);
  let percent = document.querySelectorAll(`.ptext-${taskid}`);
  let total = checkbox.length;
  let checked = Array.from(checkbox).filter(checkbox => checkbox.checked).length;
  let percentage = total === 0 ? 0 : Math.floor((checked / total) * 100);
  if(circle) circle.style.background = `conic-gradient(#4caf50 0% ${percentage}%, #e0e0e0 ${percentage}% 100%)`;
  percent.forEach(percent => percent.textContent = percentage + '%');
  // If all tasks are completed, show confetti
  if (percentage === 100) {
    createConfetti();
    }
  }
// Add a new task box
function addbox(group){
  let tasks = document.querySelector('.tasks');
  let html= '';
  html += `<div class="box" group="${group[1]}">`;
  html += `<h2>${group[0]}</h2>`;
  html += `<button class="editgroup" group="${group[1]}">`;
  html += `<i class='far fa-edit'></i>`;
  html += `</button>`;
  html += `<button class="edit" group="${group[1]}">`;
  html += `<i class='far fa-trash-alt'></i>`;
  html += `</button>`;
  html += `<button class="edit" group="${group[1]}">`;
  html += `<i class='fas fa-plus'></i>`;
  html += `</button>`;
  html += `<div class="circle circle-${group[1]}">`;
  html += `<div class="percent ptext-${group[1]}">0%</div> </div>`;
  html += `<ul>`;
  for (let i = 2; i < group.length; i++) {
    if(group[i]) {
      html += `<li group="${group[1]}" task="${i}">`;
      html += `<div class="checkbox-wrapper-11">`;
      html +=`<input id="task-${i}-${group[1]}" type="checkbox" class="task" group="${group[1]}" task="${i}">`;
      html += `<label for="task-${i}-${group[1]}">${group[i]}</label>`;
      html += `<button class="edit" group="${group[1]}" task="${i}"><i class="far fa-edit"></i></button>`;
      html += `<button class="edit" group="${group[1]}" task="${i}"><i class="far fa-trash-alt"></i></button>`;
      html += `<input type="text" class="edit-input" placeholder="Edit task" group="${group[1]}" task="${i}">`;
      html += `</div>`;
      html += `</li>`;
    }
  }
  html += `<li>`;
  html += `<input type="text" class="edit-input" placeholder="add task" group="${group[1]}" add="true" style="width: 100%;">`;
  html += `</li>`;
  html += `</ul> </div>`;
  tasks.innerHTML += html;
  const bo = tasks.lastElementChild;
    bo.style.opacity = '0';
    bo.style.scale = '0.6';
    setTimeout(() => {
      bo.style.transition = 'all 0.3s';
      bo.style.scale = '1';
      bo.style.opacity = '1';
    }, 300);
    
  document.querySelectorAll('.task').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      updatepercent(this.getAttribute('group'));
    });
  });

  // Add event listeners to edit buttons
  reloadbtns(bo);
  document.querySelectorAll('.editgroup').forEach(edit => {
    edit.addEventListener('click', function() {
      const group = this.getAttribute('group');
      const taskItems = document.querySelectorAll(`.edit[group="${group}"]`);
      animateedit(taskItems);
    });
  });
  let frame = document.querySelector('.addframe');
  frame.innerHTML = '';
  group = [group[0], group[1]]; // reset group
groupnum++;
}
// Add a new task info
function addtask(tasklabelval){
  let frame = document.querySelector('.addframe');
  frame.innerHTML= '';
  frame.innerHTML += `<input type="text" placeholder="Enter your Task Names till you're done" id="taskname" required>`;
  frame.innerHTML += `<button id="addtaskbtn">Add</button>`;
  frame.innerHTML += `<button id="donebtn">done</button>`;
  const addbutton = document.querySelector('#addtaskbtn');
  const donebutton = document.querySelector('#donebtn');
  const taskname = document.querySelector('#taskname');
  // Apply  shake animation to input and buttons
  animateButton( addbutton, donebutton);

  // take tasklabelval and groupnum as parameters
  let group = [tasklabelval,groupnum]; 
  addbutton.addEventListener('click', function() {
    const tasknameval = taskname.value.trim();
    if (tasknameval) {
      group.push(tasknameval);
      taskname.value = '';
    }
  });
  donebutton.addEventListener('click', function() {
    addbox(group);
  });

}
// Function to display task input form
function taskinfo(){
  let frame = document.querySelector('.addframe');
  frame.innerHTML = '';
  frame.innerHTML +=`<input type="text" placeholder="Enter your Tasks label" id="tasklabel" required>`;
  frame.innerHTML += `<button id="addlabelbtn">Add</button>`;
  input= document.querySelector('#tasklabel');
  btn= document.querySelector('#addlabelbtn');
  // Apply animation to input and button
  input.style.opacity = '0';
  btn.style.opacity = '0';
  input.style.scale = '0.6';
  btn.style.scale = '0.6';
  setTimeout(() => {
    input.style.transition = 'all 0.3s';
    btn.style.transition = 'all 0.3s';
    input.style.scale = '1';
    btn.style.scale = '1';
    input.style.opacity = '1';
    btn.style.opacity = '1';
  }, 300);
  // Add event listener to the add button
  const addbutton = document.querySelector('#addlabelbtn');
  addbutton.addEventListener('click', function() {
  const taskname = document.querySelector('#tasklabel');
  const tasknameval = taskname.value.trim();
  if (tasknameval) {
    addtask(tasknameval);}
  });

}
// Add event listeners to checkboxes and update percentage
document.querySelectorAll('.task').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    updatepercent(this.getAttribute('group'));
  })
});

//cleans the place holders
add.addEventListener('click',function(){
  if(!flag)  {
  box= document.querySelectorAll('.box');
  box.forEach(bo => {
    bo.style.transition = 'transform 0.3s, opacity 0.5s, background-color 0.3s';
    bo.style.transform = 'scale3d(1.5 , 0.0001 ,0.2)';
    bo.style.backgroundColor = 'white';
    bo.style.opacity = '0.2';
  });
  setTimeout(() => {
    box.forEach(bo => {
        tasks.innerHTML = '';
    });
  }, 400);

  flag = true;}
  taskinfo();
  
});

//edit the task
function edittask( groupid,taskid) {
  const taskItems = document.querySelectorAll(`.edit[group="${groupid}"]`);
  const editInputs = document.querySelector(`.edit-input[group="${groupid}"][task="${taskid}"]`);
  const item = document.querySelector(`li[group="${groupid}"][task="${taskid}"]`);
  const label = item.querySelector('label');
  animateedit(taskItems);
  editInputs.style.display = 'block';
  editInputs.focus();
  editInputs.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      const newValue = editInputs.value.trim();
      if (newValue) {
        label.textContent = newValue;
        editInputs.style.display = 'none';
        updatepercent(groupid);
      } else {
        item.remove();
        updatepercent(groupid);
      }
    }
  });
}
//delete the task
function deletetask(groupid,taskid) {
  const item = document.querySelector(`li[group="${groupid}"][task="${taskid}"]`);
    item.remove();
  updatepercent(groupid);
}
//delete group
function deletegroup(groupid) {
  const groupBox = document.querySelector(`.box[group="${groupid}"]`);
  if (groupBox) {
    groupBox.remove();
  }
}

function addsingletask(groupid) {
  const taskItems = document.querySelectorAll(`.edit[group="${groupid}"]`);
  animateedit(taskItems);
  const newTaskInput = document.querySelector(`.edit-input[group="${groupid}"][add="true"]`);
  newTaskInput.style.display = 'block';
  newTaskInput.focus();
  newTaskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      const newTaskValue = newTaskInput.value.trim();
      if (newTaskValue) {
        const taskList = document.querySelector(`.box[group="${groupid}"] ul`);
        const newTaskItem = document.createElement('li');
        const taskid= taskList.children.length + 2;
        newTaskItem.setAttribute('group', groupid);
        newTaskItem.setAttribute('task', taskid);
        console.log(newTaskItem);
        let html = '';
        html += `<div class="checkbox-wrapper-11">`;
        html +=`<input id="task-${groupid}-${taskid}" type="checkbox" class="task" group="${groupid}" task="${taskid}">`;
        html += `<label for="task-${groupid}-${taskid}">${newTaskValue}</label>`;
        html += `<button class="edit"  group="${groupid}" task="${taskid}"><i class="far fa-edit"></i></button>`;
        html += `<button class="edit"  group="${groupid}" task="${taskid}"><i class="far fa-trash-alt"></i></button>`;
        html += `<input type="text" class="edit-input" placeholder="Edit task" group="${groupid}" task="${taskid}">`;
        html += `</div>`;
        newTaskItem.innerHTML = html;
        taskList.insertBefore( newTaskItem, newTaskInput.parentElement);
        updatepercent(groupid);
        newTaskInput.value = '';
        newTaskInput.style.display = 'none';
        newTaskInput.removeEventListener('keydown', arguments.callee);
        // Add event listener to the new task checkbox
        const newCheckbox = document.querySelector(`#task-${groupid}-${taskid}`);
        newCheckbox.addEventListener('change', function() {
          updatepercent(groupid);
        });
        // Reload the edit buttons for the new task
        reloadbtns(document.querySelector(`.box[group="${groupid}"]`));
      }
    }
  });
}
// edit button to enable editing of task names
document.querySelectorAll('.editgroup').forEach(edit => {
  edit.addEventListener('click', function() {
    const group = this.getAttribute('group');
    const taskItems = document.querySelectorAll(`.edit[group="${group}"]`);
      animateedit(taskItems);
  });
});

// Add event listeners to edit buttons
document.querySelectorAll('.edit').forEach(edit => {
  edit.addEventListener('click', function() {
    const groupid = this.getAttribute('group');
    const taskid = this.getAttribute('task');
    if (this.classList.contains('edit')) {
      if (this.querySelector('i').classList.contains('fa-edit')) {
      edittask(groupid,taskid);}
      else if (this.querySelector('i').classList.contains('fa-trash-alt')) {
        if (!taskid){
          deletegroup(groupid);
        }
        else{
        deletetask( groupid,taskid);
        }
      }
      else if (this.querySelector('i').classList.contains('fa-plus')) {
        addsingletask(groupid);
      }
    }
  });
});
function reloadbtns(groupbox) {
  groupbox.querySelectorAll('.edit').forEach(edit => {
    edit.addEventListener('click', function() {
      const groupid = this.getAttribute('group');
      const taskid = this.getAttribute('task');
      if (this.classList.contains('edit')) {
        if (this.querySelector('i').classList.contains('fa-edit')) {
          edittask(groupid, taskid);
        } else if (this.querySelector('i').classList.contains('fa-trash-alt')) {
          if (!taskid) {
            deletegroup(groupid);
          } else {
            deletetask(groupid, taskid);
          }
        } else if (this.querySelector('i').classList.contains('fa-plus')) {
          addsingletask(groupid);
        }
      }
    });
  });

}