interface InterfaceUser {
  username: string;
  email: string;
  password: string;
}

interface InterfaceUserUpdate {
  username: string;
  email: string;
}

interface InterfaceUserReturnResult { 
  id: string;
  username: string;
  email: string;
}

export { InterfaceUser, InterfaceUserUpdate, InterfaceUserReturnResult };
