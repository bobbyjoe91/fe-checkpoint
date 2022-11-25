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
  return (
    <Navbar bg="primary" expand="lg">
      <Navbar.Brand>
        <Link href={brandHref ?? "/"} id="nav-brand">
          {title ?? 'CheckPoint'}
        </Link>
      </Navbar.Brand>
      <DropdownButton align="end" title={<SettingIcon />} variant="info">
        {
          !isAdmin
            ? <>
                <Dropdown.Item href={`/edit/${employeeId}`}>Edit profil</Dropdown.Item>
                <Dropdown.Divider />
              </>
            : null
        }
        <Dropdown.Item href="/login">
          Keluar
        </Dropdown.Item>
      </DropdownButton>
    </Navbar>
  );
}
