import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, orderBy, doc, query, getDoc, where, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyAjnPzN6UJlBc-_9xVE6XRZDLgmdtvEVKI",
    authDomain: "btes-system.firebaseapp.com",
    projectId: "btes-system",
    storageBucket: "btes-system.appspot.com",
    messagingSenderId: "71757932730",
    appId: "1:71757932730:web:77c9614964b79662e9fa83",
    measurementId: "G-6LK9ZNRQ4S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getStudent (){
    // const colRef = collection (db, 'Student/')
    // const parent_id = query(colRef, where('parent_id', '==', localStorage.getItem('userID')));
    // var snapshot = await getDocs (parent_id)
    // snapshot.docs.forEach((doc) => {
    //     if (doc.data().enrollment_status === 'Enrolled'){
    //         document.querySelector('.attendance .attendance-container').style.display = 'block'
    //         document.querySelector('.attendance .you-are-not-yet-enrolled').style.display = 'none'
    //         setStudentID(doc.id)
    //         setStudentName(doc.data().first_name + ' ' + doc.data().middle_name + ' ' + doc.data().surname)
    //         getAttendance()
    //     } else {
    //         document.querySelector('.attendance .attendance-container').style.display = 'none'
    //         document.querySelector('.attendance .you-are-not-yet-enrolled').style.display = 'block'
    //     }
    // })

    const colRef = collection(db, 'Student');
    const enrollment_status = query(colRef, where('enrollment_status', '==', 'Enrolled'), where('parent_id', '==', localStorage.getItem('userID')));
    onSnapshot(enrollment_status, async (snapshot) => {
        const doc = snapshot.docs[0];
        const subjectContainer = document.querySelector('.attendance .attendance-container');
        if (subjectContainer) {
            subjectContainer.style.display = doc ? 'block' : 'none';
            document.querySelector('.attendance .you-are-not-yet-enrolled').style.display = doc ? 'none' : 'block';
            if (doc) {
                document.querySelector('.attendance .span-student-name .student-name').textContent = doc.data().first_name + ' ' + doc.data().middle_name + ' ' + doc.data().surname
                setStudentID(doc.id)
                setStudentName(doc.data().first_name + ' ' + doc.data().middle_name + ' ' + doc.data().surname)
                await getAttendance();
            }
        }
    });
}

async function getAttendance (){
    const colRef = collection (db, 'Attendance/')
    const student_id = query(colRef, where('student_id', '==', getStudentID()), orderBy('date_time', 'desc'))
    var snapshot = await getDocs (student_id)
    snapshot.docs.forEach((doc) => {
        renderAttendance (doc)
        designAttendance()
    })
}

async function getMentionedName (span_context, userID){
    const colRef = doc (db, 'Student/' + userID)
    const snapshot = await getDoc(colRef);
    if (snapshot.exists()){
        document.querySelector('.attendance .span-student-name .student-name').textContent = snapshot.data().first_name + ' ' + snapshot.data().middle_name + ' ' + snapshot.data().surname
        span_context.textContent = snapshot.data().first_name + ' ' + snapshot.data().middle_name + ' ' + snapshot.data().surname
    }
}

async function getNotifyMessage (span_context, userID){
    const colRef = collection(db, 'Notify');
    const message = query(colRef, where('student_id', '==', userID));
    const snapshot = await getDocs(message);

    span_context.textContent = snapshot.data().message

        // snapshot.forEach((doc) => {
        //     if (doc.data().student_id === userID){
        //         span_context.textContent = doc.data().message;
        //         console.log(doc)
        //     }
        // });

  
}


var x = 1
function renderAttendance(doc) {
    var tbody = document.querySelector('.attendance .attendance-tbody')
    var tr = document.createElement('tr')

    var td_row_no = document.createElement('td')
    var td_name = document.createElement('td')
    var td_date_time = document.createElement('td')
    var td_status = document.createElement('td')

    var span_row_no = document.createElement('span')
    var span_name = document.createElement('span')
    var span_date = document.createElement('span')
    var span_time = document.createElement('span')
    var span_status = document.createElement('span')

    var div_date_time = document.createElement('div')
    var div_date = document.createElement('div')
    var div_time = document.createElement('div')

    td_row_no.className = 'p-3'
    td_name.className = 'p-3'
    div_date.className = 'div-date'
    span_status.className = 'attendance-status'
    td_status.className = 'p-3'

    span_row_no.textContent = `${x++}.`
    getMentionedName(span_name, doc.data().student_id)
    span_time.textContent = doc.data().time
    span_date.textContent = doc.data().date
    span_status.textContent = doc.data().attendance

    div_date.appendChild(span_date)
    div_time.appendChild(span_time)

    div_date_time.appendChild(div_time)
    div_date_time.appendChild(div_date)

    td_row_no.appendChild(span_row_no)
    td_name.appendChild(span_name)
    td_date_time.appendChild(div_date_time)
    td_status.appendChild(span_status)

    tr.appendChild(td_row_no)
    tr.appendChild(td_name)
    tr.appendChild(td_date_time)
    tr.appendChild(td_status)

    tbody.appendChild(tr)
}

function designAttendance(){
    document.querySelectorAll('.attendance-status').forEach((element, index) => {
        if (element.textContent === 'Present'){
            element.style.color = '#000'
            element.style.background = 'rgb(39, 255, 39)'
            element.style.padding = '10px 35px'
            element.style.border = '2px solid rgb(5, 129, 5)'
        } else {
            element.style.color = '#fff'
            element.style.background = '#f03535'
            element.style.padding = '10px 35px'
            element.style.border = '2px solid rgb(188, 28, 28)'
        }
    })
}

var student_id 
function setStudentID (unique_id) {
    student_id = unique_id
}

function getStudentID (){
    return student_id
}

var student_name
function setStudentName (name){ 
    student_name = name
}

function getSTudentName (){
    return student_name
}

window.addEventListener('DOMContentLoaded', async(event) => {
    await getStudent()

    document.querySelector('.attendance .span-search-container #search-date').addEventListener('keyup', (e) => {
        document.querySelectorAll('.attendance .attendance-tbody tr').forEach((row) => {
            row.querySelector('.attendance .attendance-tbody .div-date').textContent.toLowerCase().startsWith(e.target.value.toLowerCase()) ? (row.style.display = 'table-row') : (row.style.display = 'none')
        })
    })
})