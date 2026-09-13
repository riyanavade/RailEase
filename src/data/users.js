export const mockAdminUser = {
  id: 'admin_1',
  name: 'System Admin',
  email: 'admin@railease.com',
  role: 'admin',
  password: 'password123', // In a real app, this would be hashed
  avatar: 'https://ui-avatars.com/api/?name=System+Admin&background=0D8ABC&color=fff'
};

export const mockRegularUser = {
  id: 'user_1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  password: 'password123',
  phone: '9876543210',
  gender: 'Male',
  dob: '1990-05-15',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=3B82F6&color=fff',
  preferences: {
    meal: 'Veg',
    berth: 'Lower'
  }
};

export const users = [mockAdminUser, mockRegularUser];

export const authenticateUser = (email, password) => {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};
