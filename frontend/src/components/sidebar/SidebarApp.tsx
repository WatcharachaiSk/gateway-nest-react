// import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  // SubMenu,
  useProSidebar,
} from 'react-pro-sidebar';
import pathRoutesPage from '../../routers/pathPage';
import { BiMenu } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { IoCreateOutline } from 'react-icons/io5';
import { MdOutlineJoinInner } from 'react-icons/md';
import { BiChat } from 'react-icons/bi';

function SidebarApp() {
  const navigate = useNavigate();
  const { collapseSidebar } = useProSidebar();
  return (
    <Sidebar style={{ height: '100vh' }}>
      <Menu>
        <MenuItem
          icon={<BiMenu size={20} />}
          onClick={() => {
            collapseSidebar();
          }}
          style={{ textAlign: 'center' }}
        >
          <h4>GateWays</h4>
        </MenuItem>
        {/*  */}
        <MenuItem
          onClick={() => {
            navigate(pathRoutesPage.createGate);
          }}
          icon={<IoCreateOutline size={20} />}
        >
          Create GateWays
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate(pathRoutesPage.joinGate);
          }}
          icon={<MdOutlineJoinInner size={20} />}
        >
          Join Gateways
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate(pathRoutesPage.chat);
          }}
          icon={<BiChat size={20} />}
        >
          Chat
        </MenuItem>
        {/*  */}
      </Menu>
    </Sidebar>
  );
}

export default SidebarApp;

/*
icon={<HomeOutlinedIcon />}
icon={<PeopleOutlinedIcon />}
icon={<ContactsOutlinedIcon />}
icon={<ReceiptOutlinedIcon />}
icon={<HelpOutlineOutlinedIcon />}
icon={<CalendarTodayOutlinedIcon />}
*/
