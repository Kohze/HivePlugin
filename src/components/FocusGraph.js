import React from 'react';
import {ForceGraph3D} from "react-force-graph";

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

export default class FocusGraph extends React.Component {

    _handleClick = node => {
        // Aim at node from outside it
        const distance = 40;
        const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
        this.fg.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node, // lookAt ({ x, y, z })
            3000  // ms transition duration
        );
    };

    render() {
        return <ForceGraph3D
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
            ref={el => { this.fg = el; }}
            onNodeClick={this._handleClick}
        />;
    }
};
