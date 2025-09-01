import React from 'react'

interface TextInputProps {
    placeholder?: string;
}

const TextInput = ({ placeholder }: TextInputProps) => {
    return (
        <div>
            <input type="text" className="border border-gray-300 rounded-md p-2" placeholder={placeholder} />
        </div>
    )
}

export default TextInput
