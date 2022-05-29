import PropTypes from 'prop-types';
import s from './ContactItem.module.css';
import sBtn from '../../../App.module.css';
import { useDispatch } from 'react-redux';
import { ContactsOperations } from 'redux/contacts';
import { useState } from 'react';

export default function ContactItem({ id, name, number }) {
   const [changeName, setChangeName] = useState(name);
   const [changeNumber, setChangeNumber] = useState(number);
   const [changeContact, setChangeContact] = useState(false);
   const dispatch = useDispatch();

   const handelChengeContact = () => {
      if (changeContact) {
         dispatch(
            ContactsOperations.changeContact({
               id,
               name: changeName,
               number: changeNumber,
            })
         );
      }
      setChangeContact(!changeContact);
   };

   return (
      <li className={s.item} id={id}>
         {changeContact ? (
            <>
               <input
                  className={s.input}
                  type="name"
                  name="name"
                  value={changeName}
                  placeholder="Name Lastname"
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                  required
                  onChange={e => setChangeName(e.target.value)}
               />
               <input
                  className={s.input}
                  type="tel"
                  name="number"
                  value={changeNumber}
                  placeholder="XXX-XX-XX"
                  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                  required
                  onChange={e => setChangeNumber(e.target.value)}
               />
            </>
         ) : (
            <>
               <span className={s.name}>{changeName}: </span>
               <span>{changeNumber}</span>
            </>
         )}
         <div className={s.BlockButtons}>
            <div className={`${sBtn.btn} ${s.btn} ${s.btnEdit}`}>
               <button type="button" onClick={handelChengeContact}>
                  {changeContact ? 'Edit...' : 'Edit'}
               </button>
            </div>
            <div className={`${sBtn.btn} ${s.btn}`}>
               <button
                  type="button"
                  onClick={() => dispatch(ContactsOperations.deleteContact(id))}
               >
                  Delete
               </button>
            </div>
         </div>
      </li>
   );
}

ContactItem.propType = {
   id: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   number: PropTypes.string.isRequired,
};
