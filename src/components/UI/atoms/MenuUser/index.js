import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';

function MenuUser({ photoURL, displayName }) {
    return (
        <Menu>
            <MenuButton>
                <Image src={photoURL} width={'40px'} height={'40px'} rounded={'full'} />
            </MenuButton>
            <MenuList>
                <Link to={''}>
                    <MenuItem>My Account</MenuItem>
                </Link>

                <MenuItem flexDirection={'row'} alignItems={'center'} gap={4}>Logout <IoLogOut fontSize={20} /> </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default MenuUser;