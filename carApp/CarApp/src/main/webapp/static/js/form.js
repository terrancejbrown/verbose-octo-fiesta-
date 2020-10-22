

formtemplate = 
`<div id = "formblurbdiv">

<h1>Request Form</h1>
<p>Your request is not complete until every field is completed in full.</p>

<p>All incomplete submissions will be automatically rejected--most graciously--by BENCO. BENCO can do anything.</p>

<p>Requests older than 1337 days old will be automatically approved.</p>

<p>The only exceptions to the above statement are the upload and grade fields. They may be
    completed later. You are welcome.
</p>
</div>
<div id= "formdiv">
<form id = "daform">
<fieldset id = "formwrap">
  <legend>Fill the Fields:</legend>
  <label for="f_date">Date of Event:</label>
  <input type="date" id="f_date" name="timeStamp"></br>
  <label for="f_location">Location:</label>
  <input type="text" id="f_location" name="location"></br>
  <label for="f_price">Total Cost of Event:</label>
  <input type="text" id="f_price" name="price"><br>
  <label for="f_gradeformat">Grading Format:</label>
  <select id="f_gradeformat" name = "gradeFormat" form = "daform">
    <option value="Pass/Fail">Pass/Fail</option>
    <option value="Graded">Graded</option>
    <option value="Other">Other</option>
  </select><br>
  <label for="f_grade">Grade:</label>
  <input type="text" id="grade" name="grade"><br>
  <label for="f_eventtype">Event Type:</label>
  <select id="f_eventtype" name = "eventType" form = "daform">
    <option value="University Course">University Course</option>
    <option value="Seminar">Seminar</option>
    <option value="Certification Prep">Certification Prep</option>
    <option value="Certification Exam">Certification Exam</option>
    <option value="Training">Training</option>
    <option value="Other">Other</option>
  </select><br>
  <label for="f_upurl">Upload URL:</label>
  <input type="text" id="f_upurl" name="uploadUrl"><br>
</fieldset>
<button type="submit" class="btn btn-primary" id="submitbtnform">Submit</button>
</form>
<div id = "expectedreb"></div>
<form id = "formcomment">
  <fieldset id="commentwrap">
    <legend>Comment:</legend>
    <div id = "loadinggif"></div>
  <p>You will provide the following: (1000 characters or less)</p>
  <ul id = "commentlist">
      <li>A short description of the event.</li>
      <li>Justisfication of the reimbursement.</li>
      <li>Any additional information pertinent to the request.</li>
      <li>A humble gesture of appreciation for BENCO.</li>
      
  </ul>
  <label for="f_formtextbox">You will type your response here:</label><br>
  <textarea id="f_formtextbox" name ="message" rows="4" cols="40" form = "formcomment">
  Type your response (delete this first, obviously).
  </textarea><br>
  </fieldset>
  <button type="submit" class="btn btn-primary" id="submitbtncomm">Submit</button>
</form>

</div>

`



selectchoice.innerHTML = formtemplate;
formid = document.getElementById("daform");
commid = document.getElementById("formcomment");

formid.addEventListener("submit", function(event){
    event.preventDefault();
    let formData = new FormData(formid);   
  });
commid.addEventListener("submit", function(event){
    event.preventDefault();
    let commData = new FormData(commid);   
  });

formid.addEventListener("formdata", event => {
    event.preventDefault();
    const formdata = event.formData;
  
// get the data
    // const entries = [...data.entries()];
    // console.log(entries);
    // const values = [...data.values()];
    // console.log(values);
    
    let formObj = {};
    formdata.forEach(function(value, key){
        formObj[key] = value;
    });
    jsonDataForm = JSON.stringify(formObj);
    submitForm();
    
  });
  
  commid.addEventListener("formdata", event => {
    event.preventDefault();
    const commdata = event.formData;
    
    commObj = {};
    commObj['form'] = commentForm;
    commObj['id'] = 1;
    commObj['sender'] = employee;
    if(employee.sup){
        commObj['receiver'] = employee.sup;
    }else{
        commObj['receiver'] = 4;
    }
    commObj['message'] = document.getElementById('f_formtextbox').value;
    console.log(commObj);
    jsonDataComment = JSON.stringify(commObj);
    alert("Comment submit attempted.")
    submitComment();
  });


function submitForm(){
    console.log("submit");
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = getSentform;
	xhttp.open("POST", baseURL+"forms/");
    xhttp.send(jsonDataForm);
   
   function getSentform(){ 
        if (xhttp.readyState === 4 && xhttp.status === 201) {
        let form = xhttp.responseText;
        commentForm = JSON.parse(form);
        console.log(commentForm);
        alert(`Form #${commentForm.id} successfully submitted.`);
        
        let li = document.createElement("li");
        let commentListTemplate = `<li>This form's id# is ${commentForm.id}.</li>`;
        li.innerHTML = commentListTemplate;
        let commentlist = document.getElementById("commentlist");
        commentlist.appendChild(li);  
        document.getElementById('loadinggif').innerHTML = '';
        let eventType = document.getElementById("f_eventtype").value;
        let amount = document.getElementById("f_price").value;

        if (eventType = "University Course") reimburse = amount*.8;
        else if (eventType = "Seminar") reimburse = amount*.6;
        else if (eventType = "Certification Prep") reimburse = amount*.75;
        else if (eventType = "Certification Exam") reimburse = amount*1;
        else if (eventType = "Training") reimburse = amount*.6;
        else reimburse = amount*.3;

        reimburseTemplate = `Reimbursement Expected: $${reimburse}`;

        document.getElementById("expectedreb").innerHTML = reimburseTemplate;
      } else {
          document.getElementById("loadinggif").innerHTML = '<img src = "static/images/loading.gif">';
      }
}
    
}
function submitComment(){
    console.log("submit");
    
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange=commentSuccess;
  xhttp.open("POST", baseURL+"comments/");
    xhttp.send(jsonDataComment);
    
    function commentSuccess(){
    if (xhttp.readyState === 4 && xhttp.status === 201) {

      alert(`Comment for form # ${commentForm.id} successfully submitted.`);
      document.getElementById('loadinggif').innerHTML = '';
      location.reload;
    } else {
        document.getElementById("loadinggif").innerHTML = '<img src = "static/images/loading.gif">';
    }
  }
}


