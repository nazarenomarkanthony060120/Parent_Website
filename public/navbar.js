var li_elements = document.querySelectorAll(".navbar-containers li")
var item_elements = document.querySelectorAll(".item");

for (var i = 0; i < li_elements.length; i++){
    li_elements[i].addEventListener('click', function(){
        li_elements.forEach(function(li){
            li.classList.remove("active");
        })
        this.classList.add("active");
        var li_value = this.getAttribute ("data-li");
        item_elements.forEach(function(item){
            item.style.display = "none";
        })

        if (li_value == 'dashboard') {
            document.querySelector("." + li_value).style.display = 'block'
            document.querySelector('.content-title span').textContent = 'Dashboard'
        } else if (li_value == 'enrollment') {
            document.querySelector("." + li_value).style.display = 'block'
            document.querySelector('.content-title span').textContent = 'Enrollment'
        } else if (li_value == 'subject') {
            document.querySelector("." + li_value).style.display = 'block'
            document.querySelector('.content-title span').textContent = 'Subject'
        } else if (li_value == 'grade') {
            document.querySelector("." + li_value).style.display = 'block'
            document.querySelector('.content-title span').textContent = 'Grade'
        } else if (li_value == 'attendance') {
            document.querySelector("." + li_value).style.display = 'block'
            document.querySelector('.content-title span').textContent = 'Attendance'
        } else if (li_value == 'view-enrollees') {
            document.querySelector("." + li_value).style.display = 'block'
        } else if (li_value == 'view-payment') {
            document.querySelector("." + li_value).style.display = 'block'
        } else if (li_value == 'add-subject') {
            document.querySelector('.' + li_value).style.display = 'block'
        }
    })
}







