//vars
mainScreen = 
`<div id = "maindiv">

<p id = "maindivtext">You have some options.  Which will you choose?</p>

</div>
<div id = "dropdowndiv">
    <label for="dropdown">Choose an option:</label>

    <select id="dropdown">
        <optgroup id="trms" label="TRMS Options">
              
            <option value="about">About me (you).</option>
            <option value="makerequest">Make a request.</option> 
            <option value="updategrade">Update grade on a request.</option>
            <option value="reqhist">View your request history.</option>
            <option value="viewdec">View decisions.</option>
            <option value="comments">View/Make Comments</option>
        </optgroup>
        <optgroup id="supstuff" label = "Supervisor Stuff" disabled>
            <option value="actionreqsup">Take action on request.</option>
        </optgroup>
        <optgroup id="bencostuff" label = "BENCO Only." disabled>
            <option value="actionreqbenco">Take action on request.</option>
            <option value="viewallreq">View all requests.</option>
            <option value="viewalldec">View all decisions.</option>
        </optgroup>
    </select>
</div>`


logindisplay = document.getElementById("logindisplay");
inserthere = document.getElementById("inserthere");

 
//Sheeshak!
if(employee){
    logindisplay.parentNode.removeChild(logindisplay);
    inserthere.innerHTML = mainScreen;
    loadJS('/Project1/static/js/aboutme.js', document.body);
}else{alert("You will log in.")}

dropdown = document.getElementById("dropdown");
selectchoice = document.getElementById("selectchoice");
supstuff = document.getElementById("supstuff");
bencostuff = document.getElementById("bencostuff");

if (employee.title == 'BENCO'){bencostuff.disabled = false}
if (employee.access == 'SUPERVISOR'){supstuff.disabled = false}



dropdown.addEventListener('change', (event) => {
    
    dropdownValue = dropdown.value


    if (dropdownValue === "about"){
        selectchoice.innerHTML = "";
        loadJS('/Project1/static/js/aboutme.js', document.body);
    }else  if (dropdownValue === "makerequest"){
        selectchoice.innerHTML = "";
        loadJS('/Project1/static/js/form.js', document.body);
    }else if (dropdownValue === "updategrade"){
        selectchoice.innerHTML = "";
        loadJS('/Project1/static/js/editform.js', document.body);
    }else  if (dropdownValue === "reqhist"){
        selectchoice.innerHTML = "";
        loadJS('/Project1/static/js/viewreq.js', document.body);
    }else  if (dropdownValue === "viewdec"){
        selectchoice.innerHTML = "";
        loadJS('/Project1/static/js/viewdec.js', document.body);
    }else  if (dropdownValue === "comments"){
        selectchoice.innerHTML = "";
        loadJS('/Project1/static/js/comments.js', document.body);
    }else  if (dropdownValue === "actionreqsup"){
        selectchoice.innerHTML = "";
        loadJS('/Project1/static/js/approval.js', document.body);
    }else  if (dropdownValue === "actionreqbenco"){
        selectchoice.innerHTML = "";
        loadJS('/Project1/static/js/approvalbenco.js', document.body);
    }else  if (dropdownValue === "viewallreq"){
        selectchoice.innerHTML = "";
        loadJS('/Project1/static/js/viewreqbenco.js', document.body);
    }else  if (dropdownValue === "viewalldec"){
        selectchoice.innerHTML = "";
        loadJS('/Project1/static/js/viewdecbenco.js', document.body);
    }
});


// switch(dropdownValue){
//     case "about":
//         loadScript("aboutme.js");
//         break;
//     case "makerequest":
//         loadScript("form.js");
//         break;
//     case "update grade":
//         loadScript("editform.js");
//         break;
//     case "reqhist":
//         loadScript("viewreq.js");
//         break;
//     case "viewdec":
//         loadScript("viewdec.js");
//         break;
//     case "comments":
//         loadScript("comments.js");
//         break;
//     case "actionreqsup":
//         loadScript("approval.js");
//         break;
//     case "actionreqbenco":
//         loadScript("approval.js");
//         break;
//     case "viewallreq":
//         loadScript("viewreq.js");
//         break;
//     case "viewalldec":
//         loadScript("viewreq.js");
// }

