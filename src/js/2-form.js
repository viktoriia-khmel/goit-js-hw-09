'use strict';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

const formData = {
  email: '',
  message: '',
};

form.addEventListener('submit', handleFormSubmit);
form.addEventListener('input', handleFormInput);

const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)) || '';
};

const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email || '';
    formData.message = parsedData.message || '';
    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  }
};

function handleFormSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);

  event.currentTarget.reset();
  formData.email = '';
  formData.message = '';
}

function handleFormInput(event) {
  formData[event.target.name] = event.target.value.trim();
  saveToLocalStorage();
}

document.addEventListener('DOMContentLoaded', loadFromLocalStorage);
