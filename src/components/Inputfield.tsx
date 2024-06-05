"use client"

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'


interface InputProps extends React.InputHTMLAttributes<any> {
	label?: string;
	className?: string;
	change?:
	| React.ChangeEventHandler<HTMLInputElement>
	| any;
	required?: boolean;
	as?: string;
	rows?: number
}
export const InputField: React.FC<InputProps> = ({ ...props }) => {
	const {
		label,
		name,
		className,
		placeholder,
		type="text",
		required = false,
		minLength,
		defaultValue,
		id,
		as,
		rows,
		change,
		...rest
	} = props;
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const tooglePaswword = () => {
		setIsPasswordVisible(current => !current)
	}
    const passwordType = isPasswordVisible ? 'text' : 'password'
	
	return (
		<div className="">
			{label && (
				<label
					className={'text-sm text-[#818181] mb-8'}
					htmlFor={name}>
					{label}
					&nbsp;
				</label>
			)}
            <div className='relative'>
			{as || type == "textarea" ? (
					<textarea
						name={name}
						className={`border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 placeholder-[#75838D]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mb-4 font-light text-sm ${className}`}
						placeholder={placeholder}
						onChange={change}
						required={required}
						minLength={minLength}
						defaultValue={defaultValue}
						rows={rows}
						id={id}
						{...rest}
					/>
				) : (
				<input
                    name={name}
                    className={`border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 placeholder-[#75838D]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mb-4 font-light text-sm ${className}`}
                    placeholder={placeholder}
                    type={type === "password" ? passwordType : type}
                    onChange={change}
                    id={id}
                    required={required}
                    minLength={minLength}
                    defaultValue={defaultValue}
                />
				)}
                {type === "password" && (
                        <button type="button" onClick={tooglePaswword}>
                            {isPasswordVisible ? (
                                <EyeSlashIcon className="h-5 w-5 text-[#75838D] absolute right-3 top-4" aria-hidden="true"/>
                            ) : (
                                <EyeIcon className="h-5 w-5 text-[#75838D] absolute right-3 top-4" aria-hidden="true"/>
                            )}
                        </button>
                    )}
            </div>
		</div>
	);
};

export default InputField
