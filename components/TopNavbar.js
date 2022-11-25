import Link from "next/link";
import Image from "next/image";

import { Navbar, DropdownButton, Dropdown } from "react-bootstrap";

function SettingIcon() {
  return (
    <Image
      src="/assets/setting.png"
      width={20}
      height={20}
      id="setting"
      alt="Setting"
    />
  );
}

export default function TopNavbar() {
  return (
    <Navbar bg="primary" expand="lg">
      <Navbar.Brand>
        <Link href="/" id="nav-brand">CheckPoint</Link>
      </Navbar.Brand>
      <DropdownButton align="end" title={<SettingIcon />} variant="info">
        <Dropdown.Item href="/edit">Setting</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="/login">
          Keluar
        </Dropdown.Item>
      </DropdownButton>
    </Navbar>
  );
}
