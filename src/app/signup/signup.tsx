import styles from './signup.module.scss';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface SignupProps {}

export function Signup(props: SignupProps) {
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const form = e.currentTarget;

      const email = form.elements.namedItem('email') as HTMLInputElement;
      const password = form.elements.namedItem('password') as HTMLInputElement;
      const name = form.elements.namedItem('name') as HTMLInputElement;

      const data = {
        name: name.value,
        email: email.value,
        password: password.value,
      };

      const response = await axios.post(
        'http://localhost:3000/api/signup',
        data
      );

      if (response.status === 200) {
        const userData = response.data;
        localStorage.setItem('token', userData.token);
        toast.success('User Created');
        navigate('/');
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
    <div className={styles.formContainer}>
      <Toaster />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" required />
        </div>
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
        <div className="formGroup">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            //value={password}
            // onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <Link to="/">Already User Login</Link>
    </div>
  );
}

export default Signup;
