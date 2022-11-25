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

export default function TopNavbar({ title, brandHref, isAdmin, employeeId }) {
  const homeUrl = brandHref ?? (isAdmin ? '/admin' : '/');

  return (
    <Navbar bg="primary" expand="lg">
      <Navbar.Brand>
        <Link href={homeUrl} id="nav-brand">
          {title ?? 'CheckPoint'}
        </Link>
      </Navbar.Brand>
      <DropdownButton align="end" title={<SettingIcon />} variant="info">
        {
          isAdmin
            ? <Dropdown.Item href={`/admin/create-employee`}>Buat karyawan baru</Dropdown.Item> 
            : <Dropdown.Item href={`/edit/${employeeId}`}>Edit profil</Dropdown.Item>
        }
        <Dropdown.Divider />
        <Dropdown.Item href="/login">
          Keluar
        </Dropdown.Item>
      </DropdownButton>
    </Navbar>
  );
}
