import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Form, Button } from 'react-bootstrap';

function AppointmentForm() {
  const { handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col>
          <h3>Utilisateur</h3>
          <Form.Group controlId="firstName">
            <Form.Label>Prénom</Form.Label>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: 'Prénom requis' }}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Prénom"
                  {...field}
                />
              )}
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Nom</Form.Label>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{ required: 'Nom requis' }}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Nom"
                  {...field}
                />
              )}
            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: 'Email requis' }}
              render={({ field }) => (
                <Form.Control
                  type="email"
                  placeholder="Email"
                  {...field}
                />
              )}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Téléphone</Form.Label>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  type="tel"
                  placeholder="Téléphone"
                  {...field}
                />
              )}
            />
            {errors.phone && <p>{errors.phone.message}</p>}
          </Form.Group>
        </Col>
        <Col>
          <h3>Camion</h3>
          <Form.Group controlId="brand">
            <Form.Label>Marque</Form.Label>
            <Controller
              name="brand"
              control={control}
              defaultValue=""
              rules={{ required: 'Marque requise' }}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Marque"
                  {...field}
                />
              )}
            />
            {errors.brand && <p>{errors.brand.message}</p>}
          </Form.Group>
          <Form.Group controlId="model">
            <Form.Label>Modèle</Form.Label>
            <Controller
              name="model"
              control={control}
              defaultValue=""
              rules={{ required: 'Modèle requis' }}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Modèle"
                  {...field}
                />
              )}
            />
            {errors.model && <p>{errors.model.message}</p>}
          </Form.Group>
          <Form.Group controlId="registrationNumber">
            <Form.Label>Numéro d'immatriculation</Form.Label>
            <Controller
              name="registrationNumber"
              control={control}
              defaultValue=""
              rules={{ required: 'Numéro d\'immatriculation requis' }}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Numéro d'immatriculation"
                  {...field}
                />
              )}
            />
            {errors.registrationNumber && <p>{errors.registrationNumber.message}</p>}
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit">
        Soumettre
      </Button>
    </Form>
  );
}

export default AppointmentForm;
