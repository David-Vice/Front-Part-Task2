let ul = document.getElementById('students');

async function GetStudents()
{
    let response = await fetch('https://localhost:44376/api/students');
    if(response.status == 200)
    {
        return response.json();
    }
    else
    {
        return null;
    }
}
async function FillList()
{
    ul.innerHTML = "";
    let students = await GetStudents();

    if(students != null)
    {
        students.forEach(student => {
            let li = document.createElement("li");
            li.innerText = "Id-" + student.id + ': ' + student.name + ' ' + student.lastName + ' | ' + student.bday + ' | ' + student.group;
            ul.appendChild(li);
        });
    }
}

async function GetStudent()
{
    let idStd = document.getElementById('index').value;
    let response = await fetch(`https://localhost:44376/api/students/${idStd}`);
    if(response.status == 200)
    {
        return response.json();
    }
    else
    {
        return null;
    }
}
async function FillStudent()
{
    ul.innerHTML = "";
    let student = await GetStudent();

    if(student != null)
    {
        let li = document.createElement("li");
        li.innerText = student.name + ' ' + student.lastName + ' | ' + student.bday + ' | ' + student.group;
        ul.appendChild(li);
    }
}

async function DeleteStudent()
{
    let idDel = document.getElementById('indexDelete').value;
    await fetch(`https://localhost:44376/api/students/${idDel}`,
    {
        method:"DELETE", 
        headers:{'Content-Type':'application/json'}
    })
    .then(response=> 
    {
        return response.text()
    })
    .then(data=>
    {
        document.getElementById('resultDelete').innerText = data;
    });
}

async function AddStudent(){
    let student = {
        name : document.getElementById('name').value,
        lastName : document.getElementById('lastName').value,
        bday : document.getElementById('bday').value,
        group : document.getElementById('group').value,
    };

    await fetch('https://localhost:44376/api/students',
    {
        method:"POST", 
        body:JSON.stringify(student), 
        headers:{'Content-Type':'application/json'}
    })
    .then(response=> 
    {
        return response.json()
    })
    .then(data=>
    {
        document.getElementById('result').innerText = "Added " + data;
    });
}

async function EditStudent(){
    let idStd = document.getElementById('indexEdit').value;
    let student = {
        name : document.getElementById('nameEdit').value,
        lastName : document.getElementById('lastNameEdit').value,
        bday : document.getElementById('bdayEdit').value,
        group : document.getElementById('groupEdit').value,
    };

    await fetch(`https://localhost:44376/api/students/${idStd}`,
    {
        method:"PUT", 
        body:JSON.stringify(student), 
        headers:{'Content-Type':'application/json'}
    })
    .then(response=> 
    {
        return response.text()
    })
    .then(data=>
    {
        document.getElementById('resultEdit').innerText = data;
    });
}