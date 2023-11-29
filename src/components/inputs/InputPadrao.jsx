export default function InputPadrao({ labelName, inputName, inputId, inputPlaceholder, type, classNameLabel, classNameInput, onChange, value, obrigatorio }) {
    return (
        <div className="flex flex-col gap-1 w-full text-black">
            <label htmlFor={inputId} className={`text-[18px] tracking-wide font-medium ${classNameLabel}`}>{labelName}</label>
            <input required={obrigatorio} name={inputName} id={inputId} placeholder={inputPlaceholder} type={type} onChange={onChange} value={value} className={`w-full ${classNameInput}`} />
        </div>
    );
}