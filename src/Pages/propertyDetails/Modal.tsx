

type propTypes={
    open :boolean;
    onClose:()=>void;
    children:React.ReactNode;
}
const Modal :React.FC<propTypes> = ({open,onClose,children}) => {




    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center
         items-center transition-colors ${open? "visible bg-black/20": "invisible "}`}>
            <div className={`bg-white rounded-lg 
            shadow p-6 transition-all max-w-screen-md ${open?
             "scale-100 opacity-100":"scale-110 opacity-0 "}`} onClick={(e)=>{e.stopPropagation()}}>
<button onClick={onClose} className='absolute top-2 right-2 py-1 px-2 border
 border-neutral-200 rounded-md text-gray-400
  bg-white hover:bg-gray-600 '>X</button>
  {children}
            </div>
         </div>
    );
};

export default Modal;