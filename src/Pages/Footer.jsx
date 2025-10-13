import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="text-light py-4 mt-1">
      <Container>
        <Row>
          <Col md={4}>
            <h5> CookBook</h5>
            <p>
              Bringing flavors to your fingertips. Explore global cuisines and
              cook delicious meals from your own kitchen.
            </p>
          </Col>

          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/" className="text-light text-decoration-none">Recipes</a></li>
              <li><a href="/" className="text-light text-decoration-none">About Us</a></li>
            </ul>
          </Col>

          <Col md={4}>
            <h5>Connect with Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="footer_icon_facebook"><FaFacebook /></a>
              <a href="#" className="footer_icon_insta"><FaInstagram /></a>
              <a href="#" className="footer_icon_youtub"><FaYoutube /></a>
              <a href="#" className="footer_icon_pin"><FaPinterest /></a>
            </div>
            <p className="mt-3 mb-0"> cookbook@gmail.com</p>
          </Col>
        </Row>

        <hr className="border-light" />
        <p className="text-center mb-0">
          © {new Date().getFullYear()} CookBook. All rights reserved. <br />
          Designed By Teenu Anand.
        </p>
      </Container>
    </footer>
  );
}
