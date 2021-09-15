import './App.css';
import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Users from './components/Users';
import axios from 'axios';
import FormSchema from './validation/FormSchema';
import * as yup from 'yup';

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  termsOfService: false,
}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
}

const initialUsers = []
const initialDisabled = true

function App() {

  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
        console.log(res.data);
        setUsers(res.data.data);
      }).catch(err => console.log(err))
  }

  const postNewUser = newUsers => {
    axios.post('https://reqres.in/api/users', newUsers)
      .then(res => {
        setUsers([res.data, ...users]);
        setFormValues(initialFormValues);
      }).catch(err => {
        console.log(err);
        setFormValues(initialFormValues);
      })
  }

  const validate = (name, value) => {
    yup.reach(FormSchema, name)
      .validate(value)
      .then(() => setFormErrors({...formErrors, [name]: ''}))
      .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
  }

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newUsers = {
    name: formValues.name.trim(),
    email: formValues.email.trim(),
    password: formValues.password.trim(),
    termsOfService: formValues.termsOfService,
    }

    postNewUser(newUsers);
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    FormSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className="App">
      <header><h1>Users App</h1></header>

<Form
  values={formValues}
  change={inputChange}
  submit={formSubmit}
  disabled={disabled}
  errors={formErrors}
/>

{users.map((user) => {
    return (
      <Users key={user.id} details={user} />
    )
  })
}
    </div>
  );
}

export default App;
