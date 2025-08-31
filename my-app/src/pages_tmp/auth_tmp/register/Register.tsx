import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../services/firebaseConnection';
import '../auth.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  async function register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email !== '' && password !== '' && confirmPassword !== '') {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/', { replace: true });
        })
        .catch((err) => {
          console.log('error: ' + err);
        });
    } else {
      alert('fill the fields');
    }
  }

  return (
    <div className="login-register h-100">
      <div className="d-flex align-items-center justify-content-center h-100">
        <main className="m-3 text-light p-3 border rounded shadow">
          <h1 className="text-center mb-4">Register</h1>
          <form onSubmit={register}>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputConfirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputConfirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary m-3">
                Register
              </button>
              <p className="m-0">
                Already registered? <Link to={"/login"}>Login</Link>
              </p>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
