import React, { useRef, useState } from 'react'
import { ImageIcon } from '../../public/assets/icons';

interface FileProps {
	defaultVal?: string;
	onImageSelect: (file: any) => void;
    name: string;
    preview: string;
    required?: boolean;
}

const ImageInput = ({ onImageSelect, defaultVal, name, preview, required=false }: FileProps) => {
    const [previewImage, setPreviewImage] = useState<any>(defaultVal);
	const fileRef = useRef<any>(null);

   const handleClick = () => {   
		fileRef?.current?.click();
	};
  return (
    <div className='border border-[#EFEFEF] h-[78px] w-[403px] rounded-lg py-[14px] px-4' onClick={handleClick}>
        {(preview||defaultVal) ?  (
            <img
                src={preview||defaultVal}
                alt="Preview"
                width={"auto"}
                height={"auto"}
                className='h-full'
            />
            ):(
            <div className='flex justify-between items-center text-[#75838D]'>
                <span>
                    <p className='text-sm leading-6'>Cover Image</p>
                    <p className='text-[10px] leading-6'>Click to upload from your device</p>
                </span>
                <ImageIcon/>
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

export default ImageInput