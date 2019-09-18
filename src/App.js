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

    //currentNode:
    const [nodeGroup, setNodeGroup] = useState(0);
    const [nodeId, setNodeId] = useState(0);
    const [nodeName, setNodeName] = useState("");
    const [nodeDescription, setNodeDescription] = useState("");
    const [nodeOwner, setNodeOwner] = useState("");
    const [nodeUrl, setNodeUrl] = useState("");
    const [nodeImage, setNodeImage] = useState("");
    const [nodeHiveOrigin, setNodeHiveOrigin] = useState("");
    const [nodePreviousNode, setNodePreviousNode] = useState("");

    // group reference:
    // 1: not yet visited
    // 2: already visited
    // 3: likes
    const hiveData = {

        nodes: [
            { group: 2, id: 1, name: "Hive!"},

            { group: 2, id: 100, name: "SV Meetups"},
            { group: 2, id: 101, name: "Ideas Born in the BSV Hackathon with Carl Jackett" },
            { group: 2, id: 102, name: "London Meetup" },
            { group: 2, id: 103, name: "BSV Alias" },
            { group: 3, id: 104, name: "The Power of Simple with Wei Zhang" },

            { group: 1, id: 200, name: "Tether"},

            { group: 1, id: 300, name: "SpaceX"},
            { group: 1, id: 301, name: "Falcon Heavy"},

            { group: 1, id: 400, name: "Smartphones"},
            { group: 1, id: 401, name: "Apple Iphone"},

            { group: 1, id: 500, name: "Elon Musk"},

            { group: 1, id: 600, name: "The Nakamoto Case"},
            { group: 1, id: 601, name: "Craig Wright"}
        ],
        links: [
            {source: 100, target: 1, curvature: 0.8, rotation: Math.PI * 1 / 6 },

            {source: 101, target: 100, curvature: 0.8, rotation: Math.PI * 1 / 6 },
            {source: 102, target: 101, curvature: 0.8, rotation: Math.PI * 1 / 6 },
            {source: 103, target: 101, curvature: 0.8, rotation: Math.PI * 1 / 6 },
            {source: 104, target: 101, curvature: 0.8, rotation: Math.PI * 1 / 6 },

            {source: 200, target: 1, curvature: 0.8, rotation: Math.PI * 1 / 6 },

            {source: 300, target: 1, curvature: 0.8, rotation: Math.PI * 1 / 6 },
            {source: 301, target: 300, curvature: 0.8, rotation: Math.PI * 1 / 6 },

            {source: 400, target: 1, curvature: 0.8, rotation: Math.PI * 1 / 6 },
            {source: 401, target: 400, curvature: 0.8, rotation: Math.PI * 1 / 6 },

            {source: 500, target: 1, curvature: 0.8, rotation: Math.PI * 1 / 6 },

            {source: 600, target: 1, curvature: 0.8, rotation: Math.PI * 1 / 6 },
            {source: 601, target: 600, curvature: 0.8, rotation: Math.PI * 1 / 6 },
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

    const [name, setName] = useState("");
    const _handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting Name ${name}`);
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
                    nodeLabel="name"
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

                    <form onSubmit={_handleSubmit}>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={nodeName}
                                onChange={e => setNodeName(e.target.value)}
                            />
                        </label>

                        <label>
                            Description:
                            <input
                                type="text"
                                value={nodeDescription}
                                onChange={e => setNodeDescription(e.target.value)}
                            />
                        </label>

                        <label>
                            URL:
                            <input
                                type="text"
                                value={nodeUrl}
                                onChange={e => setNodeUrl(e.target.value)}
                            />
                        </label>

                        <label>
                            Image:
                            <input
                                type="text"
                                value={nodeImage}
                                onChange={e => setNodeImage(e.target.value)}
                            />
                        </label>

                        <label>
                            Previous Node:
                            <input
                                type="text"
                                value={nodePreviousNode}
                                onChange={e => setNodePreviousNode(e.target.value)}
                            />
                        </label>

                        <input type="submit" value="Submit" />
                    </form>

                </Container>
            </footer>
        </div>
        </div>
    );
}
