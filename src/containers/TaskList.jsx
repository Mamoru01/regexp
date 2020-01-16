import React, {useState, useEffect} from "react";
import SimpleCard from "../components/SimpleCard";
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {getAllTask} from '../network/requests';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        width: '100%',
    },
    loader:{
        marginTop: 30,
    },

});

export default function TasksList(){
    const classes = useStyles();
    const [db, setDb] = useState([]);
    const [loader, setLoader] = useState(true);
    let history = useHistory();

    useEffect(()=> {
        getAllTask().then(dbResault => {
            setDb(dbResault);
            setLoader(false)
        })
    });

    return (
        <>
            {
                loader? <CircularProgress disableShrink className={classes.loader} />:
            <div>
            <div className="tasks-list">
                {db.map(task => <SimpleCard id={task.id} description={task.description} key={task.id} />)}
            </div>
            <br/>

            <Button variant="contained" color="primary" className = {classes.button} onClick={()=>history.push("/newtask")}>
                NEW TASK
            </Button>
            </div>
            }
        </>

    )

}
