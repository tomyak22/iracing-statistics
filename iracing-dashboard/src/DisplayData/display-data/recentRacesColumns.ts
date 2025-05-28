import { ValueGetterParams, ICellRendererParams } from "ag-grid-community";

export const recentRacesColumnDefs = [
    {
        field: 'session_start_time',
        headerName: 'Session Start Time',
        valueGetter: (params: ValueGetterParams) => {
            const date = new Date(params.data.session_start_time);
            return date.toLocaleString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }
    },
    {
        field: 'series_name',
        headerName: 'Series'
    },
    {
        field: 'track.track_name',
        headerName: 'Track Name'
    },
    {
        field: 'oldi_rating',
        headerName: 'Starting iRating'
    },
    {
        field: 'newi_rating',
        headerName: 'Resulting iRating'
    },
    {
        field: 'iRatingChange',
        headerName: 'iRating Change',
        valueGetter: (params: ValueGetterParams) => {
            const oldiRating = params.data.oldi_rating;
            const newiRating = params.data.newi_rating;
            return newiRating - oldiRating;
        },
        cellRenderer: (params: ICellRendererParams) => {
            const value = params.value;
            if (value > 0) {
                return `<span style="color: #4caf50;">&#9650; ${value}</span>`; // Green up arrow
            } else if (value < 0) {
                return `<span style="color: #f44336;">&#9660; ${value}</span>`; // Red down arrow
            } else {
                return `<span>${value}</span>`;
            }
        },
    },
    {
        field: 'start_position',
        headerName: 'Start Position'
    },
    {
        field: 'finish_position',
        headerName: 'Finish Position'
    },
    {
        field: 'positions_gained',
        headerName: 'Positions Gained', 
        valueGetter: (params: ValueGetterParams) => {
            const startPosition = params.data.start_position;
            const finishPosition = params.data.finish_position;
            return startPosition - finishPosition;
        },
        cellRenderer: (params: ICellRendererParams) => {
            const value = params.value;
            if (value > 0) {
                return `<span style="color: #4caf50;">&#9650; ${value}</span>`; // Green up arrow
            } else if (value < 0) {
                return `<span style="color: #f44336;">&#9660; ${value}</span>`; // Red down arrow
            } else {
                return `<span>${value}</span>`;
            }
        },
    },
    {
        field:'incidents',
        headerName: 'Incidents'
    },
    {
        field: 'safety_rating_change',
        headerName: 'Safety Rating Change',
        valueGetter: (params: ValueGetterParams) => {
            const oldSafetyRating = params.data.old_sub_level;
            const newSafetyRating = params.data.new_sub_level;
            // Convert to decimal (e.g., 123 -> 1.23)
            return ((newSafetyRating - oldSafetyRating) / 100).toFixed(2);
        },
        cellRenderer: (params: ICellRendererParams) => {
            const value = parseFloat(params.value);
            if (value > 0) {
                return `<span style="color: #4caf50;">&#9650; ${value.toFixed(2)}</span>`;
            } else if (value < 0) {
                return `<span style="color: #f44336;">&#9660; ${value.toFixed(2)}</span>`;
            } else {
                return `<span>${value.toFixed(2)}</span>`;
            }
        },
    }
    // Add more columns as needed
];