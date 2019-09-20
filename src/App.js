import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {ForceGraph3D} from "react-force-graph";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    tabRoot: {
        width: '400px',
        backgroundColor: theme.palette.background.paper,
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
    image: {
        maxHeight: '280px',
        height: 'auto',
        align: 'center',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '95%'
    }
}));

export default function App() {
    const classes = useStyles();

    const [fg, setFg] = useState(0);

    //currentNode:
    const [nodeGroup, setNodeGroup] = useState(0);
    const [nodeId, setNodeId] = useState(0);
    const [nodeName, setNodeName] = useState("Hive");
    const [nodeDescription, setNodeDescription] = useState("Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.");
    const [nodeOwner, setNodeOwner] = useState("");
    const [nodeUrl, setNodeUrl] = useState("https://hive-e330f.firebaseapp.com/");
    const [nodeImage, setNodeImage] = useState("http://hive.kohze.com/images/header-image-dark.png");
    const [nodeHiveOrigin, setNodeHiveOrigin] = useState("");
    const [nodePreviousNode, setNodePreviousNode] = useState("");

    //newNode:
    const [newNodeGroup, setNewNodeGroup] = useState(0);
    const [newNodeId, setNewNodeId] = useState(0);
    const [newNodeName, setNewNodeName] = useState("");
    const [newNodeDescription, setNewNodeDescription] = useState("");
    const [newNodeOwner, setNewNodeOwner] = useState("");
    const [newNodeUrl, setNewNodeUrl] = useState("");
    const [newNodeImage, setNewNodeImage] = useState("");
    const [newNodeHiveOrigin, setNewNodeHiveOrigin] = useState("");
    const [newNodePreviousNode, setNewNodePreviousNode] = useState("");


    // group reference:
    // 1: not yet visited
    // 2: already visited
    // 3: likes
    const hiveData = {
        nodes: [
            {group: 2, id: 1, name: "Hive!"},

            {
                group: 2,
                id: "6c3199b2c5cc8a57159722d1b76536d54385fd670827a20b18f64f367b3ca3ce_o2",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "02756bc5aa14a990385f4a102767ce8a7fa73b0f3372cfb3b84be7463c6a15ed90",
                origin: "6c3199b2c5cc8a57159722d1b76536d54385fd670827a20b18f64f367b3ca3ce_o2",
                previousNode: "e0cb1031e63d3ef93a1089ceb13ffd8493557fd084bccc7ec719ddeec5b44238_o2"
            },
            {
                group: 2,
                id: "5418b7b583ed3ba6aa8113e82b0a30126923317b0cc944800bba669303d1c26d_o2",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "02756bc5aa14a990385f4a102767ce8a7fa73b0f3372cfb3b84be7463c6a15ed90",
                origin: "5418b7b583ed3ba6aa8113e82b0a30126923317b0cc944800bba669303d1c26d_o2",
                previousNode: "e0cb1031e63d3ef93a1089ceb13ffd8493557fd084bccc7ec719ddeec5b44238_o2"
            },
            {
                group: 2,
                id: "e0cb1031e63d3ef93a1089ceb13ffd8493557fd084bccc7ec719ddeec5b44238_o2",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "02756bc5aa14a990385f4a102767ce8a7fa73b0f3372cfb3b84be7463c6a15ed90",
                origin: "e0cb1031e63d3ef93a1089ceb13ffd8493557fd084bccc7ec719ddeec5b44238_o2",
                previousNode: "e0cb1031e63d3ef93a1089ceb13ffd8493557fd084bccc7ec719ddeec5b44238_o2"
            },
            {
                group: 2,
                id: "a096607b68ef10088caa1b2239ddc7d30940e1f2a707efd1de315519127b1033_o2",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "02756bc5aa14a990385f4a102767ce8a7fa73b0f3372cfb3b84be7463c6a15ed90",
                origin: "a096607b68ef10088caa1b2239ddc7d30940e1f2a707efd1de315519127b1033_o2",
                previousNode: "e0cb1031e63d3ef93a1089ceb13ffd8493557fd084bccc7ec719ddeec5b44238_o2"
            },
            {
                group: 3,
                id: "448c10c1192db06f30bdd7943179aee180c992e3041ada79af273c90fd6d5e99_o2",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "02756bc5aa14a990385f4a102767ce8a7fa73b0f3372cfb3b84be7463c6a15ed90",
                origin: "448c10c1192db06f30bdd7943179aee180c992e3041ada79af273c90fd6d5e99_o2",
                previousNode: "e0cb1031e63d3ef93a1089ceb13ffd8493557fd084bccc7ec719ddeec5b44238_o2"
            },

            {
                group: 1,
                id: "030e113a95ad10148dc5f5159da447ba9918ca4ee4aa82cd07e744446abd1e61_o2",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "035e939b704a822a03300686ca968da7839c6dc9078b40ee3e8239fdf98574826f",
                origin: "030e113a95ad10148dc5f5159da447ba9918ca4ee4aa82cd07e744446abd1e61_o2",
                previousNode: "e0cb1031e63d3ef93a1089ceb13ffd8493557fd084bccc7ec719ddeec5b44238_o2"
            },

            {
                group: 1,
                id: "44b7891370481142b19bc3e67346ec836ee0311d61881f6d1e2f86873b7f6ab0_o2",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "035e939b704a822a03300686ca968da7839c6dc9078b40ee3e8239fdf98574826f",
                origin: "44b7891370481142b19bc3e67346ec836ee0311d61881f6d1e2f86873b7f6ab0_o2",
                previousNode: "e0cb1031e63d3ef93a1089ceb13ffd8493557fd084bccc7ec719ddeec5b44238_o2"
            },
            {
                group: 1,
                id: "0b39856df9e9d31a94661139a048c4dbfeb3b3632325208cf598d83583d97d92_o2",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "02756bc5aa14a990385f4a102767ce8a7fa73b0f3372cfb3b84be7463c6a15ed90",
                origin: "0b39856df9e9d31a94661139a048c4dbfeb3b3632325208cf598d83583d97d92_o2",
                previousNode: "e0cb1031e63d3ef93a1089ceb13ffd8493557fd084bccc7ec719ddeec5b44238_o2"
            },

            {
                group: 1,
                id: "223dc38baa87af15f947d0dce260da1265e89f5e773c254a5aff115b9a75ff93_o2",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "035e939b704a822a03300686ca968da7839c6dc9078b40ee3e8239fdf98574826f",
                origin: "223dc38baa87af15f947d0dce260da1265e89f5e773c254a5aff115b9a75ff93_o2",
                previousNode: "e0cb1031e63d3ef93a1089ceb13ffd8493557fd084bccc7ec719ddeec5b44238_o2"
            },
            {
                group: 1,
                id: "7147376d4a0fd01aa20c3c18459bd42f272fc6ff674a65141a5365ece5187cdf_o2",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "02756bc5aa14a990385f4a102767ce8a7fa73b0f3372cfb3b84be7463c6a15ed90",
                origin: "7147376d4a0fd01aa20c3c18459bd42f272fc6ff674a65141a5365ece5187cdf_o2",
                previousNode: "e0cb1031e63d3ef93a1089ceb13ffd8493557fd084bccc7ec719ddeec5b44238_o2"
            },

            {
                group: 1,
                id: "71c5a7589ee8b52eac815649b8dc7f6323fecc094efcd794467293050cc19b30_o2",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "02756bc5aa14a990385f4a102767ce8a7fa73b0f3372cfb3b84be7463c6a15ed90",
                origin: "71c5a7589ee8b52eac815649b8dc7f6323fecc094efcd794467293050cc19b30_o2",
                previousNode: "e0cb1031e63d3ef93a1089ceb13ffd8493557fd084bccc7ec719ddeec5b44238_o2"
            },

            {
                group: 1,
                id: "34eddcb120c181bbd7c88f4fd6658340f5ab8f21be7e9a707fffa05cba92174f_o2",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "02756bc5aa14a990385f4a102767ce8a7fa73b0f3372cfb3b84be7463c6a15ed90",
                origin: "34eddcb120c181bbd7c88f4fd6658340f5ab8f21be7e9a707fffa05cba92174f_o2",
                previousNode: "e0cb1031e63d3ef93a1089ceb13ffd8493557fd084bccc7ec719ddeec5b44238_o2"
            },
            {
                group: 1,
                id: "91635449461fd52259f4542cee78fc58fab35b0737bc362fadcdd8602d1cf547_o2",
                name: "Craig Wright",
                description: "Craig Steven Wright (born October 1970) is an Australian computer scientist and businessman. He has publicly claimed to be the main part of the team that created bitcoin, and the identity behind the pseudonym Satoshi Nakamoto.",
                image: "https://static.coindesk.com/wp-content/uploads/2018/04/Craig-Wright-860x430.png",
                url: "https://craigwright.net/",
                owner: "02756bc5aa14a990385f4a102767ce8a7fa73b0f3372cfb3b84be7463c6a15ed90",
                origin: "91635449461fd52259f4542cee78fc58fab35b0737bc362fadcdd8602d1cf547_o2",
                previousNode: "e0cb1031e63d3ef93a1089ceb13ffd8493557fd084bccc7ec719ddeec5b44238_o2"
            }
        ],
        links: [
            {source: "6c3199b2c5cc8a57159722d1b76536d54385fd670827a20b18f64f367b3ca3ce_o2", target: 1, curvature: 0.8, rotation: Math.PI * 1 / 6},

            {source: "5418b7b583ed3ba6aa8113e82b0a30126923317b0cc944800bba669303d1c26d_o2", target: "6c3199b2c5cc8a57159722d1b76536d54385fd670827a20b18f64f367b3ca3ce_o2", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "e0cb1031e63d3ef93a1089ceb13ffd8493557fd084bccc7ec719ddeec5b44238_o2", target: "5418b7b583ed3ba6aa8113e82b0a30126923317b0cc944800bba669303d1c26d_o2", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "a096607b68ef10088caa1b2239ddc7d30940e1f2a707efd1de315519127b1033_o2", target: "5418b7b583ed3ba6aa8113e82b0a30126923317b0cc944800bba669303d1c26d_o2", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "448c10c1192db06f30bdd7943179aee180c992e3041ada79af273c90fd6d5e99_o2", target: "5418b7b583ed3ba6aa8113e82b0a30126923317b0cc944800bba669303d1c26d_o2", curvature: 0.8, rotation: Math.PI * 1 / 6},

            {source: "030e113a95ad10148dc5f5159da447ba9918ca4ee4aa82cd07e744446abd1e61_o2", target: 1, curvature: 0.8, rotation: Math.PI * 1 / 6},

            {source: "44b7891370481142b19bc3e67346ec836ee0311d61881f6d1e2f86873b7f6ab0_o2", target: 1, curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "0b39856df9e9d31a94661139a048c4dbfeb3b3632325208cf598d83583d97d92_o2", target: "44b7891370481142b19bc3e67346ec836ee0311d61881f6d1e2f86873b7f6ab0_o2", curvature: 0.8, rotation: Math.PI * 1 / 6},

            {source: "223dc38baa87af15f947d0dce260da1265e89f5e773c254a5aff115b9a75ff93_o2", target: 1, curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "7147376d4a0fd01aa20c3c18459bd42f272fc6ff674a65141a5365ece5187cdf_o2", target: "223dc38baa87af15f947d0dce260da1265e89f5e773c254a5aff115b9a75ff93_o2", curvature: 0.8, rotation: Math.PI * 1 / 6},

            {source: "71c5a7589ee8b52eac815649b8dc7f6323fecc094efcd794467293050cc19b30_o2", target: 1, curvature: 0.8, rotation: Math.PI * 1 / 6},

            {source: "34eddcb120c181bbd7c88f4fd6658340f5ab8f21be7e9a707fffa05cba92174f_o2", target: 1, curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "91635449461fd52259f4542cee78fc58fab35b0737bc362fadcdd8602d1cf547_o2", target: "34eddcb120c181bbd7c88f4fd6658340f5ab8f21be7e9a707fffa05cba92174f_o2", curvature: 0.8, rotation: Math.PI * 1 / 6},
        ]
    };

    function _handleClick(node) {
        // Aim at node from outside it
        const distance = 40;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
        fg.cameraPosition(
            {x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio}, // new position
            node, // lookAt ({ x, y, z })
            3000  // ms transition duration
        );

        setNodeGroup(node.group);
        setNodeId(node.id);
        setNodeName(node.name);
        setNodeDescription(node.description);
        setNodeOwner(node.owner);
        setNodeUrl(node.url);
        setNodeImage(node.image);
        setNodeHiveOrigin(node.origin);
        setNodePreviousNode(node.previousNode);

        setNewNodeGroup(node.group);
        setNewNodeId(node.id);
        setNewNodeName(node.name);
        setNewNodeDescription(node.description);
        setNewNodeOwner(node.owner);
        setNewNodeUrl(node.url);
        setNewNodeImage(node.image);
        setNewNodeHiveOrigin(node.origin);
        setNodePreviousNode(node.previousNode);
    }

    const _handleSubmit = (evt) => {
        evt.preventDefault();
    };

    const [value, setValue] = React.useState(0);

    function handleChange(evt, newValue) {
        evt.preventDefault();
        setValue(newValue);
    }

    return (
            <div className={classes.root}>
                <Container component="main" className={classes.main} maxWidth="xl">

                    <Typography variant="h4" component="h1" gutterBottom>
                        Hive Chrome Extension
                    </Typography>

                    <ForceGraph3D
                        graphData={hiveData}
                        nodeAutoColorBy="group"
                        nodeLabel="name"
                        linkDirectionalArrowLength={3.5}
                        linkDirectionalArrowRelPos={1}
                        linkWidth={2}
                        linkCurvature="curvature"
                        linkCurveRotation="rotation"
                        linkDirectionalParticles={2}
                        ref={el => {
                            setFg(el)
                        }}
                        onNodeClick={_handleClick}
                    />

                    <Drawer
                        variant="permanent"
                        style={{width: 400}}
                        anchor="right"
                    >
                        <Paper className={classes.tabRoot}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                <Tab label="View Hive Node" />
                                <Tab label="Add Hive Node" />
                            </Tabs>
                            <TabPanel value={value} index={0}>

                                <Typography variant="h5" component="h2" gutterBottom>
                                    { nodeName }
                                </Typography>
                                    { nodeDescription }
                                <Typography variant="h5" component="h2" gutterBottom>
                                    <Link href={nodeUrl} target={"_blank"} variant="body2" className={classes.link}>
                                        Go to page
                                    </Link>
                                </Typography>
                                <Link href={nodeUrl} target={"_blank"} variant="body2" className={classes.link}>
                                    <img className={classes.image} src={ nodeImage } />
                                </Link>

                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <h3>Details</h3>
                                <form onSubmit={_handleSubmit}>
                                    <TextField
                                        label="Name"
                                        value={nodeName}
                                        onChange={e => setNodeName(e.target.value)}
                                        fullWidth
                                    />
                                    <br/>
                                    <TextField
                                        label="description"
                                        value={nodeDescription}
                                        onChange={e => setNodeDescription(e.target.value)}
                                        fullWidth
                                    />
                                    <br/>
                                    <TextField
                                        label="URL"
                                        value={nodeUrl}
                                        onChange={e => setNodeUrl(e.target.value)}
                                        fullWidth
                                    />
                                    <br/>
                                    <TextField
                                        label="Image"
                                        value={nodeImage}
                                        onChange={e => setNodeImage(e.target.value)}
                                        fullWidth
                                    />
                                    <br/>
                                    <TextField
                                        label="Previous Node"
                                        value={nodePreviousNode}
                                        onChange={e => setNodePreviousNode(e.target.value)}
                                        fullWidth
                                    />
                                    <br/>
                                    <br/>
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        color="primary"
                                        onClick={_handleSubmit}
                                    >Add Hive Node</Button>
                                    <br/>
                                    <br/>
                                </form>
                            </TabPanel>
                        </Paper>

                    </Drawer>

                </Container>

                <footer className={classes.footer}>
                    <Container maxWidth="xl">


                    </Container>
                </footer>
            </div>
    );
}
