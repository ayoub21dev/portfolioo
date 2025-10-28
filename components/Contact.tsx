import React, { useState } from 'react';
import Section from './Section';
import Footer from './Footer';
import type { PersonalInfo } from '../types';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

// IMPORTANT: Replace with your own Formspree endpoint URL from your Formspree dashboard
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xldogzdz";


interface ContactProps {
  isActive: boolean;
  personalInfo: PersonalInfo;
}

const Contact: React.FC<ContactProps> = ({ isActive, personalInfo }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = {
      name,
      email,
      message,
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFeedbackMessage('Thank you! Your message has been sent successfully.');
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
         const data = await response.json();
         const errorMessage = data.errors?.map((error: any) => error.message).join(', ') || 'Something went wrong. Please try again.';
         setStatus('error');
         setFeedbackMessage(errorMessage);
         setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
       setStatus('error');
       setFeedbackMessage('A network error occurred. Please check your connection and try again.');
       setTimeout(() => setStatus('idle'), 5000);
    }
  };
  
  const getTransitionClass = (delay: number) => 
    `transition-all duration-700 ease-in-out ${isActive ? `opacity-100 translate-y-0 delay-${delay}` : 'opacity-0 translate-y-4'}`;

  const inputClasses = "block w-full rounded-md border border-slate-700 bg-slate-800/20 text-white shadow-sm focus:border-slate-400 focus:ring-slate-400 sm:text-sm p-3 transition-colors";

  return (
     <div id="contact" className="h-full w-full p-4 sm:p-6 md:p-8 flex items-center justify-center">
       <Section>
            <div className="flex-grow overflow-y-auto p-6 md:p-8 lg:p-12">
                <div className="max-w-2xl w-full mx-auto flex-grow flex flex-col justify-center">
                    <div className={`mb-8 md:mb-12 text-center ${getTransitionClass(300)}`}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white inline-block">
                            Get In Touch
                        </h2>
                        <div className="h-1 w-20 bg-blue-500 mt-4 mx-auto"></div>
                    </div>
                    <p className={`text-center text-base sm:text-lg text-slate-400 mb-8 sm:mb-10 ${getTransitionClass(500)}`}>
                        Have a project in mind or just want to say hello? Drop me a line!
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                    <div className={getTransitionClass(600)}>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                        Name
                        </label>
                        <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClasses}
                        placeholder="John Doe"
                        required
                        />
                    </div>
                    <div className={getTransitionClass(700)}>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                        Email
                        </label>
                        <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClasses}
                        placeholder="you@example.com"
                        required
                        />
                    </div>
                    <div className={getTransitionClass(800)}>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">
                        Message
                        </label>
                        <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={inputClasses}
                        placeholder="Your message here..."
                        required
                        />
                    </div>
                    <div className={getTransitionClass(900)}>
                        <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full bg-slate-100 text-black py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                        {status === 'submitting' ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                    </form>
                    {status !== 'idle' && (
                    <div className={`mt-6 text-center text-sm transition-opacity duration-300 ${status === 'success' ? 'text-green-400' : ''} ${status === 'error' ? 'text-red-400' : ''}`}>
                        {feedbackMessage}
                    </div>
                    )}
                </div>
            </div>
            <Footer className={getTransitionClass(1000)} personalInfo={personalInfo} />
       </Section>
    </div>
  );
};

export default Contact;