import React, { useState, useEffect } from 'react';
import { Table, Spinner, Form, Button } from 'react-bootstrap';

function UserManagement() {

  return (
    <>
        <Spinner animation="border" /> :
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </Table>
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
          />
        </Form.Group>
        <Button type="submit">Add User</Button>
      </Form>
    </>
  );
}

export default UserManagement;
