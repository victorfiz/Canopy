import React, { useState, Children, useEffect } from 'react';


function TextButton({
    className = '',
    disabled,
    href,
    onPress,
    size,
    target,
    type,
    children,
    css = {},
    text,
    fullWidth,
    icon = <></>
}) {



    const handleClick = async (e) => {
        if (onPress) onPress(e);
    };

    const baseClasses = 'py-2 rounded-md focus:outline-none transition duration-150 ease-in-out items-center cursor-pointer ';

    const primaryClasses = 'text-[#703CF0] text-left hover:text-[#a583f7]';
    const whiteClasses = 'text-white text-left hover:text-[#a583f7]';

    const secondaryClasses = 'text-black text-left';
    const destructiveClasses = 'text-red-500';

    const sizes = {
        small: 'text-sm  py-1',
        medium: 'py-2 medium-button',
        large: 'text-lg py-3',
    };

    let buttonClasses;
    switch (type) {
        case 'primary':
            buttonClasses = primaryClasses;
            break;
        case 'secondary':
            buttonClasses = secondaryClasses;
            break;
        case 'destructive':
            buttonClasses = destructiveClasses;
            break;

        case 'white':
            buttonClasses = whiteClasses;
            break;

        default:
            buttonClasses = secondaryClasses;
            break;
    }



    if (css.width === 'fill') {
        buttonClasses = `${buttonClasses} w-full`;
    }

    const updatedChildren = Children.map(children, child => {
        if (child && child.type && child.type.name === 'Icon') {
            return React.cloneElement(child, {
                className: `${child.props.className || ''} mr-2`
            });
        }
        return child;
    });

    const content = <div className='flex'> <div className='mr-2'> {icon}</div>{text} </div>;

    return href ? (
        <a
            className={`${baseClasses} ${buttonClasses} ${sizes[size] || sizes.medium} ${className} }`}
            href={href}
            target={target}
            onClick={handleClick}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            style={{ justifyContent: css.alignX || 'center' }}
        >
            {content}
        </a>
    ) : (
        <button
            className={`${baseClasses} ${buttonClasses} ${sizes[size] || sizes.medium} ${className}  ${fullWidth ? 'w-full' : ''}`}
            onClick={handleClick}
            style={{ justifyContent: css.alignX || 'center' }}
        >
            {content}
        </button>
    );
}

export default TextButton;