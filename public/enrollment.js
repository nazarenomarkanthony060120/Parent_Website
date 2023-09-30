import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, setDoc, onSnapshot, doc, query, addDoc, where, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
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

var status
var sy
async function getEnrollmentStatus (){
    
    const colRef = collection(db, 'Enrollment')
    onSnapshot(colRef, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            status = doc.data().status
            sy = doc.data().sy
            if (status === 'open'){
                document.querySelector('.enrollment .enrollment-open .enrollment-text #sy').textContent = 'SY: ' + getSchoolYears() 
                document.querySelector('.enrollment-closed').style.display = 'none'
                document.querySelector('.enrollment-open').style.display = 'block'
            } else {
                document.querySelector('.enrollment .close-text #sy').textContent = 'Enrollment for ' + getSchoolYears() + ' is now closed'
                document.querySelector('.enrollment-closed').style.display = 'block'
                document.querySelector('.enrollment-open').style.display = 'none'
            }
        })
    })
}

var grade
async function getGrade (){
    const colRef = collection(db, 'Student')
    const mentioned = query(colRef, where('parent_id', '==', localStorage.getItem('userID')));
    onSnapshot(mentioned, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            grade = doc.data().grade
        })
    })

}

async function getSchoolYear (){
    const colRef = collection(db, 'Enrollment')
    onSnapshot(colRef, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setSchoolYear(doc.data().sy)
        })
    })
}

async function applyEnrollment(parent_id, age_on_june, surname, first_name, middle_name, date_of_birth, place_of_birth, age, sex, home_address, contact_no, religion, school_last_attended, address, grade_level_in_the_previous_school, honor_received, father_name, father_occupation, father_contact_no, mother_name, mother_occupation, mother_contact_no, name, relationship, tel_no, cell_no, grade, checkbox) {
    document.getElementById('applying-text').textContent = 'Applying please wait!'
    const colRef = doc(db, 'Students_Pending_Enrollment', parent_id)
    await setDoc(colRef, {
        parent_id : parent_id,
        age_on_june: age_on_june,
        surname: surname,
        first_name: first_name,
        middle_name: middle_name,
        date_of_birth: date_of_birth,
        place_of_birth: place_of_birth,
        age: age,
        sex: sex,
        home_address: home_address,
        contact_no: contact_no,
        religion: religion,
        school_last_attended: school_last_attended,
        address: address,
        grade_level_in_the_previous_school: grade_level_in_the_previous_school,
        honor_received: honor_received,
        father_name: father_name,
        father_occupation: father_occupation,
        father_contact_no: father_contact_no,
        mother_name: mother_name,
        mother_occupation: mother_occupation,
        mother_contact_no: mother_contact_no,
        name: name,
        relationship: relationship,
        tel_no: tel_no,
        cell_no: cell_no,
        grade: grade,
        checkbox: checkbox,
        enrollment_status : 'Pending',
        sy : getSchoolYears()
    }).then (() => {
        location.reload()
    })
}

async function getAppliedEnrollmentStatus (){
    const colRef = collection (db, 'Students_Pending_Enrollment/')
    const parent_id = query(colRef, where('parent_id', '==', localStorage.getItem('userID')));
    onSnapshot(parent_id, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            if (doc.data().enrollment_status === 'Pending') {
                document.querySelector('.enrollment .enrollment-open').style.display = 'none'
                document.querySelector('.enrollment .enrollment-closed').style.display = 'none'
                document.querySelector('.enrollment .waiting-for-confirmation').style.display = 'block'
            } 
        });
    });
}

async function getEnrolledStatus (){
    const colRef = collection (db, 'Student/')
    const parent_id = query(colRef, where('parent_id', '==', localStorage.getItem('userID')));
    onSnapshot(parent_id, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            if (doc.data().enrollment_status === 'Enrolled') {
                document.querySelector('.enrollment .enrollment-open').style.display = 'none'
                document.querySelector('.enrollment .you-are-now-enrolled').style.display = 'block'
                document.querySelector('.enrollment .waiting-for-confirmation').style.display = 'none'
            }
        });
    });
}

var sy
function setSchoolYear (schoolYear){
    sy = schoolYear
}

function getSchoolYears(){ 
    return sy
}

async function getPupilInformation (){
    const id = localStorage.getItem('userID')
    const colRef = doc (db, 'Pupil/' + id)
    const snapshot = await getDoc(colRef);
    if (snapshot.exists()){
        document.querySelector('.enrollment .enrollment-open .fill-up-form .name-container #surname').value = snapshot.data().l_name
        document.querySelector('.enrollment .enrollment-open .fill-up-form .name-container #first-name').value = snapshot.data().f_name
        document.querySelector('.enrollment .enrollment-open .fill-up-form .name-container #middle-name').value = snapshot.data().m_name
        document.querySelector('.enrollment .enrollment-open .fill-up-form .home-address-contact-no-religion-container #contact-no').value = snapshot.data().contact_number
        document.querySelector('.enrollment .enrollment-open .fill-up-form .name-of-father-occupation-contact-no-container #contact-no').value = snapshot.data().contact_number
        document.querySelector('.enrollment .enrollment-open .fill-up-form .name-of-father-occupation-contact-no-container #name-of-father').value = snapshot.data().father
        document.querySelector('.enrollment .enrollment-open .fill-up-form .name-of-mother-occupation-contact-no-container #contact-no').value = snapshot.data().contact_number
        document.querySelector('.enrollment .enrollment-open .fill-up-form .name-of-mother-occupation-contact-no-container #name-of-mother').value = snapshot.data().mother
    }
}


window.addEventListener('DOMContentLoaded', async(event) => {
    await getSchoolYear()
    await getEnrollmentStatus()
    await getAppliedEnrollmentStatus()
    await getEnrolledStatus()
    await getGrade()
    await getPupilInformation()

    var apply_enrollment = true
    document.getElementById('apply-enrollment').addEventListener('click', () => {
        var age_on_june = document.getElementById('age-on-june').value
        var surname = document.getElementById('surname').value
        var first_name = document.getElementById('first-name').value
        var middle_name = document.getElementById('middle-name').value
        var date_of_birth = document.getElementById('date-of-birth').value
        var place_of_birth = document.getElementById('place-of-birth').value
        var age = document.getElementById('age').value
        var sex = document.getElementById('sex').value
        var home_address = document.getElementById('home-address').value
        var contact_no = document.getElementById('contact-no').value
        var religion = document.getElementById('religion').value
        var school_last_attended = document.getElementById('school-last-attended').value
        var address = document.getElementById('address').value
        var grade_level_in_the_previous_school = document.getElementById('grade-level-in-the-previous-school').value
        var honor_received = document.getElementById('honor-received').value
        var father_name = document.getElementById('name-of-father').value
        var father_occupation = document.querySelector('.name-of-father-occupation-contact-no-container #occupation').value
        var father_contact_no = document.querySelector('.name-of-father-occupation-contact-no-container #contact-no').value
        var mother_name = document.getElementById('name-of-mother').value
        var mother_occupation = document.querySelector('.name-of-mother-occupation-contact-no-container #occupation').value
        var mother_contact_no = document.querySelector('.name-of-father-occupation-contact-no-container #contact-no').value
        var name = document.getElementById('name').value
        var relationship = document.getElementById('relationship').value
        var tel_no = document.getElementById('contact-no-tel').value
        var cell_no = document.getElementById('cell-no').value
        var grade = document.getElementById('grade').value
        var checkbox = document.querySelector('input[type="radio"]:checked').value
        var parent_id = localStorage.getItem('userID')
        if (apply_enrollment === true){
            applyEnrollment(parent_id, age_on_june, surname, first_name, middle_name, date_of_birth, place_of_birth, age, sex, home_address, contact_no, religion, school_last_attended, address, grade_level_in_the_previous_school, honor_received, father_name, father_occupation, father_contact_no, mother_name, mother_occupation, mother_contact_no, name, relationship, tel_no, cell_no, grade, checkbox)
            apply_enrollment = false
        }
    })
})