'use client'

import { Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Button } from './Button'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { BORDER_RADIUS } from '../constants/borderRadius'
import { Z_INDEX } from '../constants/zIndex'
import { FONT_SIZE } from '../constants/fontSize'
import { FONT_THICKNESS } from '../constants/fontThickness'

export const NavbarSiteWeb = () => {
  const router = useRouter()

  const navItems = [
    { label: 'Nos partenaires', href: '#partenaires' },
    { label: 'Comment ça marche', href: '#comment-ca-marche' },
    { label: 'Bénéfices', href: '#benefices' },
    { label: 'Équipe', href: '#equipe' },
  ]

  return (
    <Navbar
      fixed="top"
      style={{
        backgroundColor: COLOR.WHITE,
        borderRadius: BORDER_RADIUS.L,
        border: `1px solid ${COLOR.GREY.MEDIUM}`,
        marginTop: SPACING.L,
        marginLeft: '12.5%',
        marginRight: '12.5%',
        paddingLeft: SPACING.S,
        paddingRight: SPACING.S,
        zIndex: Z_INDEX.NAVBAR,
      }}
    >
      <Container fluid style={{ paddingLeft: SPACING.S, paddingRight: SPACING.S }}>
        <Navbar.Brand
          onClick={() => router.push('/')}
          style={{
            color: COLOR.BLACK,
            fontSize: FONT_SIZE.XL,
            fontWeight: FONT_THICKNESS.XL,
            cursor: 'pointer',
            margin: 0,
            padding: 0,
          }}
        >
          Dataxx
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto" style={{ display: 'flex', alignItems: 'center', gap: SPACING.XL }}>
            {navItems.map((item, index) => (
              <Fragment key={item.href}>
                <Nav.Link
                  href={item.href}
                  className="nav-link-custom"
                  style={{
                    color: COLOR.BLACK,
                    fontSize: FONT_SIZE.M,
                    fontWeight: FONT_THICKNESS.M,
                    padding: 0,
                    transition: 'color 0.2s ease, fontWeight 0.2s ease',
                  }}
                >
                  {item.label}
                </Nav.Link>
                {index < navItems.length - 1 && (
                  <span style={{ color: COLOR.BLACK, fontSize: FONT_SIZE.S }}>•</span>
                )}
              </Fragment>
            ))}
          </Nav>
      <style dangerouslySetInnerHTML={{
        __html: `
          .nav-link-custom:hover {
            color: ${COLOR.PURPLE} !important;
            font-weight: ${FONT_THICKNESS.L} !important;
          }
        `
      }} />
          <Button
            variant="BLACK"
            type="button"
            onClick={() => {
              // TODO: Add demo request logic
            }}
            style={{
              width: 'auto',
              paddingLeft: SPACING.L,
              paddingRight: SPACING.L,
            }}
          >
            Demo
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

