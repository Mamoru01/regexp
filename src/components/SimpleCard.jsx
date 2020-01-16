import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHistory} from "react-router-dom";
import {deleteTask} from "../network/requests";

const useStyles = makeStyles({
    card: {
        margin: '0 auto 0 auto ',
        marginTop: 10,
        minWidth: 375,
        maxWidth: 800,
    },
    title: {
        fontSize: 14,
    },
    button:{
        margin: '0 auto 0 auto',
        marginRight: 15,
    },
});

export default function SimpleCard(props) {
    const classes = useStyles();
    let history = useHistory();

    const deleteClick = () => {
        deleteTask(props.id);
    };

    return (
        <div className="task">
            <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    id: {props.id}
                </Typography>
                <Typography variant="h5" component="h2">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" className={classes.button} onClick={deleteClick}>Delete</Button>
                <Button size="small" className={classes.button} onClick={() => history.push("/tasks/" + props.id)}>Show</Button>
            </CardActions>
            </Card>
        </div>
    );
}
