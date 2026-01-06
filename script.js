function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.style.display="none");
  document.getElementById(id).style.display="block";
}

showPage("dashboard");

// ---------- TIMETABLE ----------
function loadTimetable(){
  fetch("/api/timetable")
  .then(r=>r.json())
  .then(data=>{
    let list = document.getElementById("timetableList");
    list.innerHTML = "";

    data.forEach(c=>{
      let li = document.createElement("li");

      li.innerHTML = `
        ${c.course} | ${c.day} | ${c.time} | ${c.room}
        <button onclick="deleteClass('${c._id}')">Delete</button>
      `;

      list.appendChild(li);
    });
  });
}

// ADD CLASS
function addClass(){
  fetch("/api/timetable",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      course:course.value,
      day:day.value,
      time:time.value,
      faculty:faculty.value,
      room:room.value
    })
  })
  .then(r=>r.json())
  .then(res=>{
    if(res.error) alert(res.error);
    else loadTimetable();
  });
}

// DELETE CLASS
function deleteClass(id){
  if(!confirm("Delete this class?")) return;

  fetch(`/api/timetable/${id}`,{
    method:"DELETE"
  })
  .then(r=>r.json())
  .then(res=>{
    if(res.error) alert(res.error);
    else loadTimetable();
  });
}

loadTimetable();
