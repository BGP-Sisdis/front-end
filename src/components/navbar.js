import { Navbar, Container } from "react-bootstrap";

function NavbarBGP() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="mx-auto">
          <strong>BGP Simulator</strong>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavbarBGP;
