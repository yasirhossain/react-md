import { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const UserContext = createContext({});
const EventsContext = createContext(null);

export { UserContext, EventsContext };
