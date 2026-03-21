let taskList = document.getElementById('task');
let addInput = document.querySelector('.add-input');
let addBtn = document.querySelector('.add-btn');

console.log(taskList)
addBtn.addEventListener("click", function () {
    if (addInput.value === '') {
        document.getElementById('warning').style.display = 'block';
    }
    else {

        let li = document.createElement('li');


        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'check';


        let p = document.createElement('p');
        p.className = 'typed-thing';
        p.innerHTML = addInput.value;


        let img = document.createElement('img');
        img.src = './Resource/cross.png';
        img.className = 'close';
        img.alt = 'close';


        li.appendChild(checkbox);
        li.appendChild(p);
        li.appendChild(img);

        taskList.appendChild(li);


        addInput.value = '';

        checkbox.addEventListener('change', function () {
            if (this.checked) {
                p.classList.add('checked'); 
            } else {
                p.classList.remove('checked'); h
            }
        });

    
        img.addEventListener('click', function () {
            li.remove();
        });

    }
})


