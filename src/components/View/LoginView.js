import { useState } from 'react';
import Container from '../Container/Container';
import s from './LoginView.module.css';
import sBtn from '../../App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { AuthOperations } from 'redux/auth';
import { NavLink } from 'react-router-dom';

export default function LoginView() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const dispatch = useDispatch();

   const onSubmitForm = async e => {
      e.preventDefault();
      dispatch(AuthOperations.logIn({ email, password }));
      toast.success(`Login!`);
      setEmail('');
      setPassword('');
   };

   return (
      <Container>
         <h1>Login page</h1>
         <form className={s.form} onSubmit={onSubmitForm}>
            <label className={s.label}>
               Email
               <input
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  required
               />
            </label>
            <label className={s.label}>
               Password
               <input
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  value={password}
                  placeholder="XXXXXXX"
                  minLength={7}
                  required
               />
            </label>
            <div className={sBtn.btn + ' ' + s.btn}>
               <button
                  type="submit"
                  // disabled={isLoading}
               >
                  Login
               </button>
            </div>
            <ToastContainer
               autoClose={3000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
            />
            <NavLink to="/register">To register form.</NavLink>
         </form>
      </Container>
   );
}
