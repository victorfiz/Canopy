import React from 'react';

const RoundSidebar = ({ role }) => {
    return (
        <div className='mt-10 ml-10 w-[300px] mr-20 hidden sm:block'>
            <div className='sb-round-ttl mb-2 ml-2'> TIMELINE</div>
            {role?.rounds?.map((round, index) => {
                return (
                    <div className='p-3 flex round-sb' key={index}>
                        <div className='mr-2'>{round.emoji}</div>
                        <div>{round.title}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default RoundSidebar;
