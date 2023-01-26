import React, { useState } from 'react';
import './style.css';

const User = ({ user , age , users, setUsers}) => {
  const [isOpen, setIsOpen] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    if(isOpen === false){
      setIsEditMode(false);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    // update user details
    if(editedUser.age < 18) {
      alert("Age should be greater than 18");
      return;
    }
    setUsers({
      ...users,
      ...editedUser,
    })

      setIsEditMode(false);
  };

  const handleCancelClick = () => {
    setEditedUser(user);
    setIsEditMode(false);
  };

  const handleDeleteClick = () => {
    // show confirmation and delete user if confirmed
    const value = window.confirm('Are You Sure! To Delete the item?');
    if(value){
      setUsers({
        ...users,
        ...editedUser,
      })
    }
  };

  const handleFieldChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="user-accordion">
      <div className="user-header" onClick={toggleAccordion}>
        <img src={user.picture} alt='pic' className='image'/>
        <div className="user-name">{user.first} {user.last}</div>
        <div className="accordion-icon">{isOpen ? <i className='fa fa-angle-up'></i> : <i className='fa fa-angle-down'></i>}</div>
      </div>
      {isOpen && (
        <div className="user-details">
          {!isEditMode && (
            <>
              <div className='colum'> 
                <div className="user-data">Age <p className='bold'>{age}</p></div>
                <div className="user-data">Gender <p className='bold'>{user.gender}</p></div>
                <div className="user-data">Country <p className='bold'>{user.country}</p></div>
              </div>
              <div className="user-description"><b>Description : </b>{user.description}</div>
            </>
          )}
          {isEditMode && (
            <>
              <div>
                <label>
                  <p className='text'>Age</p>
                  <input name="age" value={editedUser.age} onChange={handleFieldChange} />
                </label>
              </div>
              <div>
                <label>
                  <p className='text'>Gender</p>
                  <select name="gender" value={editedUser.gender} onChange={handleFieldChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="transgender">Transgender</option>
                    <option value="rather-not-say">Rather not say</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  <p className='text'>Country</p>
                  <input name="country" value={editedUser.country} onChange={handleFieldChange} />
                </label>
              </div>
              <div>
                <label>
                  <p className='text'>Description:</p>
                  <textarea name="description" value={editedUser.description} onChange={handleFieldChange} />
                </label>
              </div>
              <div>
                <button onClick={handleSaveClick} disabled={age === editedUser.age && user.gender === editedUser.gender && user.country === editedUser.country && user.description === editedUser.description}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            </>
          )}
          {!isEditMode && (
            <div className='curd'>
            <span onClick={handleDeleteClick}><i className="fa fa-trash"></i></span>
              <span onClick={handleEditClick} disabled={age < 18}><i className="fa fa-edit"></i></span>
            </div>
          )}
        </div>
      )}
    </div>
  );

}

export default User;
