approvaltemplate = `
<div id ="viewappdiv">
<h1 id ="viewappheader">Accept/Reject Requests: All Departments (BENCO)</h1>
<table id = "viewapptable">
    <tr>
        <th>Approval Id:</th>
        <th>Date:</th>
        <th>Amount:</th>
        <th>Event Type:</th>
        <th>Supervisor Decision:</th>
        <th>BENCO Decision:</th>
        <th>Approve</th>
        <th>Decline</th>
    </tr>
</table>
<div id= "loadinggif"></div>
</div>
`


selectchoice.innerHTML = approvaltemplate;
getApps();






function getApps(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = parseApp;
    xhttp.open('GET', baseURL+"approvals/");
    xhttp.send();

    function parseApp(){
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            allApps = xhttp.responseText;
            allApps = JSON.parse(allApps);
            allApps.sort(compare);
            console.log(allApps);
            allApps.forEach(app => {
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
    //Approve
    td = document.createElement('td');
    let appButton = document.createElement('button');
    tr.appendChild(td);
    td.appendChild(appButton);
    appButton.innerHTML = 'Approve';
    appButton.className='btn btn-secondary emp-btn';
    appButton.onclick = approveForm;
    appButton.id = 'approve'+app.id;
    appButton.name = app.form.id;

    //Decline
    td = document.createElement('td');
    let rejButton = document.createElement('button');
    tr.appendChild(td);
    td.appendChild(rejButton);
    rejButton.innerHTML = 'Reject';
    rejButton.className='btn btn-danger emp-btn';
    rejButton.onclick = rejectForm;
    rejButton.id = 'reject'+app.id;
    rejButton.name = app.form.id;

    table.appendChild(tr);
}

function approveForm() {
	let btn = event.target;
	let id = btn.id.substring('approve'.length);
    buttonAppApp = {};
    allApps.forEach(app =>{
        if (app.id == id) {buttonAppApp = app};
    });
    if (employee.access == 'SUPERVISOR' && employee.title == 'BENCO'){
        buttonAppApp.supDec = 'APPROVED';
        buttonAppApp.benCoDec = 'APPROVED';
    } else if (employee.access == 'SUPERVISOR'){
        buttonAppApp.supDec = 'APPROVED';
    } else if (employee.title == 'BENCO'){
        buttonAppApp.benCoDec = 'APPROVED';
    }
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = updateAppDisplay;
	xhttp.open('POST', baseURL+'approvals/'+id);
    xhttp.send(JSON.stringify(buttonAppApp));
    console.log(JSON.stringify(buttonAppApp));
	
	function updateAppDisplay(){
		if(xhttp.readyState === 4 && xhttp.status === 200) {
			location.reload();
		}
	}
}

function rejectForm() {
	let btn = event.target;
	let id = btn.id.substring('reject'.length);
    buttonAppRej = {};
    allApps.forEach(app =>{
        if (app.id == id) {buttonAppRej = app};
    });
    if (employee.access == 'SUPERVISOR' && employee.title == 'BENCO'){
        buttonAppRej.supDec = 'REJECTED';
        buttonAppRej.benCoDec = 'REJECTED';
    } else if (employee.access == 'SUPERVISOR'){
        buttonAppRej.supDec = 'REJECTED';
    } else if (employee.title == 'BENCO'){
        buttonAppRej.benCoDec = 'REJECTED';
    }
    
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = updateAppDisplay;
	xhttp.open('POST', baseURL+'approvals/'+id);
    xhttp.send(JSON.stringify(buttonAppRej));
    console.log(buttonAppRej);
	
	function updateAppDisplay(){
		if(xhttp.readyState === 4 && xhttp.status === 200) {
			location.reload();
		}
	}
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