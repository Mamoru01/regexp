import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TemplateCard from "../components/TemplateCard";
import Fab from "@material-ui/core/Fab";
import {getTask, saveTask} from '../network/requests';
import {
    useHistory,
    useParams
} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    textField: {
        margin: 8,
    },
    h2Container:{
        textAlign:'center',
    },
    rootContainer:{
        textAlign: 'left',
    },
    root: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(3),
        textAlign: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    buttonContainer:{
        textAlign: 'right',
        width:'100%',
    },
    button: {
        minWidth: '100',
        maxWidth: '200',
        marginRight: 10,
        marginTop: 30,
        marginBottom: 30,
    },
    loader:{
        marginTop: 30,
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default function Task(props){
    const classes = useStyles();
    let history = useHistory();
    const { id } = useParams();
    const [loader, setLoader] = useState(true);
    const [winType, setWinType] = useState(false); // 0 - show, 1  - create
    const [db, setDb] = useState({
        id: "",
        description: "",
        regexp: "",
        samples: []
    });

    useEffect(() => {
        setWinType(props.winType);
        if (!props.winType)
            getTask(id).then(task => {
                const newState = {
                    id: task.id,
                    description: task.description,
                    regexp: task.regexp,
                    samples: task.samples
                };
                setDb(newState);
                setLoader(false);
            });
        else{
            setLoader(false);
        }
    }, []);

    const changeDesc = (event) => {
        const newDb = { ...db, ...{ description: event.target.value } };
        if (/^[\w\s\,\.]*$/.test(event.target.value)) setDb(newDb)
    };

    const changeRegexp = (event) => {
        const newDb = { ...db, ...{ regexp: event.target.value } };
        setDb(newDb)
    };

    const changeTemplate = (value, key) => {
        let newSamples = db.samples;
        newSamples[key] = value;
        const newDb =  { ...db, ...{samples: newSamples }};
        setDb(newDb);
    };

    const deleteTemplate = (key) => {
        let newSamples = db.samples;
        delete newSamples[key];
        const newDb =  { ...db, ...{samples: newSamples }};
        setDb(newDb);
    };

    const addTemplate = () => {
        let newSamples = db.samples;
        newSamples.push("");
        const newDb =  { ...db, ...{samples: newSamples }};
        setDb(newDb);
    };

    const saveClick = ()=> {
        setLoader(true);
        saveTask(db).then( () => {
            setLoader(false);
            history.push("/");
        });
    };

    return (
        <>{
            loader? <CircularProgress disableShrink className={classes.loader} />:
                <div className={classes.rootContainer}>
                    <h2 className={classes.h2Container}>{!winType?"Задача с ID = " + db.id :"Новая задача"}</h2>
                    <h3>Description:</h3>
                    <TextField
                        id="outlined-full-width"
                        label="Описание"
                        className = {classes.textField}
                        placeholder="Тут может быть ваще описание"
                        helperText="Впишите сюда описание вашей новой задачи, чтобы добавить её в общий список"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value = {db.description}
                        onChange={changeDesc}
                    />
                    <br/>
                    <h3>RegExp:</h3>
                    <TextField
                        id="outlined-full-width"
                        label="RegExp"
                        className = {classes.textField}
                        placeholder="([0-9]\.)+[0-9]*([ ]|\t)"
                        helperText="Тут напишите правило на языке регулярных выражений"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value = {db.regexp}
                        onChange={changeRegexp}
                    />
                    <h3>Template:</h3>
                    {
                        db.samples.map( (el, index) =>(
                            <TemplateCard content = {el} regexp = {db.regexp} key={index} index = {index}
                                                                     update={changeTemplate} deleteTmp={deleteTemplate} delButton = {winType}/>))
                    }
                    {   winType?
                        <Fab color="primary" aria-label="add" onClick={addTemplate} className={classes.button}>
                            <AddIcon/>
                        </Fab>:''
                    }
                    <div className={classes.buttonContainer}>
                        {
                            winType?
                                <div>
                                    <Button color="primary" className={classes.button} onClick={() => history.push("/")}>
                                        Отменить
                                    </Button>
                                    <Button variant="contained" color="primary" className={classes.button}
                                            onClick={saveClick}>
                                        Сохранить
                                    </Button>
                                </div>
                                :<Button variant="contained" color="primary" className={classes.button}
                                         onClick={() => history.push("/")}>
                                    Назад
                                </Button>
                        }
                    </div>
                </div>
        }
        </>
    )
}


