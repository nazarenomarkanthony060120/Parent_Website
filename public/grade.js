import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, query, where, onSnapshot, doc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
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

async function getStudentInfo() {
    // const colRef = collection(db, 'Student')
    // const student_name = query(colRef, where('parent_id', '==', localStorage.getItem('userID')));
    
    // onSnapshot(student_name, (querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         if (doc.data().enrollment_status === 'Enrolled') {
    //             document.querySelector('.grade .grade-container').style.display = 'block'
    //             document.querySelector('.grade .you-are-not-yet-enrolled').style.display = 'none'
    //             document.querySelector('.grade .span-student-name .student-name').textContent = doc.data().first_name + ' ' + doc.data().middle_name + ' ' + doc.data().surname
    //             setStudentUniqueID(doc.id)
    //             setStudentEnrolled(doc.data().enrollment_status)
    //             getStudentGrade()
    //         } else {
    //             document.querySelector('.grade .grade-container').style.display = 'none'
    //             document.querySelector('.grade .you-are-not-yet-enrolled').style.display = 'block'
    //         }
    //     })
    // });


    const colRef = collection(db, 'Student');
    const enrollment_status = query(colRef, where('enrollment_status', '==', 'Enrolled'), where('parent_id', '==', localStorage.getItem('userID')));
    onSnapshot(enrollment_status, async (snapshot) => {
        const doc = snapshot.docs[0];
        const subjectContainer = document.querySelector('.grade .grade-container');
        if (subjectContainer) {
            subjectContainer.style.display = doc ? 'block' : 'none';
            document.querySelector('.grade .you-are-not-yet-enrolled').style.display = doc ? 'none' : 'block';
            if (doc) {
                document.querySelector('.grade .span-student-name .student-name').textContent = doc.data().first_name + ' ' + doc.data().middle_name + ' ' + doc.data().surname
                setStudentGrade(doc.data().grade);
                setStudentID(doc.id)
                getStudentGrades();
            }
        }
    });
}

async function getStudentGrades (){
    const colRef = collection(db, 'Grade')
    const student_name = query(colRef, where('student_unique_id', '==', getStudentID()));
    const snapshot = await getDocs(student_name)
    snapshot.docs.forEach((doc) => {
        renderGrade(doc)
    })
    // onSnapshot(student_name, (querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         renderGrade (doc)
    //     })
    // });

    // const colRef = collection(db, 'Grade')
    // const grade = query(colRef, where('student_unique_id', '==', getStudentGrade()))
    // const snapshot = await getDocs(grade)
    // snapshot.docs.forEach((doc) => {
    //     renderGrade(doc)
    //     console.log(doc)
    // })
}

async function getMentionedSubject (span_context, unique_id){
    const colRef = doc (db, 'Subject/' + unique_id)
    const snapshot = await getDoc(colRef);
    if (snapshot.exists()){
        span_context.textContent = snapshot.data().subject
    }
}

var x = 1
function renderGrade(doc) {
    var tbody = document.querySelector('.grade .student-grade-tbody')
    var tr = document.createElement('tr')

    var td_row_no = document.createElement('td')
    var td_subject = document.createElement('td')
    var td_1st = document.createElement('td')
    var td_2nd = document.createElement('td')
    var td_3rd = document.createElement('td')
    var td_4th = document.createElement('td')

    var span_row_no = document.createElement('span')
    var span_subject = document.createElement('span')
    var span_1st = document.createElement('span')
    var span_2nd = document.createElement('span')
    var span_3rd = document.createElement('span')
    var span_4th = document.createElement('span')

    td_row_no.className = 'p-3'
    td_subject.className = 'p-3'
    td_1st.className = 'p-3'
    td_2nd.className = 'p-3'
    td_3rd.className = 'p-3'
    td_4th.className = 'p-3'

    span_row_no.textContent = `${x++}.`
    getMentionedSubject(span_subject, doc.data().subject_unique_id)
    span_1st.textContent = doc.data().first_grading
    span_2nd.textContent = doc.data().second_grading
    span_3rd.textContent = doc.data().third_grading
    span_4th.textContent = doc.data().fourth_grading

    td_row_no.appendChild(span_row_no)
    td_subject.appendChild(span_subject)
    td_1st.appendChild(span_1st)
    td_2nd.appendChild(span_2nd)
    td_3rd.appendChild(span_3rd)
    td_4th.appendChild(span_4th)

    tr.appendChild(td_row_no)
    tr.appendChild(td_subject)
    tr.appendChild(td_1st)
    tr.appendChild(td_2nd)
    tr.appendChild(td_3rd)
    tr.appendChild(td_4th)

    tbody.appendChild(tr)
}


var student_unique_id
function setStudentGrade (student_id) {
    student_unique_id = student_id
}

function getStudentGrade (){
    return student_unique_id
}

var student_id
function setStudentID (id) {
    student_id = id
}

function getStudentID (){
    return student_id
}

window.addEventListener('DOMContentLoaded', async(event) => {
    await getStudentInfo()

})