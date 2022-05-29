import ContactItem from './ContactItem/ContactItem';
import s from './ContactList.module.css';
import { useFetchContactsQuery } from 'redux/contacts/contactsApi';
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/contacts/contact-selectors';

export default function ContactList() {
   const { data, error, isLoading } = useFetchContactsQuery();
   const filter = useSelector(getFilter);

   const getVisibleContacts =
      data &&
      data.filter(contact =>
         contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      );
   return (
      <div>
         {error ? (
            <h2>{error.data}</h2>
         ) : isLoading ? (
            <h2>Loadong...</h2>
         ) : getVisibleContacts?.length ? (
            <ul className={s.list}>
               {getVisibleContacts.map(({ id, name, phone }) => (
                  <ContactItem key={id} id={id} name={name} number={phone} />
               ))}
            </ul>
         ) : (
            <h2>No contacts</h2>
         )}
      </div>
   );
}
