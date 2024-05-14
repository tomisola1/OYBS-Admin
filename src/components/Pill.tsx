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
    if (text === "Happening Soon"){
        return (
            <div className={`bg-[#f76e6e38] text-[#F76E6F] w-fit py-2 px-4 rounded-2xl font-normal text-sm`}>
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