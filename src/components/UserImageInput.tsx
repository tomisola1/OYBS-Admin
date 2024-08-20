import React, { useRef, useState } from 'react'
import { ImageIcon } from '../../public/assets/icons';
import Image from 'next/image';

interface FileProps {
	defaultVal?: string;
	onImageSelect: (file: any) => void;
    name: string;
    preview: string;
    required?: boolean;
    error?: string;
}

const UserImageInput = ({ onImageSelect, defaultVal, name, preview, required=false, error }: FileProps) => {
    const [previewImage, setPreviewImage] = useState<any>(defaultVal);
	const fileRef = useRef<any>(null);

   const handleClick = () => {   
		fileRef?.current?.click();
	};
  return (
    <div className='h-auto py-[14px] px-4 mb-9'>
        {(preview||defaultVal) ?  (
            <div className='flex flex-col items-center text-[#75838D] gap-[15px]'>
                <span className='border border-[#EFEFEF] w-[101px] h-[102px] rounded-full cursor-pointer' onClick={handleClick}><img src={preview||defaultVal} alt='upload-icon' className='w-full h-full rounded-full cursor-pointer' /></span>
                <p className='text-red-600 text-xs font-light'>{error}</p>   
                <p className='leading-6'><span className='text-primary underline cursor-pointer' onClick={handleClick}>Click to upload</span> the image of the user</p>
            </div>
            ):(
            <div className='flex flex-col items-center text-[#75838D] gap-[15px]'>
                <span className='border border-[#EFEFEF] w-[101px] h-[102px] p-8 rounded-full cursor-pointer' onClick={handleClick}><Image src={"/assets/upload_icon.svg"|| preview} alt='upload-icon' height={36} width={36} /></span>  
                <p className='leading-6'><span className='text-primary underline cursor-pointer' onClick={handleClick}>Click to upload</span> the image of the user</p>
            </div>
            )
        }
        <input
            name={name}
            ref={fileRef}
            type="file"
            id="image-upload"
            accept=".png, .jpg, .jpeg"
            onChange={onImageSelect}
            className='hidden  w-1 h-1'
            required={required}
        />
    </div>
  )
}

export default UserImageInput