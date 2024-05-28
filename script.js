//#region Open Menu
let menu2 = document.getElementById('menu2');
let open = false;

function openMenu() {
    if (!open) {menu2.style.transform = 'translateY(0%)'; open = true;}
    else {menu2.style.transform = 'translateY(-100%)'; open = false;}
}
//#endreion Open Menu


//#region Form

let formWith = 'phone';
let inputPhone = document.querySelector('#hero-bg input[type="tel"]');
let inputEmail = document.querySelector('#hero-bg input[type="email"]');

let btn = document.querySelector('#hero-bg .btn-low');

function formWithEmail() { //Client can choose what to inform (Email, by default, or Phone Number)

    if (formWith == 'phone') {
        inputEmail.style.display = 'block';
        inputPhone.style.display = 'none';

        btn.value = "Phone Number";
        formWith = 'email';
    }
    else {
        inputEmail.style.display = 'none';
        inputPhone.style.display = 'block';

        btn.value = "Use Email";
        formWith = 'phone';
    }
}

//#endregion Form



//#region Send Email

(function(){
    emailjs.init({
      publicKey: "_rEnsnDUpux46gD0Z",
    });
 })();


 document.querySelectorAll('input[type="submit"]')
 .forEach((item) => item.addEventListener('click', (event) => {

    let id = item.parentElement.parentElement.id; //There are two forms, so we have to read only the correct
    let requiredFields = null;
    let toCheck = null;

    if (id == "bg-form") { //The first form only required or email or phone number (but, since number does not have a particular format, it won´t be checked)

        if (formWith == "email") {
            requiredFields = {
                name: document.querySelector('#bg-form input[type="text"]'),
                email: document.querySelector('#bg-form input[type="email"]')
            }
            toCheck = requiredFields.email;
        }
        else {
            requiredFields = {
                name: document.querySelector('#bg-form input[type="text"]'),
                number: document.querySelector('#bg-form input[type="tel"]')
            }
            toCheck = requiredFields.number;
        }

    } else {
        
        requiredFields = { //At the contact form, both email and number will be required until one get properly informed
            name: document.querySelector('#contact-form input[type="text"]'),
            email: document.querySelector('#contact-form input[type="email"]'),
            number: document.querySelector('#contact-form input[type="tel"]')
        }
        toCheck = requiredFields.email;

        if (requiredFields.email.checkValidity()) {
            requiredFields = {
                name: document.querySelector('#contact-form input[type="text"]'),
                email: document.querySelector('#contact-form input[type="email"]')
            }
            toCheck = requiredFields.email;
        }
        else {
            requiredFields = {
                name: document.querySelector('#contact-form input[type="text"]'),
                number: document.querySelector('#contact-form input[type="tel"]')
            }
            toCheck = requiredFields.number;
        }
        
    }
    

    let infos = {
        from_name: document.querySelector(`#${id} input[type="text"]`).value,
        from_email: document.querySelector(`#${id} input[type="email"]`).value,
        from_number: document.querySelector(`#${id} input[type="tel"]`).value
    }

    if (requiredFields.name.checkValidity() && toCheck.checkValidity()) {
        event.preventDefault();

        emailjs.send("service_s7vi33i", "template_ys3jbu3", infos)
        .then(() => alert("Congratulations! Soon, we will contact you."))
        .catch((error) => alert("Ops! Something got wrong, please try again. " + error));

        document.querySelector(`#${id} input[type="text"]`).value = "";
        document.querySelector(`#${id} input[type="email"]`).value = "";
        document.querySelector(`#${id} input[type="tel"]`).value = "";

        document.querySelector(`#${id} input[type="submit"]`).style.backgroundColor = '#5df872';
    };

 }))
    
//#endregion Send Email
