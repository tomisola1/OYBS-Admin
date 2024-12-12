// import { CancelIcon, EditIconBlack, SuccessInfoIcon, UploadIcon } from '@/public/icons'
import React from 'react'
import useClose from '@/hooks/useClose';
import { XMarkIcon } from '@heroicons/react/24/outline';

export interface ModalProps {
	heading?: string;
	sub?: string;
	children?: React.ReactNode | Array<React.ReactNode>;
	show?: boolean;
	className?: string;
	hide: () => void;
};
const Modal = (props:ModalProps) => {
    const { heading, sub, children, className, show, hide } = props;
    const ref = useClose(hide);

    if (show) {
        return (
            <div>
                <div className='bg-slate-900 bg-opacity-40 backdrop-blur-[2px] w-full h-full fixed inset-0 z-50 flex justify-center items-center'>
                    <div className={`w-[503px] bg-white flex flex-col p-7 rounded-2xl overflow-auto ${className}`} ref={ref}>
                        <div className='flex justify-end items-center mb-6'>
                            <div onClick={hide}>
                                <XMarkIcon className="h-5 w-5 flex-shrink-0 bg-slate-200 text-gray-900 rounded-full p-1" aria-hidden='true'/>
                            </div>
                        </div>
                        <div className='text-center text-[#222222 px-5'>
                            <p className={`text-3xl font-semibold mb-2`}>{heading}</p>
                            <span className={`text-base font-normal leading-7 mb-4`}>{sub}</span>
                        </div>
                        <div className="flex flex-col mt-6 md:px-5">
                            {children}   
                        </div>
                    </div>
                </div>
            </div>
        )

    }else {
        return <></>
    }
}

export default Modal