import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import './calendar.css';
import { getAvailableSlotsForAllBridges } from '../services/getAvailableSlot';

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
            const response = await getAvailableSlotsForAllBridges(start, end);
            if (response) {
                setIsSlotsAvailable(response);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des créneaux disponibles:', error);
        }
    };
    
    const handleEventClick = args => {
        if (args.e && (args.e.data.disabled || args.cell.properties.clickDisabled)) {
            args.preventDefault(); 
            return; 
        }
    };
    
    const handleTimeRangeSelected = async (args) => {
        const dp = calendarRef.current.control;
        // Vérifiez la présence des propriétés start et end dans args
        if (!args || !args.start || !args.end) {
            console.error('Arguments manquants ou invalides:', args);
            return;
        }
    
        const start = args.start;
        const end = args.end;
        const currentDate = new Date();
    
        if (start < currentDate) {
            console.log(start);
            alert("Cette plage horaire est antérieure à la date et l'heure actuelles.");
            dp.clearSelection();
            return;
        }
    
        const startDate = start.toLocaleString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' });
        const endDate = end.toLocaleString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' });
    
        const confirmBooking = window.confirm(`Voulez-vous prendre un rendez-vous ce jour ? De ${startDate} à ${endDate}`);
        dp.clearSelection();
    
        if (confirmBooking) {
            try {
                const response = await getAvailableSlotsForAllBridges(start, end);
    
                if (!response || !response.slots || response.slots.length === 0) {
                    alert('Aucun pont disponible pour la plage horaire sélectionnée.');
                    return;
                }
     
                const availableBridges = response.slots.filter(slot => slot.available);
    
                if (availableBridges.length === 0) {
                    alert('Aucun pont disponible pour la plage horaire sélectionnée.');
                    return;
                }

                const selectedBridgeId = availableBridges[0].bridgeId; 
                dp.events.add({
                    start: start,
                    end: end,
                    id: DayPilot.guid(),
                    bridgeId: selectedBridgeId 
                });
    
                navigate("/appointment", { state: { event: { start, end, bridgeId: selectedBridgeId } } }); 
            } catch (error) {
                console.error('Erreur lors de la récupération des créneaux disponibles:', error);
                alert('Erreur lors de la récupération des créneaux disponibles.');
            }
        }
    };
    
    
    
    const handleNavigatorTimeRangeSelected = args => {
        const dp = calendarRef.current.control;
        dp.update({
            startDate: args.start
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
        onBeforeCellRender: args => {
            if (args.cell.start < DayPilot.Date.today()) {
                args.cell.disabled = true;
                args.cell.properties.clickDisabled = true;
                args.cell.properties.backColor = "#dddddd";
            }
        },
        onTimeRangeSelected: handleTimeRangeSelected,
    };

    return (
        <div className='container d-flex justify-center'>
            <DayPilotNavigator onTimeRangeSelected={handleNavigatorTimeRangeSelected} />
            <DayPilotCalendar {...config} ref={calendarRef}   />
        </div>
    );
};

export default Calendar;
