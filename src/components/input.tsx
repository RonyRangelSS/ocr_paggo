import { IconType } from "react-icons";


export default function Input(props: {icon: IconType, placeholder: string, style: React.CSSProperties, type: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
    return (
      <div className='flex bg-white w-[80%] h-[45px] items-center rounded-xl border-2 border-[#B0ABAB] '>
        <span className='px-2'>
          <props.icon style={props.style} />
        </span>
        <div className="flex w-full h-full">
          <input  
            type={props.type} 
            placeholder={props.placeholder}
            className="flex w-full h-full rounded-xl outline-none pb-[2px] text-gray-700"
            onChange={props.onChange}
            value={props.value}
          />
        </div>
      </div>
    );
  }