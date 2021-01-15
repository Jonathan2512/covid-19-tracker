import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './InforBox.css'

function InforBox(props) {
    const { title, cases, isRed, active, total, onClick } = props;

    return (
        <Card
            className={`infoBox
            ${active && 'inforBox--selected'}
            ${!isRed && 'inforBox--recovered'}`}
            onClick={onClick}
        >
            <CardContent>
                {/* title */}
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                {/* number of cases */}
                <h2 className={`infoBox__cases ${!isRed && 'inforBox__cases--recovered'}`}>{cases}</h2>
                {/* total */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InforBox;
