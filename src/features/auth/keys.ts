export const authKeys = {
  all: ['auth'] as const,
  authUser: ['auth', 'user'] as const,
  updateAuthUser: ['auth', 'update-user'] as const,
  requestPasswordReset: ['auth', 'request-password-reset'] as const,
  resetPassword: ['auth', 'reset-password'] as const,
  signInEmail: ['auth', 'sign-in-email'] as const,
  signInSocial: ['auth', 'sign-in-social'] as const,
  signUpEmail: ['auth', 'sign-up-email'] as const,
  signOut: ['auth', 'sign-out'] as const,
  changePassword: ['auth', 'change-password'] as const,
}
