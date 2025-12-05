# Firebase Authentication Integration Guide

## Overview
Firebase Authentication has been successfully integrated into your Isam Auto project. This guide explains the implementation and how to use the authentication features.

## What's Been Implemented

### 1. **Authentication Provider** (`src/providers/AuthProvider.jsx`)
The AuthProvider now uses Firebase Authentication with the following features:

#### Available Methods:
- **`createUser(email, password)`** - Register new users with email and password
- **`signInUser(email, password)`** - Sign in existing users
- **`signInWithGoogle()`** - Sign in with Google account
- **`updateUserProfile(name, photo)`** - Update user profile information
- **`resetPassword(email)`** - Send password reset email
- **`logOut()`** - Sign out current user

#### Context Values:
- **`user`** - Current authenticated user object (null if not logged in)
- **`loading`** - Boolean indicating authentication state loading

### 2. **Login Component** (`src/components/modals/Login.jsx`)
Updated with:
- Email/password login
- Google Sign-In button
- Link to registration page
- Error handling with SweetAlert2

### 3. **Register Component** (`src/components/modals/Register.jsx`)
New component with:
- Full name, email, and password fields
- Password confirmation
- Password validation (minimum 6 characters)
- Google Sign-Up option
- Link back to login page

### 4. **Private Route** (`src/routes/PrivateRoute.jsx`)
Simplified route protection that:
- Checks if user is authenticated
- Shows loading state while checking auth
- Redirects to login if not authenticated

### 5. **User Profile Component** (`src/components/common/UserProfile.jsx`)
A reusable component that displays:
- Login/Register buttons for non-authenticated users
- User avatar and name for authenticated users
- Dropdown menu with user info and logout option

### 6. **Routes Added** (`src/App.jsx`)
- `/login` - Login page
- `/register` - Registration page

## How to Use

### 1. **Accessing the User in Components**

```jsx
import { useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';

function MyComponent() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <div>Welcome, {user.displayName || user.email}!</div>;
  }

  return <div>Please login</div>;
}
```

### 2. **Protecting Routes**

Wrap any route that requires authentication with `PrivateRoute`:

```jsx
import PrivateRoute from '@/routes/PrivateRoute';

// In your App.jsx or route configuration:
<Route 
  path="dashboard" 
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  } 
/>
```

### 3. **Adding User Profile to Header**

Import and use the UserProfile component in your header:

```jsx
import UserProfile from '@/components/common/UserProfile';

// In your header component:
<UserProfile />
```

### 4. **Creating a New User**

```jsx
import { useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';

function RegisterComponent() {
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const handleRegister = async (email, password, name) => {
    try {
      await createUser(email, password);
      await updateUserProfile(name, ''); // Update with name
      // Success!
    } catch (error) {
      console.error(error);
    }
  };
}
```

### 5. **Password Reset**

```jsx
import { useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';

function ForgotPassword() {
  const { resetPassword } = useContext(AuthContext);

  const handleReset = async (email) => {
    try {
      await resetPassword(email);
      alert('Password reset email sent!');
    } catch (error) {
      console.error(error);
    }
  };
}
```

## User Object Properties

When a user is authenticated, the `user` object contains:

```javascript
{
  uid: "unique-user-id",
  email: "user@example.com",
  displayName: "User Name",
  photoURL: "https://...",
  emailVerified: true/false,
  // ... other Firebase user properties
}
```

## Firebase Configuration

Your Firebase configuration is in `src/config/firebase.init.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "isam-auto.firebaseapp.com",
  projectId: "isam-auto",
  storageBucket: "isam-auto.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

⚠️ **Security Note**: Consider moving these credentials to environment variables in production:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ... etc
};
```

## Setting Up Firebase Console

### 1. **Enable Authentication Methods**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (isam-auto)
3. Navigate to Authentication > Sign-in method
4. Enable:
   - Email/Password
   - Google

### 2. **Configure Google Sign-In**
1. In the Google provider settings, add authorized domains
2. Add your production domain and localhost for development

### 3. **Email Templates**
Customize email templates in Authentication > Templates:
- Password reset
- Email address verification
- Email address change

## Additional Features to Implement

### 1. **Email Verification**

```jsx
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '@/config/firebase.init';

const sendVerification = async () => {
  await sendEmailVerification(auth.currentUser);
};
```

### 2. **Phone Authentication**

Enable Phone authentication in Firebase Console and use:

```jsx
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from 'firebase/auth';
```

### 3. **Social Providers**

Add Facebook, Twitter, GitHub, etc.:

```jsx
import { 
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup 
} from 'firebase/auth';
```

### 4. **Persist User Sessions**

Firebase automatically persists sessions. To customize:

```jsx
import { setPersistence, browserLocalPersistence } from 'firebase/auth';

setPersistence(auth, browserLocalPersistence);
```

## Testing

### Test Users
Create test accounts in Firebase Console > Authentication > Users

### Test in Development
1. Start your dev server: `npm run dev`
2. Navigate to `/register` to create an account
3. Navigate to `/login` to sign in
4. Test Google Sign-In functionality

## Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/unauthorized-domain)"**
   - Add your domain to authorized domains in Firebase Console

2. **"Firebase: Error (auth/invalid-api-key)"**
   - Check your Firebase configuration in `firebase.init.js`

3. **Google Sign-In popup blocked**
   - Ensure popups are allowed in browser
   - Check Firebase Console settings

4. **User is null after refresh**
   - The `onAuthStateChanged` listener handles this automatically
   - Make sure AuthProvider wraps your entire app

## Security Best Practices

1. **Environment Variables**: Store Firebase config in `.env` files
2. **Firebase Security Rules**: Set up proper Firestore/Storage rules
3. **Email Verification**: Require email verification before access
4. **Password Strength**: Enforce strong password requirements
5. **Rate Limiting**: Enable in Firebase Console to prevent abuse

## Next Steps

1. Add email verification requirement
2. Implement password strength requirements
3. Add user profile management page
4. Set up Firebase Firestore for user data storage
5. Implement role-based access control
6. Add social media authentication providers
7. Set up Firebase Analytics

## Support

For Firebase documentation: https://firebase.google.com/docs/auth
For issues: Check the Firebase Console > Authentication logs
