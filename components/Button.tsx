import React, { useState } from 'react'
import { Text } from 'react-native';

interface ToggleTextButtonProps {
    Text1: string;
    Text2: string;
  }



const Button: React.FC<ToggleTextButtonProps> = ({Text1,Text2}) => {
const [text, settext] = useState<boolean>(true)
  return (
   
        <Text className='text-center'>{text?Text1:Text2}</Text>


      )
}

export default Button;

