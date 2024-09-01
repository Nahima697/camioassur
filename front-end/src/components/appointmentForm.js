import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { bookingService } from '../services/bookingService';
import { getAvailableSlotsByBridge } from '../services/getAvailableSlot';

function AppointmentForm() {
    const { handleSubmit, control, formState: { errors }, getValues} = useForm();
    const location = useLocation();
    const event = location.state?.event;

    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedBridgeId, setSelectedBridgeId] = useState(null);

    useEffect(() => {
        const fetchAvailableSlots = async () => {
            try {
                if (event) {
                    const start = new Date(event.start.value).toISOString();
                    const end = new Date(event.end.value).toISOString();
                    const bridgeId = event.bridgeId;

                    console.log('Event:', event);
                    console.log('Fetching slots from:', start, 'to:', end, 'for Bridge ID:', bridgeId);

                    if (!bridgeId) {
                        console.error('Bridge ID is not available');
                        return;
                    }

                    const slots = await getAvailableSlotsByBridge(bridgeId, start, end);
                    console.log('Available slots:', slots);

                    setAvailableSlots(slots);

                    if (slots.length > 0) {
                        setSelectedBridgeId(slots[0].bridgeId);
                    } else {
                        console.warn('Aucun créneau disponible pour le pont:', bridgeId);
                    }
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des créneaux disponibles:', error);
            }
        };

        fetchAvailableSlots();
    }, [event]);

    const onSubmit = async (data) => {
        try {
            const { firstName, lastName, email, phone, brand, vehicleModel, registrationNumber } = getValues();

            const userData = {
                firstName,
                lastName,
                email,
                phone
            };

            const truckData = {
                brand,
                vehicleModel,
                registrationNumber
            };

            // Vérifiez que les informations nécessaires sont présentes
            if (!selectedBridgeId && !event.bridgeId) {
                alert('Aucun pont disponible pour les créneaux sélectionnés.');
                return;
            }

            const bookingData = {
                ...data,
                bridgeId: selectedBridgeId || event.bridgeId,
                startTime: new Date(event?.start.value).toISOString(),
                endTime: new Date(event?.end.value).toISOString(),
                user: userData, 
                truck: truckData 
            };

            await bookingService(bookingData);
            alert('Réservation réussie !');
        } catch (error) {
            alert('Erreur lors de la réservation.');
        }
    };

    return (
        <Form className="container" onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col>
                    <h3>Vos informations personnelles</h3>
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
                    <Form.Group controlId="vehicleModel">
                        <Form.Label>Modèle</Form.Label>
                        <Controller
                            name="vehicleModel"
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
                        {errors.vehicleModel && <p>{errors.vehicleModel.message}</p>}
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
                    <input type="hidden" name="appointmentDate" value={event?.start ? new Date(event.start.value).toISOString() : ''} />
                </Col>
            </Row>
            <Button variant="primary" type="submit">
                Prendre rendez-vous
            </Button>
        </Form>
    );
}

export default AppointmentForm;
