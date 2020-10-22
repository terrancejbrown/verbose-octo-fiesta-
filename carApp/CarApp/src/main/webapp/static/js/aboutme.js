
aboutscreen = `
<div id= "aboutdiv">
<h1>Information about you!</h1>
<table style = "width: 75%">
    <tr>
        <th>Name:</th>
        <td id = "aboutname">${employee.firstName} ${employee.lastName}</td>
    </tr>
    <tr>
        <th>ID:</th>
        <td id = "aboutid">${employee.id}</td>
    </tr>
    <tr>
        <th>Access Level:</th>
        <td id = "aboutaccess">${employee.access}</td>
    </tr>
    <tr>
        <th>Title:</th>
        <td id = "abouttitle">${titleVar}</td>
    </tr>
    <tr>
        <th>Department:</th>
        <td id = "aboutdpt">${employee.dpt.name}</td>
    </tr>
    <tr>
        <th>Supervisor:</th>
        <td id = "aboutsup">${supVar}</td>
    </tr>
</table>


</div>
`
selectchoice.innerHTML = aboutscreen;