export interface AdminCredentials {
  email: string;
  password: string;
}

const DEFAULT_ADMIN: AdminCredentials = {
  email: 'nicholasgabriel12530@gmail.com',
  password: 'Nick@2003',
};

const STORAGE_KEY = 'marenyo_admin_credentials';

export function getAdminCredentials(): AdminCredentials {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    /* use default */
  }
  return { ...DEFAULT_ADMIN };
}

export function saveAdminCredentials(creds: AdminCredentials): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(creds));
}

export function validateAdminLogin(email: string, password: string): boolean {
  const creds = getAdminCredentials();
  return (
    email.trim().toLowerCase() === creds.email.trim().toLowerCase() &&
    password === creds.password
  );
}

export function updateAdminCredentials(
  currentPassword: string,
  newEmail: string,
  newPassword: string
): { success: boolean; error?: string } {
  const creds = getAdminCredentials();

  if (currentPassword !== creds.password) {
    return { success: false, error: 'Current password is incorrect.' };
  }

  if (!newEmail.trim()) {
    return { success: false, error: 'Email address is required.' };
  }

  if (newPassword.length < 6) {
    return { success: false, error: 'New password must be at least 6 characters.' };
  }

  saveAdminCredentials({ email: newEmail.trim().toLowerCase(), password: newPassword });
  return { success: true };
}
