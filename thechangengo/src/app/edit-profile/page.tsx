'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface ProfileFormData {
  firstname: string;
  middlename?: string;
  lastname: string;
  title: string;
  username: string;
  newPassword?: string;
  confirmNewPassword?: string;
  dob: string;
  email: string;
  phone: string;
}

export default function EditProfilePage() {
  const [currentProfileData, setCurrentProfileData] = useState<ProfileFormData>({
    firstname: '',
    middlename: '',
    lastname: '',
    title: '',
    username: '',
    newPassword: '',
    confirmNewPassword: '',
    dob: '',
    email: '',
    phone: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter()

  const { register, handleSubmit, formState: { errors }, reset, watch, getValues } = useForm<ProfileFormData>({
    defaultValues: currentProfileData
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setIsFetching(true);
      setError('');
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const MOCK_USER_DATA: ProfileFormData = {
          firstname: 'Aisha',
          middlename: '',
          lastname: 'Khan',
          title: 'Ms.',
          username: 'aishak',
          dob: '1992-05-15',
          email: 'aisha.khan@example.com',
          phone: '919876543210',
          newPassword: '',
          confirmNewPassword: '',
        };
        setCurrentProfileData(MOCK_USER_DATA);
        reset(MOCK_USER_DATA);
      } catch (err) {
        setError('Failed to load profile data.');
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserData();
  }, [reset]);

  const handlePhoneChange = (value: string) => {
    setCurrentProfileData(prev => ({ ...prev, phone: value }));
    // If you want react-hook-form to also be aware of this change immediately:
    // setValue('phone', value, { shouldValidate: true, shouldDirty: true });
    // However, for PhoneInput, it's often managed slightly outside typical RHF and merged on submit
  }

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    setIsLoading(true);
    setError('');

    const { newPassword, confirmNewPassword, ...restOfData } = data;

    const payload: Partial<ProfileFormData> = {
      ...restOfData,
      phone: currentProfileData.phone, // Ensure phone from state is used
    };

    if (newPassword) {
      if (newPassword !== confirmNewPassword) {
        setError('New passwords do not match.');
        setIsLoading(false);
        return;
      }
      payload.newPassword = newPassword;
    }

    console.log('Submitting updated profile:', payload);
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // router.push('/profile'); // Navigate on success
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <p className="text-lg text-gray-700">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Edit Profile</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstname"
                autoComplete="given-name"
                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 ${errors.firstname ? 'border-red-500' : 'border-gray-300'}`}
                {...register('firstname', { required: 'First name is required' })}
              />
              {errors.firstname && <p className="mt-1 text-xs text-red-600">{errors.firstname.message}</p>}
            </div>
            <div>
              <label htmlFor="middlename" className="block text-sm font-medium text-gray-700">Middle Name (Optional)</label>
              <input
                type="text"
                id="middlename"
                autoComplete="additional-name"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                {...register('middlename')}
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastname"
                autoComplete="family-name"
                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 ${errors.lastname ? 'border-red-500' : 'border-gray-300'}`}
                {...register('lastname', { required: 'Last name is required' })}
              />
              {errors.lastname && <p className="mt-1 text-xs text-red-600">{errors.lastname.message}</p>}
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                autoComplete="honorific-prefix"
                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                autoComplete="username"
                disabled
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 bg-gray-100 cursor-not-allowed focus:outline-none focus:ring-green-500 focus:border-green-500"
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password (optional)</label>
              <input
                type="password"
                id="newPassword"
                autoComplete="new-password"
                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
                {...register('newPassword', {
                  minLength: {
                    value: watch('newPassword') ? 8 : 0,
                    message: 'Password must be at least 8 characters'
                  }
                })}
              />
              {errors.newPassword && <p className="mt-1 text-xs text-red-600">{errors.newPassword.message}</p>}
            </div>
            <div>
              <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                id="confirmNewPassword"
                autoComplete="new-password"
                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 ${errors.confirmNewPassword ? 'border-red-500' : 'border-gray-300'}`}
                {...register('confirmNewPassword', {
                  validate: value =>
                    !getValues('newPassword') || value === getValues('newPassword') || 'Passwords do not match'
                })}
              />
              {errors.confirmNewPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmNewPassword.message}</p>}
            </div>
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                id="dob"
                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
                {...register('dob', { required: 'Date of birth is required' })}
              />
              {errors.dob && <p className="mt-1 text-xs text-red-600">{errors.dob.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <PhoneInput
                country="IN"
                value={currentProfileData.phone}
                onChange={handlePhoneChange}
                inputProps={{
                  name: 'phone',
                  id: 'phone',
                  required: true,
                }}
                inputStyle={{ width: '100%', height: '42px', borderRadius: '0.375rem', borderColor: errors.phone ? '#EF4444' : '#D1D5DB', paddingLeft: '48px' }}
                containerStyle={{ width: '100%' }}

              />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
            </div>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}