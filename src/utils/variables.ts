const { env } = process as { env: { [key: string]: string } };

export const {
  MONGODB_URI,
  MAILTRAP_USER,
  MAILTRAP_PASSWORD,
  MAILTRAP_VERIFICATION_EMAIL,
} = env;
