document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("patientInput");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log(data);
    });
});
