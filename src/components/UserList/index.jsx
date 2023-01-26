import React,{useEffect, useState} from 'react';
import User from '../user';
import './style.css';

// json data
const UsersList = () => {
  const [users , setUsers] = useState();
  //   search user
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(users);

  useEffect(() => {
    fetch('http://localhost:8000/celebrities')
      .then((response) => response.json())
      .then((data) => {
        const updatedUsers = data.map((user) => {
          const age = calculateAge(user.dob);
          return { ...user, age };
        });
        setUsers(updatedUsers);
        setSearchResults(updatedUsers);
      });
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    const filteredUsers = users.filter(user => user.first.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(filteredUsers);
  }

  const calculateAge = (dob) => {
    // code to calculate age from dob
    const date = new Date(dob);
    const diff = Date.now() - new Date(dob);
    const age = new Date(diff);
    return Math.abs(age.getUTCFullYear() - date.getUTCFullYear());
  };

  return (
    <>
        <div className="users-list">
        <div className='search'>
            <input type="search" onChange={handleSearch} placeholder="Search User..." id='search-input'/>
        </div>
        {(searchResults) ? searchResults.map((u) => (
            <User key={u.id} user={u} users={users} setUsers={setUsers} age={calculateAge(u.dob)}/>
        )) : null}
        </div>
    </>
  );
};

export default UsersList;