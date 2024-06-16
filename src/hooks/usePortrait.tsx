import { useState, useEffect } from "react";

const usePortrait = (): boolean => {
	const [isPortrait, setIsPortrait] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			const matches = window.matchMedia("(max-width: 60.25em)"); // Media query for max-width
			setIsPortrait(matches.matches);
		};

		handleResize(); // Call initially to set state on mount
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return isPortrait;
};

export default usePortrait;
