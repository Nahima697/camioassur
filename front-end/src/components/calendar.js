import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import './calendar.css';
import axios from 'axios';

const Calendar = ({ data }) => {
    const calendarRef = useRef();
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [isSlotsAvailable, setIsSlotsAvailable] = useState(false);

    useEffect(() => {
        const formattedEvents = data.flatMap(item =>
            item.appointments.map(appointment => ({
                start: new Date(appointment.startDate),
                end: new Date(appointment.endDate),
                text: "------",
                clickDisabled: true,
                backColor: "#ff0000",
                color: "#ffffff",
                moveDisabled: true,
                disabled: true
            }))
        );
        setEvents(formattedEvents);
        fetchAvailableSlots();
    }, [data]);

    const fetchAvailableSlots = async () => {
        try {
            const start = new Date().toISOString();
            const end = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString();
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/calendar/available-slots?start=${start}&end=${end}`);
            setIsSlotsAvailable(response.data); // Assurez-vous que la réponse de l'API est un boolean
        } catch (error) {
            console.error('Erreur', error);
        }
    };

    const handleEventClick = args => {
        if (!args.e.data.disabled && isSlotsAvailable) {
            navigate("/appointment");
        }
    };
    const handleTimeRangeSelected = args => {
        calendarRef.current.control.update({
          startDate: args.day
        });
    };

    const config = {
        viewType: "Week",
        timeHeaders: [
            { groupBy: "Hour", format: "HH", displayFormat: "HH:mm", start: 8, end: 18 },
            { groupBy: "Cell", format: "HH:mm" }
        ],
        locale: "fr-fr",
        startDate: new Date(),
        timeRangeSelectedHandling: "Enabled",
        durationBarVisible: false,
        cellDuration: 120,
        moveDisabled: true,
        events: events,
        eventClick: handleEventClick,
        onBeforeEventRender: args => {
            if (!args.data.disabled && isSlotsAvailable) {
                args.data.backColor = "#ffffff"; 
            } else {
                args.data.backColor = "#ff0000"; 
            }
        },
        onTimeRangeSelected: async args => {
            const dp = calendarRef.current.control;
            const start = args.start;
            const end = args.end;
            const currentDate = new Date();
            if (start < currentDate) {
                alert("Cette plage horaire est antérieure à la date et l'heure actuelles.");
                dp.clearSelection();
                return;
            }
            const startDate = start.toLocaleString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' });
            const endDate = end.toLocaleString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' });
            const modal = await DayPilot.Modal.prompt(`Voulez-vous prendre un rendez-vous ce jour ? De ${startDate} à ${endDate}`);
            dp.clearSelection();
            if (!modal.result) { return; }
            dp.events.add({
                start: start,
                end: end,
                id: DayPilot.guid(),
            });
        },
    };

    return (
        <div className='container d-flex justify-center'>
            <DayPilotNavigator onTimeRangeSelected={handleTimeRangeSelected}/>
            <DayPilotCalendar {...config} ref={calendarRef} />
        </div>
    );
};

export default Calendar;



