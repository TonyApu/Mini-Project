import React, {useState} from 'react';
import * as userServices from '../services/user-services';

export const UserApiContext = React.createContext();

const BookDataContext = props => {
  const [currentUser, setCurrentUser] = useState();
  const [isLogout, setLogout] = useState(false);

  const login = async account => {
    const result = await userServices.login(account);
    console.log('account: ' + result);
    console.log('user: ' + currentUser);
    if (result) {
      setLogout(false);
      setCurrentUser(result);           
    } else {setCurrentUser(result)};
    
  };

  const logout =  () => {
    setLogout(true);
  }

  return (
    <UserApiContext.Provider value={[currentUser,isLogout ,login, logout]}>
      {props.children}
    </UserApiContext.Provider>
  );
};

export default BookDataContext;
