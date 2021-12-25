console.log(`2. Beginning the project: `);

// 3. The "Name" field:
const nameInputElement = document.querySelector('input[type = "text"]');
nameInputElement.focus();
console.log(`3. The "Name" field`);

// 4. "Job Role" section:
const jobRoleInputElement = document.querySelector('input[name="other-job-role"]');
const titleSelectElement = document.querySelector('select[name="user-title"]')

jobRoleInputElement.hidden = true;

titleSelectElement.addEventListener('change', e => {
    const jobRoleDropdownTarget = e.target.value;
    if (jobRoleDropdownTarget === 'other'){
        console.log(`4. "Job Role" section: `)
        jobRoleInputElement.hidden = false;
    } else {
        console.log(`4. "Job Role" section: `)
        jobRoleInputElement.hidden = true;
    }
});

// TODO: Add a form field validation on the Other Job field to

// 5. "T-Shirt Info" Section:
const designSelectElement = document.querySelector('select[name="user-design"]');
const designOptionElements = document.querySelectorAll('select[name="user-design"] option');
const colorSelectElement = document.querySelector('#color');
const colorOptionElements = document.querySelectorAll('#color option');

colorSelectElement.disabled = true;

designSelectElement.addEventListener('change', e => {
    colorSelectElement.disabled = false;
    const designDropdownTarget = e.target.value;
    for (let i = 0; i < colorOptionElements.length; i++){
        const colorOptionElementValue = colorOptionElements[i].getAttribute('data-theme');
        if (colorOptionElementValue === designDropdownTarget){
            colorOptionElements[i].hidden = false;
            colorOptionElements[i].setAttribute('selected', true);
            console.log(`5. "T-Shirt Info" section: `)
        } else {
            colorOptionElements[i].hidden = true;
            colorOptionElements[i].removeAttribute('selected');
        }
    }   
});

// 6. "Register for Activities" section: 
const activitiesFieldSetElement = document.querySelector('#activities');
const activitiesTotalCostHTML = document.querySelector('#activities-cost');

let totalCost = 0;

activitiesFieldSetElement.addEventListener('change', e => {
    const activityCostCheckboxTarget = +e.target.getAttribute('data-cost');

    if (e.target.checked) {
        totalCost += activityCostCheckboxTarget;
        console.log(`6. "Register for Activities" section: `);
    } else{
        totalCost -= activityCostCheckboxTarget;
        console.log(`6. "Register for Activities" section: `);
    }

    // (e.target.checked) ? totalCost += activityCostCheckboxTarget : totalCost -= activityCostCheckboxTarget;

activitiesTotalCostHTML.innerHTML = `Total: $${totalCost}` ;
});

// 7. "Payment Info" section:
const paymentMethodSelectElement = document.querySelector('select[name="user-payment"]');
const creditCardDiv = document.querySelector("#credit-card");
const paypalDiv = document.querySelector("#paypal");
const bitcoinDiv = document.querySelector("#bitcoin");

paypalDiv.hidden = true;
bitcoinDiv.hidden = true;

const ccNumPaymentMethod = paymentMethodSelectElement.children[1]
ccNumPaymentMethod.setAttribute('selected',true);

paymentMethodSelectElement.addEventListener('change', e => {
    const paymentDropdownTarget = e.target.value;

    if (paymentDropdownTarget === paypalDiv.id){
        paypalDiv.hidden = false;
        bitcoinDiv.hidden = true;
        creditCardDiv.hidden = true;
        ccNumPaymentMethod.removeAttribute('selected');
        console.log(`7. "Payment Info" section: `);
    } else if (paymentDropdownTarget === bitcoinDiv.id){
        bitcoinDiv.hidden = false;
        paypalDiv.hidden = true;
        creditCardDiv.hidden = true;
        ccNumPaymentMethod.removeAttribute('selected');
        console.log(`7. "Payment Info" section: `);
    } else {
        creditCardDiv.hidden = false;
        paypalDiv.hidden = true;
        bitcoinDiv.hidden = true;
        ccNumPaymentMethod.setAttribute('selected',true);
        console.log(`7. "Payment Info" section: `);
    }
});

// 8. Form Validation:
// nameInputElement
const emailAddressInputElement = document.querySelector('input[type = "email"]');
// activitiesFieldSetElement
const ccNumInputElement = document.querySelector('#cc-num');
const zipInputElement = document.querySelector('#zip');
const cvvInputElement = document.querySelector('#cvv');
const formElement = document.querySelector("form");



/* Validation Pass Function */
const validationPass = (element) => {
    const parent = element.parentElement;
    parent.classList.add('valid');
    parent.classList.remove('not-valid');
    parent.lastElementChild.style.display = 'none'; 
}

/* Validation Fail Function */
const validationFail = (element) => {
    const parent = element.parentElement;
    parent.classList.add('not-valid');
    parent.classList.remove('valid');
    if (element === nameInputElement){
        if (!element.value){
            parent.lastElementChild.style.display = 'inherit';
            parent.lastElementChild.innerHTML = `Name: field cannot be blank`;
        } else {
            parent.lastElementChild.style.display = 'inherit'
            parent.lastElementChild.innerHTML = `Formatting Issue`;
        }
    } else if (element === emailAddressInputElement ){
        if (!element.value){
            parent.lastElementChild.style.display = 'inherit';
            parent.lastElementChild.innerHTML = `Email Address: field cannot be blank`;
        } else {
            parent.lastElementChild.style.display = 'inherit';
            parent.lastElementChild.innerHTML = `Email address must be formatted correctly`;
        }
    } else {
        parent.lastElementChild.style.display = 'inherit'
    }
}

/* Validation Fail Function */
const validationNameFail = (element) => {
    const parent = element.parentElement;
    parent.classList.add('not-valid');
    parent.classList.remove('valid');
    parent.lastElementChild.innerHTML = 'Formatting issue.';
}


/* Helper function to validate name input */
const nameValidator = () => {
    const nameValue = nameInputElement.value.trim();
    console.log("Name value is: ", `"${nameValue}"`);
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*?.? ?[a-zA-Z]*?$/i.test(nameValue);
    console.log(`Name validation test on "${nameValue}" evaluates to ${nameIsValid}`);

    if (nameIsValid === true){
        validationPass(nameInputElement)
    } else {
        validationFail(nameInputElement);
    }

    return nameIsValid;
}
nameInputElement.addEventListener('keyup', nameValidator);

/* Helper function to validate email input */
const emailValidator = () => {
    const emailValue = emailAddressInputElement.value.trim();
    console.log("Email value is: ", `"${emailValue}"`);
    // From https://emailregex.com/
    const emailIsValid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i.test(emailValue);
    console.log(`Email validation test on "${emailValue}" evaluates to ${emailIsValid}`);

    if (emailIsValid === true){
        validationPass(emailAddressInputElement);
    }
    else {
        validationFail(emailAddressInputElement);
    }

    return emailIsValid;
}
emailAddressInputElement.addEventListener('keyup', emailValidator);

/* Helper function to validate Register for Activities section */
const registerForActivitiesValidator = () => {
    const registerForActivitiesSectionIsValid = totalCost > 0;
    console.log(`Register for Activities section validation test evaluates to ${registerForActivitiesSectionIsValid}`);

    return registerForActivitiesSectionIsValid;
}

/* Helper function to validate a creadit card number */
const creditCardNumberValidator = () => {
    const ccNumValue = +ccNumInputElement.value.trim();
    console.log("Credit Card number value is: ",`"${ccNumValue}"`);
    // From https://www.geeksforgeeks.org/how-to-validate-visa-card-number-using-regular-expression/
    const ccNumIsValid = /^\d{13,16}$/i.test(ccNumValue);
    console.log(`Credit Card number validation test on "${ccNumValue}" evaluates to ${ccNumIsValid}`)

    if (ccNumIsValid === true){
        validationPass(ccNumInputElement);
    }
    else {
        validationFail(ccNumInputElement);
    }

    return ccNumIsValid;
}
ccNumInputElement.addEventListener('keyup', creditCardNumberValidator);

/* Helper function to validate Zip Code input */
const zipCodeValidator = () => {
    const zipCodeValue = +zipInputElement.value.trim();
    console.log("Zip Code value is: ", `"${zipCodeValue}"`);
    const zipCodeIsValid = /^\d{5}(-\d{4})?$/i.test(zipCodeValue);
    console.log(`Zip Code validation test on "${zipCodeValue}" evaluates to ${zipCodeIsValid}`);

    if (zipCodeIsValid === true){
        validationPass(zipInputElement);
    }
    else {
        validationFail(zipInputElement);
    }

    return zipCodeIsValid;
}
zipInputElement.addEventListener('keyup', zipCodeValidator);

/* Helper function to validate CVV input */
const cvvValidator = () => {
    const cvvValue = +cvvInputElement.value.trim();
    console.log("CVV value is: ", `"${cvvValue}"`);
    const cvvIsValid = /^\d{3}$/i.test(cvvValue);
    console.log(`CVV validation test on "${cvvValue}" evaluates to ${cvvIsValid}`);

    if (cvvIsValid === true){
        validationPass(cvvInputElement);
    }
    else {
        validationFail(cvvInputElement);
    }

    return cvvIsValid;
}
cvvInputElement.addEventListener('keyup', cvvValidator);

formElement.addEventListener('submit', e => {
     e.preventDefault();

    if(!nameValidator()){
        e.preventDefault();
    }
    if(!emailValidator()){
        e.preventDefault();
    }
    if(!registerForActivitiesValidator()){
        e.preventDefault();
    }
    //console.log(ccNumPaymentMethod.getAttribute('selected'));
    if(ccNumPaymentMethod.getAttribute('selected') === 'true') {
        if(!creditCardNumberValidator()){
            e.preventDefault();
        } 
        if(!zipCodeValidator()){
            e.preventDefault();
        } 
        if(!cvvValidator()){
            e.preventDefault();
        } 
    }
});

// Handles tab index for checkbox parent labels
[...document.querySelectorAll('#activities input')].forEach(cb => {
    cb.addEventListener('focus', e => cb.parentElement.classList.add('focus'));
  
    cb.addEventListener('blur', e => {
      const active = document.querySelector('.focus');
      if (active) active.classList.remove('focus');
    })
  });