import classes from './newsletter-registration.module.css';
import {useRef, useContext} from 'react';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  
  const notificationCtx = useContext(NotificationContext)

  function registrationHandler(event) {
    event.preventDefault();
    
    const enteredEmail = emailInputRef.current.value;

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter',
      status: 'pending'
    })

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({email: enteredEmail}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if(response.ok) {
        return response.json()
      }
      return response.json().then(data => {
        throw new Error(data.message || 'Something went wrong!')
      })
    })
    .then(data => {
      notificationCtx.showNotification({
        title: 'Success',
        message: 'Successfully registered for newsletter',
        status: 'success'
      })
    })
    .catch(error => {
      notificationCtx.showNotification({
        title: 'Error!',
        message: error.message || 'Something went wrong!',
        status: 'error'
      })
    })    
  }

  return (
    <section className="mb-8 w-3/5 ml-auto mr-auto mt-8">
      <h2 className="text-center font-semibold text-lg mb-4">Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler} className="w-full mb-16">
        <div>
          <input
            className="border h-12 w-4/5 pl-4"
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button className="bg-green-500 w-1/5 h-12 text-white">Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
