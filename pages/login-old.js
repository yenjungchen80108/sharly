import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { yupResolver } from 'react-hook-form-resolvers';
import * as Yup from 'yup';
import { userService } from '../services';
import React from 'react';
import Nav from '../components-old/Nav';
import styles from '../styles/Home.module.css';
// import { PrimaryButton } from '../components/FormElements/Button';
// import Input from '../components/FormElements/Input';

export default function Login() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
      // redirect to home if already logged in
      if (userService.userValue) {
          router.push('/');
      }
  }, []);

  // form validation rules 
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ username, password }) {
    return userService.login(username, password)
    .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl = router.query.returnUrl || '/';
        router.push(returnUrl);
    })
    .catch((error) => {
      return setError({ message: error });
    });
  }

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   // reset error and message
  //   setError('');
  //   setMessage('');

  //   // fields check
  //   if (!email || !password) return setError('All fields are required');

  //   // login structure
  //   let login = {
  //     email,
  //     password
  //   };
  //   let response = await fetch('/api/login', {
  //       method: 'POST',
  //       body: JSON.stringify(login),
  //   });

  //   // get the data
  //   let data = await response.json();

  //   if (data.success) {
  //       // todo: direct to home page
  //       return setMessage(data.message);
  //   } else {
  //       // set the error
  //       return setError(data.message);
  //   }
  // };

  const classes = {
    pageBody: 'h-screen flex bg-gray-bg1',
    formContainerLeft: 'w-1/2 max-w-md m-auto bg-white object-bottom',
    formContainerRight: 'w-1/2 max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16',
    formHeading: 'text-2xl  font-medium text-primary mt-4 mb-12 text-center',
    btnContainer: 'flex justify-center items-center mt-6',
    submitBtn:'bg-pink-500 hover:bg-pink-400 text-white font-bold py-2 px-4 border-b-4 border-pink-700 hover:border-pink-500 rounded'
  };

  return (
    <div>
        <Nav/>
        <div className={classes.pageBody}>
            <div className="h-32 md:h-auto md:w-1/2">
                {/* <img
                  className="object-cover w-full h-full" 
                  src="/jpg/village.jpg"
                  alt="img" /> */}
            </div>
            <div className={classes.formContainerRight}>
                <h1 className={classes.formHeading}>
                 {t('LOGIN.TITLE')} 🔐
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {errors.apiError &&
                    <div className={styles.formItem}>{errors.apiError?.message}</div>
                  }
                    {/* {error ? (
                      <div className={styles.formItem}>
                          <h3 className={styles.error}>{error}</h3>
                      </div>
                    ) : null}
                    {message ? (
                      <div className={styles.formItem}>
                          <h3 className={styles.message}>{message}</h3>
                      </div>
                    ) : null} */}
                    <div className={styles.formItem}>
                      <label>{t('LOGIN.EMAIL')}</label>
                      <input
                        id='username'
                        type='text'
                        {...register('username')}
                        // onChange={(e) => setEmail(e.target.value)}
                        // value={email}
                        placeholder={t('COMMON.PLACEHOLDER')}
                      />
                      <div>{errors.username?.message}</div>
                    </div>
                    <div className={styles.formItem}>
                      <label>{t('LOGIN.PASSWORD')}</label>
                      <input
                        id='password'
                        type='password'
                        {...register('password')} 
                        // onChange={(e) => setPassword(e.target.value)}
                        // value={password}
                        placeholder={t('COMMON.PLACEHOLDER')}
                      />
                      <div>{errors.password?.message}</div>
                    </div>
                    <div className={classes.btnContainer}>
                      <button type='submit' className={classes.submitBtn}>
                        {t('LOGIN.SUBMIT')}
                      </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}