'use strict';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

const formData = {
  email: '',
  message: '',
};

populateForm();

form.addEventListener('submit', handleFormSubmit);
form.addEventListener('input', handleFormInput);

function handleFormSubmit(event) {
  event.preventDefault();

  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);

  event.currentTarget.reset();
}

function handleFormInput(event) {
  const value = event.target.value;
  const key = event.target.name;

  let savedData = {};

  try {
    savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (err) {
    console.log(err);
    return;
  }

  if (savedData) {
    formData[key] = value;
  } else {
    formData = {
      [key]: value,
    };
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch (err) {
    console.log(err);
    return;
  }
}

function populateForm() {
  if (!formData) {
    return;
  }

  for (const key in formData) {
    form.elements[key].value = formData[key];
  }
}
