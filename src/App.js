import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {ForceGraph3D} from "react-force-graph";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(2),
        marginTop: 'auto',
        backgroundColor: 'white',
    },
}));

export default function App() {
    const classes = useStyles();

    const [fg, setFg] = useState(0);
    const [currentNode, setCurrentNode] = useState({});

    const hiveData = {
        nodes: [
            { group: 1, id: 1, title: "Ideas Born in the BSV Hackathon with Carl Jackett" },
            { group: 2, id: 2, title: "London Meetup" },
            { group: 3, id: 3, title: "BSV Alias" },
            { group: 4, id: 4, title: "The Power of Simple with Wei Zhang" }
        ],
        links: [
            {source: 1, target: 2, curvature: 0.8, rotation: Math.PI * 1 / 6 },
            {source: 3, target: 2, curvature: 0.8, rotation: Math.PI * 1 / 6 },
            {source: 4, target: 2, curvature: 0.8, rotation: Math.PI * 1 / 6 }
        ]
    };

    function _handleClick(node) {
        // Aim at node from outside it
        const distance = 40;
        const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
        fg.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node, // lookAt ({ x, y, z })
            3000  // ms transition duration
        );
    }

    return (
        <div
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }}
        >
        <div className={classes.root}>
            <CssBaseline/>
            <Container component="main" className={classes.main} maxWidth="xl">
                <Typography variant="h2" component="h1" gutterBottom>
                    Hive Chrome Extension
                </Typography>

                {/*<Typography variant="h5" component="h2" gutterBottom>*/}
                {/*  {'Pin a footer to the bottom of the viewport.'}*/}
                {/*  {'The footer will move as the main element of the page grows.'}*/}
                {/*</Typography>*/}
                {/*<Typography variant="body1">Sticky footer placeholder.</Typography>*/}
                <ForceGraph3D
                    height={700}
                    width={1000}
                    graphData={hiveData}
                    nodeAutoColorBy="group"
                    nodeLabel="title"
                    linkDirectionalArrowLength={3.5}
                    linkDirectionalArrowRelPos={1}
                    linkWidth={2}
                    linkCurvature="curvature"
                    linkCurveRotation="rotation"
                    linkDirectionalParticles={2}
                    ref={el => { setFg(el) }}
                    onNodeClick={_handleClick}
                />

            </Container>
            <footer className={classes.footer}>
                <Container maxWidth="xl">
                    <h3>Add HiveNode</h3>
                </Container>
            </footer>
        </div>
        </div>
    );
}
