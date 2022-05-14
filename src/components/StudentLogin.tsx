import * as React from 'react'
import { Dispatch } from "redux"

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/combine';
import { getRecords, logout } from '../store/getRecords';


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const Login: React.FC<any> = () => {

  const dispatch: Dispatch<any> = useDispatch()

  const [name, setLogin] = React.useState("");

  const { records, loading, error } = useTypedSelector((state) => state.records);
  let data = Object.entries(records);
  let user = localStorage.getItem('user');
  
 //login
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
     await dispatch(getRecords(name));
  }
//logout
  const logoutHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
     await dispatch(logout());
  }
  //console.log(user)
  if(user){
    //dispatch(getRecords(user));
    
  }
  return (
    
    <div>
      <div>
     { user ?
    <form onSubmit={logoutHandler} className='Add'>
      <button>Logout</button>
    </form>:''
    }
  </div>
  <div>
  { !user ?
    <form onSubmit={onSubmitHandler} className='Add'>
      <input
        type='text'
        id='name'
        value={name}
        placeholder='Enter Name'
        onChange={(e) => setLogin(e.target.value)}
        
      />

      <button disabled={name === undefined ? true : false}>Login</button>
    </form>:''
}
    </div>
    </div>
    
    
  )
}
