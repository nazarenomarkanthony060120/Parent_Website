import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, orderBy, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
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

async function getPosts (){
    // const colRef = collection(db, 'Post')
    // const mentioned_id = localStorage.getItem('userID')
    // const mentioned = query(colRef, where('mentioned', '==', mentioned_id), orderBy('date_time', 'desc'));
    
    // let cachedDocs = new Set();
    // onSnapshot(mentioned, (querySnapshot) => {
        
    //     querySnapshot.docChanges().forEach((change) => {
    //         const doc = change.doc;
    //         const docId = doc.id;
    //         if (change.type === 'added') {
    //             if (!cachedDocs.has(docId)) {
    //                 cachedDocs.add(docId);
    //                 renderPosts(doc)
    //             }
    //         }
    //     });
    // });

    const colRef = collection(db, 'Post')
    const mentioned_id = localStorage.getItem('userID')
    const mentioned = query(colRef, where ('mentioned', '==', mentioned_id), orderBy('date_time', 'desc'))
    const snapshot = await getDocs(mentioned)
    snapshot.docs.forEach((doc) => {
        renderPosts(doc)
    })
}

async function getAnnouncement (){
    // const colRef = collection(db, 'Announcement')
    // const mentioned_id = localStorage.getItem('userID')
    // const mentioned = query(colRef, where('mentioned_id', '==', mentioned_id), orderBy('date_time', 'desc'));
    
    // onSnapshot(mentioned, (querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         renderAnnouncement(doc)
    //     })
    // });

    const colRef = collection(db, 'Announcement')
    const mentioned_id = localStorage.getItem('userID')
    const mentioned = query(colRef, where ('mentioned_id', '==', mentioned_id), orderBy('date_time', 'desc'))
    const snapshot = await getDocs(mentioned)
    snapshot.docs.forEach((doc) => {
        renderAnnouncement(doc)
        // console.log(doc)
    })
}

async function getMentionedName (span_context, userID){
    const colRef = doc (db, 'Pupil/' + userID)
    const snapshot = await getDoc(colRef);
    if (snapshot.exists()){
        span_context.textContent = `To: ` + snapshot.data().f_name + ' ' + snapshot.data().m_name + ' ' + snapshot.data().l_name
    }
}

async function getMentionedTeacherName (span_context, userID){
    const colRef = doc (db, 'Teacher/' + userID)
    const snapshot = await getDoc(colRef);
    if (snapshot.exists()){
        span_context.textContent = snapshot.data().f_name + ' ' + snapshot.data().m_name + ' ' + snapshot.data().l_name
    }
}
// mag gama pako date og time or date_time sa entity nga Post para sa orderby parent og teacher

function renderAnnouncement (doc) {
    var event_posted = document.querySelector('.events')

    var div_announce_container = document.createElement('div')
    var div_date_time = document.createElement('div')
    var div_time = document.createElement('div')
    var div_date = document.createElement('div')
    var div_announce_content = document.createElement('div')
    var div_mentioned = document.createElement('div')

    var span_time = document.createElement('span')
    var span_date = document.createElement('span')
    var span_announcement = document.createElement('span')
    var span_mentioned = document.createElement('span')

    div_announce_container.className = 'announcement_container'
    div_date_time.className = 'div_time_date'
    div_announce_content.className = 'div_announce_content'
    div_mentioned.className = 'div_mentioned'

    span_time.textContent = doc.data().time
    span_date.textContent = doc.data().date
    span_announcement.textContent = doc.data().announcement

    getMentionedName(span_mentioned, doc.data().mentioned_id)

    div_time.appendChild(span_time)
    div_date.appendChild(span_date)

    div_date_time.appendChild(div_time)
    div_date_time.appendChild(div_date)

    div_announce_content.appendChild(span_announcement)

    div_mentioned.appendChild(span_mentioned)

    div_announce_container.appendChild(div_date_time)
    div_announce_container.appendChild(div_announce_content)
    div_announce_container.appendChild(div_mentioned)

    event_posted.appendChild(div_announce_container)
}

function renderPosts (doc){
    var announcement = document.querySelector('.announcement')

    var announcement_container = document.createElement('div')
    var div_name_time_date_container = document.createElement('div')
    var div_name_status = document.createElement('div')
    var div_name = document.createElement('div')
    var div_status = document.createElement('div')
    var div_time_date = document.createElement('div')
    var div_time = document.createElement('div')
    var div_date = document.createElement('div')
    var div_announce_content = document.createElement('div')
    var div_mentioned = document.createElement('div')
    
    var span_name = document.createElement('span')
    var span_status = document.createElement('span')
    var span_time = document.createElement('span')
    var span_date = document.createElement('span')
    var span_announce_content = document.createElement('span')
    var span_mentioned = document.createElement('span')

    announcement_container.className = 'announcement_container'
    div_name_time_date_container.className = 'div_name_time_date_container'
    div_name_status.className = 'div_name_status'
    div_time_date.className = 'div_time_date'
    div_announce_content.className = 'div_announce_content'
    div_mentioned.className = 'div_mentioned'


    span_name.textContent = doc.data().teacher_name
    getMentionedTeacherName(span_name, doc.data().teacher_id)

    span_status.textContent = doc.data().status
    span_time.textContent = doc.data().time
    span_date.textContent = doc.data().date_posted
    span_announce_content.textContent = doc.data().post

    getMentionedName(span_mentioned, doc.data().mentioned)

    div_name.appendChild(span_name)
    div_status.appendChild(span_status)
    div_time.appendChild(span_time)
    div_date.appendChild(span_date)

    div_name_status.appendChild(div_name)
    div_name_status.appendChild(div_status)

    div_time_date.appendChild(div_time)
    div_time_date.appendChild(div_date)

    div_name_time_date_container.appendChild(div_name_status)
    div_name_time_date_container.appendChild(div_time_date)

    div_announce_content.appendChild(span_announce_content)
    div_mentioned.appendChild(span_mentioned)

    announcement_container.appendChild(div_name_time_date_container)
    announcement_container.appendChild(div_announce_content)
    announcement_container.appendChild(div_mentioned)

    announcement.appendChild(announcement_container)
}

async function getParentName (){
    const id = localStorage.getItem('userID')
    const span_context = document.querySelector('.left-navbar .logo-title-container #parent-name')
    const colRef = doc (db, 'Pupil/' + id)
    const snapshot = await getDoc(colRef);
    if (snapshot.exists()){
        span_context.textContent = 'Hello, ' + snapshot.data().f_name + '!'
    }
}

window.addEventListener('DOMContentLoaded', async(event) => {
    await getParentName()
    await getPosts()
    await getAnnouncement()

})