viewapptemplate = `
<div id ="viewappdiv">
<h1 id ="viewappheader">All TRMS Decisions (BENCO)</h1>
<table id = "viewapptable">
    <tr>
        <th>Approval Id:</th>
        <th>Form Id:</th>
        <th>Date:</th>
        <th>Amount:</th>
        <th>Event Type:</th>
        <th>Supervisor Decision:</th>
        <th>BENCO Decision:</th>
    </tr>
</table>
<div id= "loadinggif"></div>
</div>

`


selectchoice.innerHTML = viewapptemplate;
getApps();






function getApps(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = parseApp;
    xhttp.open('GET', baseURL+"approvals/");
    xhttp.send();

    function parseApp(){
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            let apps = xhttp.responseText;
            apps = JSON.parse(apps);
            console.log(apps);
            apps.sort(compare);
            apps.forEach(app => {
                if (employee){
                    addAppToTable(app);
                }
            });
            document.getElementById('loadinggif').innerHTML = '';
        } else {
            document.getElementById("loadinggif").innerHTML = '<img src = "static/images/loading.gif">';
        }

    }
}
function addAppToTable(app) {
    let table = document.getElementById('viewapptable');
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    formDate = new Date(app.form.timeStamp);
    formDate = formDate.toDateString();
    // id
    addTableDef(tr, app.id);
    // form Id:
    addTableDef(tr, app.form.id);
    // date
    addTableDef(tr, formDate);
    // amount
    addTableDef(tr, app.form.price);
    // eventtype
    addTableDef(tr, app.form.eventType.name);
    // Supervisor Decision
    addTableDef(tr, app.supDec);
    // BENCO Decision:
    addTableDef(tr, app.benCoDec);
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