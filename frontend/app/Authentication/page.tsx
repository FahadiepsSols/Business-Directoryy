'use client';

//import { SignUp } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function CustomSignUpPage() {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const [role, setRole] = useState('');

  useEffect(() => {
    const setRoleMetadata = async () => {
      if (isSignedIn && user && role) {
        try {
          await user.update({
            unsafeMetadata: {
              role: role,
            },
          });
          router.push('/');
        } catch (err) {
          console.error('Error updating user metadata:', err);
        }
      }
    };

    setRoleMetadata();
  }, [isSignedIn, user, role]);

  return (
    <div className="flex flex-col items-center mt-10 space-y-6">
      <h2 className="text-2xl font-semibold">Choose Your Role</h2>
      <div className="flex gap-4">
        <button
          onClick={() => setRole('business-owner')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          I'm a Business Owner
        </button>
        <button
          onClick={() => setRole('customer')}
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
        >
          I'm a Customer
        </button>
      </div>

      {/* {!isSignedIn && (
        <div className="w-full max-w-md mt-10">
          <SignUp path="/Authentication" routing="path" />
        </div>
      )} */}
    </div>
  );
}
