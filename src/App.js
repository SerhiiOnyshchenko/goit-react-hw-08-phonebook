import Filter from 'components/Filter/Filter';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import s from 'App.module.css';

export default function App() {
   return (
      <div className={s.main}>
         <h1>Phonebook</h1>
         <ContactForm />
         <h2>Contacts</h2>
         <Filter />
         <ContactList />
      </div>
   );
}
