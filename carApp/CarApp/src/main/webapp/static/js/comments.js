commenttemplate = `
<div id ="viewcommdiv">
<h1 id ="viewcommheader">Your Comments</h1>
<table id = "viewcommtable">
    <tr>
        <th>Comment Id:</th>
        <th>Request Id:</th>
        <th>Sender:</th>
        <th>Receiver:</th>
        <th>Message:</th>

    </tr>
</table>
<div id = "loadinggif"></div>
</div>

<div id ="commentdiv">
<form id = "formcomment">
  <fieldset id="commentwrap">
    <legend>Comment:</legend>
  <p>You will provide the following: (1000 characters or less)</p>
  <ul id = "commentlist">
      <li>A short description of the event.</li>
      <li>Justisfication of the reimbursement.</li>
      <li>Any additional information pertinent to the request.</li>
      <li>A humble gesture of appreciation for BENCO.</li>
      
  </ul>
  <label for="formid">Request ID #:</label>
  <input type = "text" id = "formid"><br>
  <label for="receiverswitch">Receiver:</label>
  <select id="receiverswitch">
  <option value="sup">Supervisor</option>
  <option value="benco">BENCO</option>
  </select><br>
  <label for="f_formtextbox">You will type your response here:</label><br>
  <textarea id="f_formtextbox" name ="message" rows="4" cols="55" form = "formcomment">
  Type your response (delete this first, obviously).
  </textarea><br>
  </fieldset>
  <button type="submit" class="btn btn-primary" id="submitbtncomm">Submit</button>
</form>

`


selectchoice.innerHTML = commenttemplate;
getComments();
commid = document.getElementById("formcomment");
recdropdown = document.getElementById('receiverswitch')
commid.addEventListener("submit", function(event){
    event.preventDefault();
    let commData = new FormData(commid);   
  });

commid.addEventListener("formdata", event => {
    event.preventDefault();
    const commdata = event.formData;
    
    commObj = {};
    commObj['form'] = document.getElementById('formid').value;
    commObj['id'] = 1;
    commObj['sender'] = employee;
    if(recdropdown.value == 'sup'){
        commObj['receiver'] = employee.sup;
    }else {
        commObj['receiver'] = 4;
    }
   
    commObj['message'] = document.getElementById('f_formtextbox').value;
    console.log(commObj);
    jsonDataComment = JSON.stringify(commObj);
    console.log(jsonDataComment);
    alert("Comment submit attempted.")
    submitComment();
  });




function getComments(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = parseCom;
    xhttp.open('GET', baseURL+"comments/");
    xhttp.send();

    function parseCom(){
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            let comms = xhttp.responseText;
            comms = JSON.parse(comms);
            console.log(comms);
            comms.sort(compare);
            comms.forEach(comm => {
                if (comm.sender.id == employee.id || comm.receiver.id == employee.id ){
                    addCommToTable(comm);
                }
                
            });
            document.getElementById('loadinggif').innerHTML = '';
        } else {
            document.getElementById("loadinggif").innerHTML = '<img src = "static/images/loading.gif">';
        }
    }
}
function addCommToTable(comm) {
    let table = document.getElementById('viewcommtable');
    let tr = document.createElement('tr');
    let td = document.createElement('td');
   
   
    // id
    addTableDef(tr, comm.id);
    // formid
    addTableDef(tr, comm.form.id);
    // sender
    addTableDef(tr, comm.sender.firstName +" "+ comm.sender.lastName);
    // receiver
    addTableDef(tr, comm.receiver.firstName +" "+ comm.receiver.lastName);
    // message
    addTableDef(tr, comm.message);
    table.appendChild(tr);
}
    function addTableDef(row, value) {
        let td = document.createElement('td');
        td.innerHTML = value;
        row.appendChild(td);
    }

    function compare(a, b) {
        if (a.form.id > b.form.id) return 1;
        if (b.form.id > a.form.id) return -1;
      
        return 0;
      }

function submitComment(){
    console.log("submit");
        
var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=commentSuccess;
    xhttp.open("POST", baseURL+"comments/");
    xhttp.send(jsonDataComment);
     
    function commentSuccess(){    
    if (xhttp.readyState === 4 && xhttp.status === 201) {

            alert(`Comment successfully submitted.`)
            document.getElementById('loadinggif').innerHTML = '';
            location.reload;
        } else {
            document.getElementById("loadinggif").innerHTML = '<img src = "static/images/loading.gif">';
        }
     }
}

