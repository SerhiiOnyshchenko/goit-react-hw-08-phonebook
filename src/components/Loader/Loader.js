import s from './Loader.module.css';

export default function Loader() {
   return (
      <div className={s.BoxLoader}>
         <div className={s.Loader}></div>
      </div>
   );
}
