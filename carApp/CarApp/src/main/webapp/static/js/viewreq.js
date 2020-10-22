viewreqtemplate = `
<div id ="viewreqdiv">
<h1 id ="viewreqheader">Your TRMS Requests</h1>
<table id = "viewreqtable">
    <tr>
        <th>Form Id:</th>
        <th>Date:</th>
        <th>Location:</th>
        <th>Amount:</th>
        <th>Grading Format:</th>
        <th>Grade:</th>
        <th>Event Type:</th>
        <th>Upload URL:</th>
    </tr>
</table>
<div id = "loadinggif"></div>
</div>

`


selectchoice.innerHTML = viewreqtemplate;
getForms();






function getForms(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = parseBook;
    xhttp.open('GET', baseURL+"forms/");
    xhttp.send();

    function parseBook(){
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            let forms = xhttp.responseText;
            forms = JSON.parse(forms);
            console.log(forms);
            forms.sort(compare);
            forms.forEach(form => {
                if (form.emp.id == employee.id){
                    addFormToTable(form);
                }
            });
            document.getElementById('loadinggif').innerHTML = '';
        } else {
            document.getElementById("loadinggif").innerHTML = '<img src = "static/images/loading.gif">';
        }
    }
}
function addFormToTable(form) {
    let table = document.getElementById('viewreqtable');
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    formDate = new Date(form.timeStamp);
    formDate = formDate.toDateString();
    console.log(formDate);
    // id
    addTableDef(tr, form.id);
    // date
    addTableDef(tr, formDate);
    // location
    addTableDef(tr, form.location.name);
    // amount
    addTableDef(tr, form.price);
    // gradeformat
    addTableDef(tr, form.gradeFormat.name);
    // grade
    addTableDef(tr, form.grade.grade.toUpperCase());
    // eventtypes
    addTableDef(tr, form.eventType.name);
    // url
    addTableDef(tr, form.uploadUrl);
    table.appendChild(tr);
}
    function addTableDef(row, value) {
        let td = document.createElement('td');
        td.innerHTML = value;
        row.appendChild(td);
    }

    function compare(a, b) {
        if (a.id > b.id) return 1;
        if (b.id > a.id) return -1;
      
        return 0;
      }