import React, { useState, Children, useEffect } from 'react';


function Button({
    className = '',
    disabled,
    href,
    onPress,
    size,
    target,
    type,
    children,
    css = {},
    isAsync = false,
    loadingText,
    text,
    fullWidth, 
    inheritIsLoading= false, 
    shouldInheritIsLoading = false
}) {

    const [isLoading, setIsLoading] = useState(inheritIsLoading);

    useEffect(() => {
        if(shouldInheritIsLoading) setIsLoading(inheritIsLoading);
    }, [inheritIsLoading]);



    const handleClick = async (e) => {
        if (onPress) {
            if (isAsync) {
                setIsLoading(true);
                await onPress(e)
                setIsLoading(false);
            } else {
                setIsLoading(true);
                onPress(e);
                setIsLoading(false);
            }
        }
    };

    const baseClasses = 'px-4 py-2 rounded-md focus:outline-none transition duration-150 ease-in-out inline-flex items-center cursor-pointer base-button ';

    const primaryClasses = 'bg-[#703CF0] text-white hover:bg-[#5518ed] primary-button';
    const secondaryClasses = 'bg-white secondary-button';
    const blackClasses = 'bg-[#020014] text-white hover:bg-gray-800 active:bg-gray-700 active-scale';
    const destructiveClasses = 'bg-red-500 text-white hover:bg-red-600';
    const disabledClasses = 'opacity-50 cursor-not-allowed';

    const sizes = {
        small: 'text-sm px-3 py-1',
        medium: 'px-4 py-2 medium-button',
        large: 'text-lg px-5 py-3',
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
        case 'black':
            buttonClasses = blackClasses;
            break;
        default:
            buttonClasses = secondaryClasses;
            break;
    }

    if (disabled) {
        buttonClasses = `${buttonClasses} ${disabledClasses}`;
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

    const content = (isLoading || inheritIsLoading)
        ? <div className='loading-button'>
            <div className={type === "secondary" ? 'spinner mr-2 spinner-dark mt-[0.15em]' : 'spinner mr-2 spinner-white mt-[0.15em]'}></div>
            <div className='text'>{loadingText || "Loading"}</div>
        </div>
        :
        <div> {text} </div>;

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
            className={`${baseClasses} ${buttonClasses} ${sizes[size] || sizes.medium} ${className} ${(isLoading || inheritIsLoading)  ? 'opacity-70 cursor-not-allowed' : ''} ${fullWidth ? 'w-full' : ''}`}
            onClick={handleClick}
            disabled={disabled || (isLoading || inheritIsLoading)}
            style={{ justifyContent: css.alignX || 'center' }}
        >
            {content}
        </button>
    );
}

export default Button;