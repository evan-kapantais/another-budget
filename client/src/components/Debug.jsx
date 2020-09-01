import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const Debug = () => {
	const { handlePanel } = useContext(GlobalContext);
	return <div></div>;
};

export default Debug;
