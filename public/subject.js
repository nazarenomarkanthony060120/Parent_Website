import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, setDoc, onSnapshot, doc, query, addDoc, where, getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
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

async function getStudentEnrollmentStatus() {
    // const colRef = collection(db, 'Student');
    // const enrollment_status = query(colRef, where('enrollment_status', '==', 'Enrolled') && where('parent_id', '==', localStorage.getItem('userID')));
    // onSnapshot(enrollment_status, (querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         const subjectContainer = document.querySelector('.subject .subject-container');
    //         if (subjectContainer) {
    //             if (doc.data().enrollment_status === 'Enrolled') {
    //                 subjectContainer.style.display = 'block';
    //                 document.querySelector('.subject .you-are-not-yet-enrolled').style.display = 'none'
    //                 document.querySelector('.subject .span-student-name .student-name').textContent = doc.data().first_name + ' ' + doc.data().middle_name + ' ' + doc.data().surname

    //                 setStudentGrade(doc.data().grade)
    //                 getSubject()
    //             } else {
    //                 subjectContainer.style.display = 'none';
    //                 document.querySelector('.subject .you-are-not-yet-enrolled').style.display = 'block'
    //             }
    //         }
    //     });
    // });

    const colRef = collection(db, 'Student');
    const enrollment_status = query(colRef, where('enrollment_status', '==', 'Enrolled'), where('parent_id', '==', localStorage.getItem('userID')));
    onSnapshot(enrollment_status, async (snapshot) => {
        const doc = snapshot.docs[0];
        const subjectContainer = document.querySelector('.subject .subject-container');
        if (subjectContainer) {
            subjectContainer.style.display = doc ? 'block' : 'none';
            document.querySelector('.subject .you-are-not-yet-enrolled').style.display = doc ? 'none' : 'block';
            if (doc) {
                document.querySelector('.subject .span-student-name .student-name').textContent = doc.data().first_name + ' ' + doc.data().middle_name + ' ' + doc.data().surname
                setStudentGrade(doc.data().grade);
                await getSubject();
            }
        }
    });
}

async function getSubject() {
    // const colRef = collection(db, 'Subject');
    // const grade = query(colRef, where('grade', '==', getStudentGrade()));
    // onSnapshot(grade, (querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         const subjectContainer = document.querySelector('.subject .subject-container');
    //         const isEnrolled = doc.data().grade === getStudentGrade();
    //         subjectContainer.style.display = isEnrolled ? 'block' : 'none';
    //         document.querySelector('.subject .you-are-not-yet-enrolled').style.display = isEnrolled ? 'none' : 'block';
    //         if (isEnrolled) {
    //             renderSubject(doc);
    //         }
    //     });
    // });

    const colRef = collection(db, 'Subject')
    const grade = query(colRef, where('grade', '==', getStudentGrade()))
    const snapshot = await getDocs(grade)
    snapshot.docs.forEach((doc) => {
        const subjectContainer = document.querySelector('.subject .subject-container');
        const isEnrolled = doc.data().grade === getStudentGrade();
        subjectContainer.style.display = isEnrolled ? 'block' : 'none';
        document.querySelector('.subject .you-are-not-yet-enrolled').style.display = isEnrolled ? 'none' : 'block';
        if (isEnrolled) {
            renderSubject(doc);
        }
    })
}
  
var x = 1
function renderSubject(doc) {
    var tbody = document.querySelector('.subject-tbody')
    var tr = document.createElement('tr')

    var td_row_no = document.createElement('td')
    var td_subject = document.createElement('td')
    var td_teacher = document.createElement('td')
    var td_time = document.createElement('td')

    var span_row_no = document.createElement('span')
    var span_subject = document.createElement('span')
    var span_teacher = document.createElement('span')
    var span_time = document.createElement('span')

    span_row_no.textContent = `${x++}.`
    span_subject.textContent = doc.data().subject
    span_teacher.textContent = doc.data().teacher
    span_time.textContent = doc.data().time

    td_row_no.appendChild(span_row_no)
    td_subject.appendChild(span_subject)
    td_teacher.appendChild(span_teacher)
    td_time.appendChild(span_time)

    tr.appendChild(td_row_no)
    tr.appendChild(td_subject)
    tr.appendChild(td_teacher)
    tr.appendChild(td_time)

    tbody.appendChild(tr)
}

var grade
function setStudentGrade (student_grade){
    grade = student_grade
}

function getStudentGrade (){
    return grade
}

window.addEventListener('DOMContentLoaded', async (event) => {
    await getStudentEnrollmentStatus()
})