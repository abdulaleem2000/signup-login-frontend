import React, { useState } from 'react';
import styles from './login.module.scss';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const form = e.currentTarget;

      const email = form.elements.namedItem('email') as HTMLInputElement;
      const password = form.elements.namedItem('password') as HTMLInputElement;

      const data = {
        email: email.value,
        password: password.value,
      };

      const response = await axios.post(
        'http://localhost:3000/api/login',
        data
      );

      if (response.status === 200) {
        const userData = response.data;
        localStorage.setItem('token', userData.token);
        toast.success('Login successful');
        navigate('/dash-board');
      } else {
        console.log(response.data.error);
        throw new Error(response.data.error);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    // <div className={styles['container']}>
    <div className={styles.formContainer}>
      <Toaster />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            //value={email}
            //  onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            //value={password}
            // onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">Not User Signup</Link>
    </div>

    // </div>
  );
}

export default Login;
