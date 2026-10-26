export function handleFirebaseAuthErrors(errorCode: string) : string{
  switch (errorCode) {
    case 'auth/email-already-exists' :
    case 'auth/email-already-in-use' :
      return 'email already exists'
    case 'auth/internal-error':
      return 'internal error'
    case 'auth/invalid-credential':
      return 'invalid credential'
    case 'auth/invalid-email':  
      return 'invalid email'
    case 'auth/invalid-password':
      return 'invalid password'
    default:
      return 'Something went wrong'
  }
}