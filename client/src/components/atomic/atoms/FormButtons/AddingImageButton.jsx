import './Button.css'

export const AddingImageButtonAtom = ({ label, onClick, className='button' }) => {
    return <button type='button' className={className} onClick={onClick}>{label}</button>;
};