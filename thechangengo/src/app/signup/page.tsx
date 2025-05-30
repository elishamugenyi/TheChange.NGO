//this if form for user sign up page
 'use client'
 import { useState } from 'react'
 import { useRouter } from 'next/navigation'
 import { useForm } from 'react-hook-form'
 import PhoneInput from 'react-phone-input-2'
 import 'react-phone-input-2/lib/style.css'
 import Navbar from '../components/navbar'
 import Footer from '../components/footer'
 export default function SignupPage() {
    interface formData {
        firstname: string;
        middlename: string;
        lastname: string;
        title: string;
        username: string;
        password: string;
        repeatPassword: string;
        dob: string;
        email: string;
        phone: string;
    }

    const [formData, setFormData] = useState<formData>({
        firstname: '',
        middlename: '',
        lastname: '',
        title: '',
        username: '',
        password: '',
        repeatPassword: '',
        dob: '',
        email: '',
        phone: '',
    })
    

    const handlePhoneChange = (value: string) => {
        setFormData({ ...formData, phone: value })
    }

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm()
    
    const onSubmit = (data: any) => {
        console.log(data);
        // Handle form submission logic here
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <Navbar />
            <div>
                <h2 className="mt-20 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input 
                            type="text" 
                            placeholder="First Name" 
                            id="firstname"
                            autoComplete="firstname"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            {...register('firstname')}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="middlename" className="block text-sm font-medium text-gray-700">Middle Name (Optional)</label>
                        <input 
                            type="text" 
                            placeholder="Middle Name" 
                            id="middlename"
                            autoComplete="middlename"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            {...register('middlename')}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input 
                            type="text" 
                            placeholder="Last Name" 
                            id="lastname"
                            autoComplete="lastname"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            {...register('lastname')}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input 
                            type="text" 
                            placeholder="Title" 
                            id="title"
                            autoComplete="title"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            {...register('title')}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            id="username"
                            autoComplete="username"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            {...register('username')}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            id="password"
                            autoComplete="new-password"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            {...register('password')}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700">Repeat Password</label>
                        <input 
                            type="password" 
                            placeholder="Repeat Password" 
                            id="repeatPassword"
                            autoComplete="new-password"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            {...register('repeatPassword')}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input 
                            type="date" 
                            id="dob"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            {...register('dob')}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            id="email"
                            autoComplete="email"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            {...register('email')}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <PhoneInput
                            country="IN"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            inputStyle={{ width: '100%', height: '38px', borderRadius: '0.375rem', borderColor: '#D1D5DB', paddingLeft: '48px' }}
                            containerStyle={{ width: '100%' }}
                        />
                    </div>
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Sign Up</button>
            </form>
        </div>
        <Footer />
    </div>
    
   );
   
 }
 