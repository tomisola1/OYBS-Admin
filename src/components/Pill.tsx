import { ReactNode } from "react";

interface PillProps {
	text?: ReactNode;
	children?: React.ReactNode;
}
function Pill(props: PillProps) {
	const { text, children } = props;

    if (text === "In Progress"){
        return (
            <div className={`bg-[#ffaa2a35] text-[#FFAB2A] w-fit py-2 px-4 rounded-2xl font-normal text-sm`}>
                {text}
                {children}
            </div>
        )
    }
    if (text === "pending"){
        return (
            <div className={`bg-[#ffaa2a35] text-[#FFAB2A] w-fit py-2 px-4 rounded-2xl font-normal text-sm`}>
                {text}
                {children}
            </div>
        )
    }
    if (text === "Happening Soon"){
        return (
            <div className={`bg-[#f76e6e38] text-[#F76E6F] w-fit py-2 px-4 rounded-2xl font-normal text-sm`}>
                {text}
                {children}
            </div>
        )
    }
    if (text === "Has passed"){
        return (
            <div className={`bg-[#b1afaf38] text-[#3f3f3f] w-fit py-2 px-4 rounded-2xl font-normal text-sm`}>
                {text}
                {children}
            </div>
        )
    }

    return (
        <div className={`bg-[#2378ef34] text-[#2378EF] w-fit py-2 px-5 rounded-2xl font-normal text-sm`}>
            {text}
            {children}
        </div>
    )
}

export default Pill