import React from "react";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsUpload,
  BsPeopleFill,
  BsGearFill,
} from "react-icons/bs";

function Sidebar() {
  return (
    <aside id="sidebar">
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsFillArchiveFill className="icon_header" /> DPR AI System
        </div>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsFillGrid3X3GapFill className="icon" /> Projects
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsUpload className="icon" /> Upload DPR
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsPeopleFill className="icon" /> Users
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsGearFill className="icon" /> Settings
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
