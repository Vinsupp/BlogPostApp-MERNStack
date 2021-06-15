import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts.js';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Posts from './components/Posts/Posts.js';
import Form from './components/Form/Form.js';
import useStyles from './styles';
import Blog from './images/Blog.jpeg';
const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getPosts());
    }, [dispatch]);
    return (
        <Container maxwidth="lg">
            <AppBar className={classes.appBar}  position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">
                    Type Away Your Thoughts 
                </Typography>
                <img className={classes.image} src={Blog} alt="Blog"  height="400" width="60%" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container   justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;