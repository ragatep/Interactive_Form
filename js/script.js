/****************************
Treehouse FSJS Techdegree:
Project 3 - Interactive Form
Student: Ryan Agatep
****************************/

'use strict'; 

/* Variables */
// 3. The "Name" field:
const nameInputElement = document.querySelector('input[type = "text"]');
// 4. "Job Role" section:
const jobRoleInputElement = document.querySelector('input[name="other-job-role"]');
const titleSelectElement = document.querySelector('select[name="user-title"]')
// 5. "T-Shirt Info" section:
const designSelectElement = document.querySelector('select[name="user-design"]');
const designOptionElements = document.querySelectorAll('select[name="user-design"] option');
const colorSelectElement = document.querySelector('#color');
const colorOptionElements = document.querySelectorAll('#color option');
// 6. "Register for Activities" section: 
const activitiesFieldSetElement = document.querySelector('#activities');
const activitiesOptionElements = document.querySelectorAll('#activities input');
const activitiesTotalCostHTML = document.querySelector('#activities-cost');
let totalCost = 0;
// 7. "Payment Info" section:
const paymentMethodSelectElement = document.querySelector('select[name="user-payment"]');
const creditCardDiv = document.querySelector("#credit-card");
const paypalDiv = document.querySelector('#paypal');
const bitcoinDiv = document.querySelector('#bitcoin');
const ccNumPaymentMethod = paymentMethodSelectElement.children[1]
// 8. Form Validation:
// nameInputElement from 3. The "Name" field:
const emailAddressInputElement = document.querySelector('input[type = "email"]');
// activitiesFieldSetElement from 6. "Register for Activities" section: 
const ccNumInputElement = document.querySelector('#cc-num');
const zipInputElement = document.querySelector('#zip');
const cvvInputElement = document.querySelector('#cvv');
const formElement = document.querySelector("form");

/* On page load */
nameInputElement.focus(); // 3. The "Name" field:
formElement.reset(); // Resets form on page refresh. 

/* Attributes */
jobRoleInputElement.hidden = true; // 4. "Job Role" section:
colorSelectElement.disabled = true; // 5. "T-Shirt Info" Section:
ccNumPaymentMethod.setAttribute('selected',true); // 7. "Payment Info" section:
paypalDiv.hidden = true; // 7. "Payment Info" section:
bitcoinDiv.hidden = true; // 7. "Payment Info" section:

/* 4. "Job Role" section: */
// The "Other job role" field is hidden by default and its value clears on change.
// It shows/hides when user selects/deselects "Other."
titleSelectElement.addEventListener('change', e => {
    const jobRoleDropdownTarget = e.target.value;
    jobRoleInputElement.value = '';
    jobRoleDropdownTarget === 'other' ? 
        jobRoleInputElement.hidden = false : 
        jobRoleInputElement.hidden = true;
});

/* 5. "T-Shirt Info" Section: */
// Only three of the colors are available for each of the "Design" options.
designSelectElement.addEventListener('change', e => {
    colorSelectElement.disabled = false;
    const designDropdownTarget = e.target.value;
    for (let i = 0; i < colorOptionElements.length; i++){
        const colorOptionElementValue = colorOptionElements[i].getAttribute('data-theme');
        // I used https://codebeautify.org/jsviewer to minified this codeblock
        colorOptionElementValue === designDropdownTarget ? 
            (colorOptionElements[i].hidden = false, colorOptionElements[i].setAttribute('selected', true)) : 
            (colorOptionElements[i].hidden = true, colorOptionElements[i].removeAttribute('selected')); 
    } 
});

/* 6. "Register for Activities" section: */
// When an activity is checked/unchecked, the total cost updates in real time.
activitiesFieldSetElement.addEventListener('change', e => {
    const clicked = e.target
    const activityCostCheckboxTarget = +clicked.getAttribute('data-cost');
    const activityTargetDateTimeAtt = clicked.getAttribute('data-day-and-time');
    clicked.checked ? 
        totalCost += activityCostCheckboxTarget : 
        totalCost -= activityCostCheckboxTarget;
    for (let i = 0; i < activitiesOptionElements.length; i++){
        const activityDateTimeAtt = activitiesOptionElements[i].getAttribute('data-day-and-time');
        if (activityTargetDateTimeAtt === activityDateTimeAtt && clicked !== activitiesOptionElements[i] ){
            clicked.checked ?
                activitiesOptionElements[i].disabled = true :
                activitiesOptionElements[i].disabled = false;    
        }
    }
    activitiesTotalCostHTML.innerHTML = `Total: $${totalCost}` ;
});

/* 7. "Payment Info" section: */
// When the payment method option is updated in the drop-down menu,
// the payment sections in the form updates accordingly
paymentMethodSelectElement.addEventListener('change', e => {
    const paymentDropdownTarget = e.target.value;
    if (paymentDropdownTarget === paypalDiv.id){
        paypalDiv.hidden = false;
        bitcoinDiv.hidden = true;
        creditCardDiv.hidden = true;
        ccNumPaymentMethod.removeAttribute('selected');
    } else if (paymentDropdownTarget === bitcoinDiv.id){
        bitcoinDiv.hidden = false;
        paypalDiv.hidden = true;
        creditCardDiv.hidden = true;
        ccNumPaymentMethod.removeAttribute('selected');
    } else {
        creditCardDiv.hidden = false;
        paypalDiv.hidden = true;
        bitcoinDiv.hidden = true;
        ccNumPaymentMethod.setAttribute('selected',true);
    }
});

// 8. Form Validation:

/* Validation Pass Function */
// From FSJS Project 3 Warm Ups - Input Validation Error Indications
// Shows a green checkmark icon
const validationPass = (element) => {
    const parent = element.parentElement;
    parent.classList.add('valid');
    parent.classList.remove('not-valid');
    parent.lastElementChild.style.display = 'none'; 
}

/* Validation Fail Function */
// From FSJS Project 3 Warm Ups - Input Validation Error Indications
// Shows a red excalamtion-triangle icon and a hint
const validationFail = (element) => {
	const parent = element.parentElement;
	parent.classList.add('not-valid');
	parent.classList.remove('valid');
	if (element === nameInputElement) {
		!element.value ?
			(parent.lastElementChild.style.display = 'inherit',
				parent.lastElementChild.innerHTML = `Please enter a name.`) :
			(parent.lastElementChild.style.display = 'inherit',
				parent.lastElementChild.innerHTML = `Please enter a valid name.`);
	} else if (element === emailAddressInputElement) {
		!element.value ?
			(parent.lastElementChild.style.display = 'inherit',
				parent.lastElementChild.innerHTML = `Please enter your email address.`) :
			(parent.lastElementChild.style.display = 'inherit',
				parent.lastElementChild.innerHTML = `Please enter a valid email address.`);
	} else {
		parent.lastElementChild.style.display = 'inherit'
	}
}

/* Helper function to validate name input */
const nameValidator = () => {
    const nameValue = nameInputElement.value.trim();
    // console.log("Name value is: ", `"${nameValue}"`);
    // From: https://www.regextester.com/93648
    const nameIsValid = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(nameValue);
    // console.log(`Name validation test on "${nameValue}" evaluates to ${nameIsValid}`);
    nameIsValid === true ? 
        validationPass(nameInputElement) : 
        validationFail(nameInputElement);
    return nameIsValid;
}

/* Helper function to validate email input */
const emailValidator = () => {
	const emailValue = emailAddressInputElement.value.trim();
	// console.log("Email value is: ", `"${emailValue}"`);
	// From https://emailregex.com/
	const emailIsValid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(emailValue);
	// console.log(`Email validation test on "${emailValue}" evaluates to ${emailIsValid}`);
	emailIsValid === true ?
		validationPass(emailAddressInputElement) :
		validationFail(emailAddressInputElement);
	return emailIsValid;
}

/* Helper function to validate Register for Activities section */
const registerForActivitiesValidator = () => {
    const registerForActivitiesSectionIsValid = totalCost > 0;
    // console.log(`Register for Activities section validation test evaluates to ${registerForActivitiesSectionIsValid}`);
    registerForActivitiesSectionIsValid === true ?
        validationPass(activitiesTotalCostHTML) :
        validationFail(activitiesTotalCostHTML);
    return registerForActivitiesSectionIsValid;
}

/* Helper function to validate a creadit card number */
const creditCardNumberValidator = () => {
	const ccNumValue = +ccNumInputElement.value.trim();
	// console.log("Credit Card number value is: ",`"${ccNumValue}"`);
	// From https://www.geeksforgeeks.org/how-to-validate-visa-card-number-using-regular-expression/
	const ccNumIsValid = /^\d{13,16}$/.test(ccNumValue);
	// console.log(`Credit Card number validation test on "${ccNumValue}" evaluates to ${ccNumIsValid}`)
	ccNumIsValid === true ?
		validationPass(ccNumInputElement) :
		validationFail(ccNumInputElement);
	return ccNumIsValid;
}

/* Helper function to validate Zip Code input */
const zipCodeValidator = () => {
	const zipCodeValue = +zipInputElement.value.trim();
	// console.log("Zip Code value is: ", `"${zipCodeValue}"`);
	const zipCodeIsValid = /^\d{5}(-\d{4})?$/.test(zipCodeValue);
	// console.log(`Zip Code validation test on "${zipCodeValue}" evaluates to ${zipCodeIsValid}`);
	zipCodeIsValid === true ?
		validationPass(zipInputElement) :
		validationFail(zipInputElement);
	return zipCodeIsValid;
}

/* Helper function to validate CVV input */
const cvvValidator = () => {
    const cvvValue = +cvvInputElement.value.trim();
    // console.log("CVV value is: ", `"${cvvValue}"`);
    const cvvIsValid = /^\d{3}$/.test(cvvValue);
    //  console.log(`CVV validation test on "${cvvValue}" evaluates to ${cvvIsValid}`);
    cvvIsValid === true ?
        validationPass(cvvInputElement) :
        validationFail(cvvInputElement);
    return cvvIsValid;
}

// Validate fields as users enter information
// I used https://codebeautify.org/jsviewer and minified this codeblock
nameInputElement.addEventListener('keyup', nameValidator), 
    emailAddressInputElement.addEventListener('keyup', emailValidator),
    activitiesFieldSetElement.addEventListener('change', registerForActivitiesValidator),
    ccNumInputElement.addEventListener('keyup', creditCardNumberValidator), 
    zipInputElement.addEventListener('keyup', zipCodeValidator), 
    cvvInputElement.addEventListener('keyup', cvvValidator);

// The form only submits and refreshes if all the required fiedls are valid
formElement.addEventListener('submit', e => {
    // e.preventDefault();
    // I used https://codebeautify.org/jsviewer and minified this codeblock
    nameValidator() || e.preventDefault();
    emailValidator() || e.preventDefault();
    registerForActivitiesValidator() || e.preventDefault();
    // console.log(ccNumPaymentMethod.getAttribute('selected'));
    'true' === ccNumPaymentMethod.getAttribute('selected') && 
        (creditCardNumberValidator() || e.preventDefault(), 
        zipCodeValidator() || e.preventDefault(), 
        cvvValidator() || e.preventDefault());
});

/* Accessibility */
// From FSJS Project 3 Warm Ups - Checkboxes
// Adds a higlight around the section that was clicked
[...document.querySelectorAll('#activities input')].forEach(cb => {
    cb.addEventListener('focus', e => cb.parentElement.classList.add('focus'));
  
    cb.addEventListener('blur', e => {
      const active = document.querySelector('.focus');
      if (active) active.classList.remove('focus');
    })
});