import React, { useState } from 'react';



const Role = ({ role, roles, setRoles }) => {

    return (
        <div className={role.selected ? "selected-category" : (role.loading ? 'category shimmer' : 'category')}
            key={role.name}
            onClick={
                () => {
                    setRoles(roles.map((item) => {
                        if (item.roleName === role.roleName) {
                            if (item.selected) {
                                item.selected = false;
                            } else {
                                item.selected = true;

                            }
                        }
                        return item;
                    }))
                }
            }>

            <img src={role.roleIcon} alt={role.name} />

        </div>
    )
}

export default Role;
