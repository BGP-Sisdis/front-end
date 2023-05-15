import { Navbar, Container } from 'react-bootstrap';

function NavbarBGP() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className='mx-auto'>BGP Simulator</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavbarBGP;