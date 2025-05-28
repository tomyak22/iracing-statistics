export const classLeaderboardCols = [
    {
        field: 'DRIVER',
        headerName: 'Driver',
        filter: true,
        filterParams: {
            filter: 'agTextColumnFilter',
            maxNumConditions: 5,
            numAlwaysVisibleConditions: 2,
            buttons: ['reset'],
        }
    },
    {
        field: 'CUSTID',
        headerName: 'iRacing ID',
    },
    {
        field: 'CLASS',
        headerName: 'Class',
        cellStyle: (params: any) => {
            const value = params.value || '';
            if (value.includes('P')) return { color: 'white' };
            if (value.includes('A')) return { color: 'blue' };
            if (value.includes('B')) return { color: 'green' };
            if (value.includes('C')) return { color: 'yellow' };
            if (value.includes('D')) return { color: 'orange' };
            if (value.includes('R')) return { color: 'red' };
            return {};
        }
    },
    {
        field: 'IRATING',
        headerName: 'iRating',
        filter: 'agNumberColumnFilter',
        filterParams: {
            buttons: ['reset'],
        },
        valueGetter: (params: any) => {
            const value = params.data?.IRATING;
            return value ? parseInt(value, 10) : null;
        },
        filterValueGetter: (params: any) => {
            const value = params.data?.IRATING;
            return value ? parseInt(value) : null;
        }
    },
    {
        field: 'STARTS',
        headerName: 'Starts',
    },
    {
        field: 'WINS',
        headerName: 'Wins',
    },
    {
        field: 'AVG_START_POS',
        headerName: 'Avg Start',
    },
    {
        field: 'AVG_FINISH_POS',
        headerName: 'Avg Finish',
    },
    {
        field: 'TOP25PCNT',
        headerName: 'Top 25%',
    },
    {
        field: 'LAPS',
        headerName: 'Laps',
    },
    {
        field: 'LAPSLEAD',
        headerName: 'Laps Led',
    },
    {
        field: 'AVG_INC',
        headerName: 'Avg Incidents',
    }
]