import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";

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
    textField:{
        width: '100%',
    }
});

export default function TemplateCard(props) {
    const classes = useStyles();
    const [content, setContent] = useState("");
    const [error, serError] = useState(false);

    const changeContent = event => {
        const newContent =  event.target.value;
        const regexp = new RegExp('^' + props.regexp + '$');
        props.update(newContent, props.index);
        serError(!regexp.test(props.content));
    };

    const deleteClick = event => {
        props.deleteTmp(props.index);
    };

    useEffect(() => {
        setContent(props.content);
        const regexp = new RegExp('^' + props.regexp + '$');
        serError(!regexp.test(props.content));
    });

    return (
        <div className="task">
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        <TextField
                            error = {error}
                            label= {error?"no-match": "match"}
                            defaultValue="Template"
                            helperText= {error?"Don't match": "Match"}
                            variant="outlined"
                            value = {content}
                            onChange={changeContent}
                            className = {classes.textField}
                        />
                    </Typography>
                </CardContent>
                { props.delButton ? <CardActions>
                    <Button className={classes.button} onClick = {deleteClick}>Удалить</Button>
                </CardActions> : ""}
            </Card>
        </div>
    )
}
