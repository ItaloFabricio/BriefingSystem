
type Props = {
    isVisible: boolean;
    onClose: VoidFunction;
    children: React.ReactNode;
}

export const Modal = ({ isVisible, onClose, children }: Props) => {
    if (!isVisible) return null;

    

    return (
       <div id="wrapper" className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
         <div   className="w-[600px] flex flex-col ">
            <button onClick={onClose} className="place-self-end rounded-md border border-gray-200 p-2 dark:bg-gray-800 dark:border-gray-700">X</button>
            <div className="dark:bg-gray-700 p-2 rounded font-normal text-gray-700 dark:text-gray-800 ">
                {children}
            </div>
         </div>
       </div>
    )
};
