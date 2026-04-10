import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({ value, onChange, placeholder }) => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    }
    
    return (
        <div className='flex items-center border border-gray-300 rounded-lg px-5 rounded mb-3'>
            <input 
                value={value}
                onChange={onChange}
                type={isShowPassword ? 'text' : 'password'}
                placeholder={placeholder || 'Password'}
                className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
            />
            {isShowPassword ?
                <Eye 
                    className="w-6 h-6 text-gray-600" 
                    onClick={() => toggleShowPassword()}
                />
                :
                <EyeOff 
                    className="w-6 h-6 text-gray-600" 
                    onClick={() => toggleShowPassword()}
                />
            }
        </div>
    )
}

export default PasswordInput