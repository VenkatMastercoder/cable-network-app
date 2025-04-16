import React from 'react';
import StackNavigator from './StackNavigator';
import { ThemeContextProvider } from '../constants/ThemeContext';

const Route = () => {

	return (
		<ThemeContextProvider>
			<StackNavigator/> 
		</ThemeContextProvider>
	)
  
}

export default Route;