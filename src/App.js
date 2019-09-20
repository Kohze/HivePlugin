import React, {useState} from 'react';
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

import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

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
    const [nodeUrl, setNodeUrl] = useState("http://hive.kohze.com/");
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

    const [showAlert, setShowAlert] = useState(false);

    // group reference:
    // 1: not yet visited
    // 2: already visited
    // 3: likes
    const [hiveData, setHiveData] = useState({
        nodes: [
            {
                group: 2,
                id: "82228538",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "66404430",
                origin: "82228538",
                previousNode: "88447580"
            }
            , {
                group: 3,
                id: "91494596",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "106588749",
                origin: "91494596",
                previousNode: "34648001"
            }
            , {
                group: 1,
                id: "69587702",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "40915947",
                origin: "69587702",
                previousNode: "112740383"
            }
            , {
                group: 3,
                id: "119270240",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "86765964",
                origin: "119270240",
                previousNode: "78739192"
            }
            , {
                group: 1,
                id: "10399903",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "45512215",
                origin: "10399903",
                previousNode: "11851144"
            }
            , {
                group: 3,
                id: "93441041",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "52289243",
                origin: "93441041",
                previousNode: "2500515"
            }
            , {
                group: 3,
                id: "80462298",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "114968414",
                origin: "80462298",
                previousNode: "46929152"
            }
            , {
                group: 3,
                id: "69754454",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "99283468",
                origin: "69754454",
                previousNode: "57377677"
            }
            , {
                group: 2,
                id: "32131369",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "88085809",
                origin: "32131369",
                previousNode: "29078051"
            }
            , {
                group: 2,
                id: "102709487",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "94577924",
                origin: "102709487",
                previousNode: "29519574"
            }
            , {
                group: 2,
                id: "23450977",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "8411994",
                origin: "23450977",
                previousNode: "27640435"
            }
            , {
                group: 3,
                id: "43885038",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "107287116",
                origin: "43885038",
                previousNode: "64052262"
            }
            , {
                group: 1,
                id: "39519950",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "65853286",
                origin: "39519950",
                previousNode: "55772223"
            }
            , {
                group: 2,
                id: "15547426",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "41852132",
                origin: "15547426",
                previousNode: "69301596"
            }
            , {
                group: 3,
                id: "69589373",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "15351245",
                origin: "69589373",
                previousNode: "50819761"
            }
            , {
                group: 2,
                id: "51294450",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "28358925",
                origin: "51294450",
                previousNode: "74478151"
            }
            , {
                group: 2,
                id: "105554236",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "109372871",
                origin: "105554236",
                previousNode: "33377135"
            }
            , {
                group: 1,
                id: "76850062",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "76611156",
                origin: "76850062",
                previousNode: "116584075"
            }
            , {
                group: 1,
                id: "16419212",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "19171905",
                origin: "16419212",
                previousNode: "119083126"
            }
            , {
                group: 2,
                id: "6890263",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "46495922",
                origin: "6890263",
                previousNode: "23185570"
            }
            , {
                group: 3,
                id: "79464247",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "92487429",
                origin: "79464247",
                previousNode: "117745252"
            }
            , {
                group: 2,
                id: "49234009",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "117240594",
                origin: "49234009",
                previousNode: "58800654"
            }
            , {
                group: 2,
                id: "16380237",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "66228841",
                origin: "16380237",
                previousNode: "73101611"
            }
            , {
                group: 3,
                id: "121974795",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "96938621",
                origin: "121974795",
                previousNode: "112989345"
            }
            , {
                group: 3,
                id: "19099457",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "33526430",
                origin: "19099457",
                previousNode: "42931428"
            }
            , {
                group: 3,
                id: "78395687",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "113162463",
                origin: "78395687",
                previousNode: "93635515"
            }
            , {
                group: 3,
                id: "6202942",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "92778966",
                origin: "6202942",
                previousNode: "20768377"
            }
            , {
                group: 3,
                id: "97922124",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "55820021",
                origin: "97922124",
                previousNode: "74802869"
            }
            , {
                group: 3,
                id: "106102417",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "53847892",
                origin: "106102417",
                previousNode: "57437857"
            }
            , {
                group: 1,
                id: "7507539",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "119251609",
                origin: "7507539",
                previousNode: "37933374"
            }
            , {
                group: 1,
                id: "37356739",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "60287350",
                origin: "37356739",
                previousNode: "105322882"
            }
            , {
                group: 3,
                id: "55092195",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "52873967",
                origin: "55092195",
                previousNode: "82737432"
            }
            , {
                group: 2,
                id: "67414387",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "2271456",
                origin: "67414387",
                previousNode: "59451455"
            }
            , {
                group: 2,
                id: "53844782",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "32220752",
                origin: "53844782",
                previousNode: "36990475"
            }
            , {
                group: 1,
                id: "88194561",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "111186974",
                origin: "88194561",
                previousNode: "7215297"
            }
            , {
                group: 3,
                id: "59351745",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "31681445",
                origin: "59351745",
                previousNode: "108512763"
            }
            , {
                group: 3,
                id: "33440315",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "104109623",
                origin: "33440315",
                previousNode: "99184116"
            }
            , {
                group: 3,
                id: "51919628",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "106734194",
                origin: "51919628",
                previousNode: "89529626"
            }
            , {
                group: 1,
                id: "110007129",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "26123937",
                origin: "110007129",
                previousNode: "106910857"
            }
            , {
                group: 1,
                id: "93700252",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "121931060",
                origin: "93700252",
                previousNode: "541933"
            }
            , {
                group: 3,
                id: "76336654",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "10976851",
                origin: "76336654",
                previousNode: "101199229"
            }
            , {
                group: 2,
                id: "12852685",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "34930400",
                origin: "12852685",
                previousNode: "68629347"
            }
            , {
                group: 1,
                id: "114974178",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "41968004",
                origin: "114974178",
                previousNode: "82502487"
            }
            , {
                group: 2,
                id: "44170675",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "27500350",
                origin: "44170675",
                previousNode: "46891542"
            }
            , {
                group: 1,
                id: "4506828",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "58309879",
                origin: "4506828",
                previousNode: "93247318"
            }
            , {
                group: 1,
                id: "25338737",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "27705967",
                origin: "25338737",
                previousNode: "85479384"
            }
            , {
                group: 3,
                id: "23549782",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "19158144",
                origin: "23549782",
                previousNode: "6211416"
            }
            , {
                group: 3,
                id: "65673350",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "44142447",
                origin: "65673350",
                previousNode: "122363109"
            }
            , {
                group: 2,
                id: "73335589",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "106827787",
                origin: "73335589",
                previousNode: "114490575"
            }
            , {
                group: 3,
                id: "85193212",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "114977772",
                origin: "85193212",
                previousNode: "49851493"
            }
            , {
                group: 3,
                id: "102998094",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "87748312",
                origin: "102998094",
                previousNode: "78521455"
            }
            , {
                group: 3,
                id: "86334669",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "102240025",
                origin: "86334669",
                previousNode: "64127970"
            }
            , {
                group: 3,
                id: "8749724",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "62912912",
                origin: "8749724",
                previousNode: "27066081"
            }
            , {
                group: 1,
                id: "38459894",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "96492683",
                origin: "38459894",
                previousNode: "43922606"
            }
            , {
                group: 2,
                id: "26199250",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "116299833",
                origin: "26199250",
                previousNode: "2764943"
            }
            , {
                group: 2,
                id: "89634003",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "115683966",
                origin: "89634003",
                previousNode: "16068588"
            }
            , {
                group: 1,
                id: "64555012",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "47015179",
                origin: "64555012",
                previousNode: "85073904"
            }
            , {
                group: 2,
                id: "47033299",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "92835857",
                origin: "47033299",
                previousNode: "87736807"
            }
            , {
                group: 2,
                id: "69957554",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "3784998",
                origin: "69957554",
                previousNode: "56770313"
            }
            , {
                group: 3,
                id: "49011486",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "88445042",
                origin: "49011486",
                previousNode: "108199086"
            }
            , {
                group: 3,
                id: "3678586",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "105923438",
                origin: "3678586",
                previousNode: "99733911"
            }
            , {
                group: 2,
                id: "63174059",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "25153117",
                origin: "63174059",
                previousNode: "67485080"
            }
            , {
                group: 2,
                id: "7683436",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "101571259",
                origin: "7683436",
                previousNode: "84930766"
            }
            , {
                group: 2,
                id: "78920708",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "77490901",
                origin: "78920708",
                previousNode: "66531780"
            }
            , {
                group: 2,
                id: "105960299",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "40528276",
                origin: "105960299",
                previousNode: "59899018"
            }
            , {
                group: 2,
                id: "108551186",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "10930878",
                origin: "108551186",
                previousNode: "18482157"
            }
            , {
                group: 2,
                id: "6779711",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "78011624",
                origin: "6779711",
                previousNode: "113503175"
            }
            , {
                group: 2,
                id: "50204913",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "101718726",
                origin: "50204913",
                previousNode: "88400051"
            }
            , {
                group: 1,
                id: "11192281",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "111116069",
                origin: "11192281",
                previousNode: "46582751"
            }
            , {
                group: 2,
                id: "1980127",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "54179431",
                origin: "1980127",
                previousNode: "51920145"
            }
            , {
                group: 2,
                id: "82199210",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "84298999",
                origin: "82199210",
                previousNode: "119656838"
            }
            , {
                group: 1,
                id: "82100305",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "45590060",
                origin: "82100305",
                previousNode: "63057836"
            }
            , {
                group: 3,
                id: "92934680",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "30029152",
                origin: "92934680",
                previousNode: "121391071"
            }
            , {
                group: 2,
                id: "50765600",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "54719961",
                origin: "50765600",
                previousNode: "98311300"
            }
            , {
                group: 2,
                id: "90409920",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "106491687",
                origin: "90409920",
                previousNode: "33770943"
            }
            , {
                group: 1,
                id: "66394528",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "86824392",
                origin: "66394528",
                previousNode: "16362253"
            }
            , {
                group: 2,
                id: "87262538",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "108332498",
                origin: "87262538",
                previousNode: "70426737"
            }
            , {
                group: 1,
                id: "75384915",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "72694243",
                origin: "75384915",
                previousNode: "65256733"
            }
            , {
                group: 3,
                id: "37395451",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "43419715",
                origin: "37395451",
                previousNode: "76355266"
            }
            , {
                group: 3,
                id: "13551111",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "110501793",
                origin: "13551111",
                previousNode: "31046077"
            }
            , {
                group: 3,
                id: "103201636",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "77224706",
                origin: "103201636",
                previousNode: "42433552"
            }
            , {
                group: 1,
                id: "77607244",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "26630581",
                origin: "77607244",
                previousNode: "97549037"
            }
            , {
                group: 3,
                id: "47986394",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "80958831",
                origin: "47986394",
                previousNode: "47379816"
            }
            , {
                group: 2,
                id: "23037762",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "101553425",
                origin: "23037762",
                previousNode: "75883012"
            }
            , {
                group: 1,
                id: "2251321",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "15253523",
                origin: "2251321",
                previousNode: "65322310"
            }
            , {
                group: 2,
                id: "6620220",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "50294103",
                origin: "6620220",
                previousNode: "89950390"
            }
            , {
                group: 3,
                id: "57722416",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "32452474",
                origin: "57722416",
                previousNode: "4014770"
            }
            , {
                group: 1,
                id: "10194222",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "109500599",
                origin: "10194222",
                previousNode: "82530098"
            }
            , {
                group: 1,
                id: "92093461",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "26627056",
                origin: "92093461",
                previousNode: "119382363"
            }
            , {
                group: 3,
                id: "4240857",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "94998910",
                origin: "4240857",
                previousNode: "77119459"
            }
            , {
                group: 3,
                id: "115592846",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "94719353",
                origin: "115592846",
                previousNode: "98020947"
            }
            , {
                group: 1,
                id: "62832517",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "39192434",
                origin: "62832517",
                previousNode: "23652015"
            }
            , {
                group: 1,
                id: "75330415",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "768994",
                origin: "75330415",
                previousNode: "99825302"
            }
            , {
                group: 3,
                id: "48916490",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "86842133",
                origin: "48916490",
                previousNode: "77508694"
            }
            , {
                group: 3,
                id: "115391071",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "92672985",
                origin: "115391071",
                previousNode: "30772366"
            }
            , {
                group: 1,
                id: "12132072",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "6091646",
                origin: "12132072",
                previousNode: "19445269"
            }
            , {
                group: 2,
                id: "28804906",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "99127955",
                origin: "28804906",
                previousNode: "51420541"
            }
            , {
                group: 1,
                id: "96580612",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "113712258",
                origin: "96580612",
                previousNode: "88906930"
            }
            , {
                group: 1,
                id: "111677142",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "56243326",
                origin: "111677142",
                previousNode: "14049894"
            }
            , {
                group: 3,
                id: "96212107",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "30370952",
                origin: "96212107",
                previousNode: "55707875"
            }
            , {
                group: 3,
                id: "28803477",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "38023830",
                origin: "28803477",
                previousNode: "37577919"
            }
            , {
                group: 1,
                id: "41117644",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "110681303",
                origin: "41117644",
                previousNode: "101266235"
            }
            , {
                group: 3,
                id: "440455",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "72534387",
                origin: "440455",
                previousNode: "96932647"
            }
            , {
                group: 1,
                id: "5001764",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "82240574",
                origin: "5001764",
                previousNode: "38431731"
            }
            , {
                group: 3,
                id: "86124537",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "71161896",
                origin: "86124537",
                previousNode: "68360695"
            }
            , {
                group: 3,
                id: "27751425",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "5705681",
                origin: "27751425",
                previousNode: "115031312"
            }
            , {
                group: 2,
                id: "92134052",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "29700350",
                origin: "92134052",
                previousNode: "122992986"
            }
            , {
                group: 1,
                id: "79528057",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "26801228",
                origin: "79528057",
                previousNode: "85141833"
            }
            , {
                group: 3,
                id: "65450143",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "78629203",
                origin: "65450143",
                previousNode: "87016887"
            }
            , {
                group: 3,
                id: "73660776",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "118126132",
                origin: "73660776",
                previousNode: "84120838"
            }
            , {
                group: 3,
                id: "120298307",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "25498075",
                origin: "120298307",
                previousNode: "117378231"
            }
            , {
                group: 2,
                id: "102354818",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "32698809",
                origin: "102354818",
                previousNode: "33452369"
            }
            , {
                group: 3,
                id: "13468125",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "22548053",
                origin: "13468125",
                previousNode: "70945639"
            }
            , {
                group: 2,
                id: "11235080",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "79052916",
                origin: "11235080",
                previousNode: "121815632"
            }
            , {
                group: 2,
                id: "22680773",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "23799799",
                origin: "22680773",
                previousNode: "66642159"
            }
            , {
                group: 2,
                id: "96394071",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "62123801",
                origin: "96394071",
                previousNode: "115632411"
            }
            , {
                group: 3,
                id: "120553480",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "51274521",
                origin: "120553480",
                previousNode: "60113583"
            }
            , {
                group: 2,
                id: "117562744",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "58688381",
                origin: "117562744",
                previousNode: "111061044"
            }
            , {
                group: 1,
                id: "94628289",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "50251114",
                origin: "94628289",
                previousNode: "50104622"
            }
            , {
                group: 3,
                id: "98814307",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "86671788",
                origin: "98814307",
                previousNode: "95026317"
            }
            , {
                group: 1,
                id: "69821314",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "7478709",
                origin: "69821314",
                previousNode: "9106400"
            }
            , {
                group: 3,
                id: "21272579",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "39853287",
                origin: "21272579",
                previousNode: "71882430"
            }
            , {
                group: 2,
                id: "90896372",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "65430073",
                origin: "90896372",
                previousNode: "50394228"
            }
            , {
                group: 2,
                id: "18092992",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "59593763",
                origin: "18092992",
                previousNode: "21008739"
            }
            , {
                group: 1,
                id: "28091700",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "55279217",
                origin: "28091700",
                previousNode: "88879315"
            }
            , {
                group: 3,
                id: "116088886",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "99075473",
                origin: "116088886",
                previousNode: "102441094"
            }
            , {
                group: 1,
                id: "58552330",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "118016235",
                origin: "58552330",
                previousNode: "59209731"
            }
            , {
                group: 2,
                id: "24309979",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "37589138",
                origin: "24309979",
                previousNode: "112143577"
            }
            , {
                group: 1,
                id: "46502913",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "73085364",
                origin: "46502913",
                previousNode: "26495551"
            }
            , {
                group: 2,
                id: "18516404",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "6487487",
                origin: "18516404",
                previousNode: "119866193"
            }
            , {
                group: 3,
                id: "120230798",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "81557767",
                origin: "120230798",
                previousNode: "19264211"
            }
            , {
                group: 3,
                id: "100980529",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "49715656",
                origin: "100980529",
                previousNode: "31189976"
            }
            , {
                group: 1,
                id: "74337664",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "46154818",
                origin: "74337664",
                previousNode: "47047533"
            }
            , {
                group: 3,
                id: "117099802",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "20374410",
                origin: "117099802",
                previousNode: "68667185"
            }
            , {
                group: 3,
                id: "42871279",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "114787856",
                origin: "42871279",
                previousNode: "53287528"
            }
            , {
                group: 3,
                id: "62970956",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "79628844",
                origin: "62970956",
                previousNode: "34076741"
            }
            , {
                group: 3,
                id: "55844997",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "77473025",
                origin: "55844997",
                previousNode: "63962209"
            }
            , {
                group: 3,
                id: "95925582",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "73759497",
                origin: "95925582",
                previousNode: "68583751"
            }
            , {
                group: 2,
                id: "65048791",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "30591268",
                origin: "65048791",
                previousNode: "106274417"
            }
            , {
                group: 2,
                id: "105299466",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "27431152",
                origin: "105299466",
                previousNode: "97253942"
            }
            , {
                group: 3,
                id: "83916964",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "110146631",
                origin: "83916964",
                previousNode: "102107353"
            }
            , {
                group: 3,
                id: "23532385",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "80470950",
                origin: "23532385",
                previousNode: "52628742"
            }
            , {
                group: 1,
                id: "67223952",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "104389453",
                origin: "67223952",
                previousNode: "42964586"
            }
            , {
                group: 3,
                id: "89425818",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "78100828",
                origin: "89425818",
                previousNode: "96166489"
            }
            , {
                group: 1,
                id: "113075619",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "107833285",
                origin: "113075619",
                previousNode: "69122156"
            }
            , {
                group: 2,
                id: "62754219",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "76580727",
                origin: "62754219",
                previousNode: "112057778"
            }
            , {
                group: 2,
                id: "359607",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "52819994",
                origin: "359607",
                previousNode: "123039591"
            }
            , {
                group: 3,
                id: "61604588",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "46269900",
                origin: "61604588",
                previousNode: "33005850"
            }
            , {
                group: 1,
                id: "115705383",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "2239142",
                origin: "115705383",
                previousNode: "72668553"
            }
            , {
                group: 2,
                id: "87651381",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "72940083",
                origin: "87651381",
                previousNode: "62644094"
            }
            , {
                group: 3,
                id: "79097363",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "81692472",
                origin: "79097363",
                previousNode: "104860254"
            }
            , {
                group: 2,
                id: "107846065",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "38728299",
                origin: "107846065",
                previousNode: "33196391"
            }
            , {
                group: 2,
                id: "113868347",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "9464900",
                origin: "113868347",
                previousNode: "55084593"
            }
            , {
                group: 3,
                id: "30016737",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "9159438",
                origin: "30016737",
                previousNode: "118456044"
            }
            , {
                group: 2,
                id: "44467556",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "21463679",
                origin: "44467556",
                previousNode: "81582433"
            }
            , {
                group: 3,
                id: "116581922",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "108497255",
                origin: "116581922",
                previousNode: "78929603"
            }
            , {
                group: 1,
                id: "16922556",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "76692889",
                origin: "16922556",
                previousNode: "83734202"
            }
            , {
                group: 2,
                id: "70490466",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "73731577",
                origin: "70490466",
                previousNode: "85520347"
            }
            , {
                group: 1,
                id: "76956090",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "70699690",
                origin: "76956090",
                previousNode: "62384585"
            }
            , {
                group: 1,
                id: "52140124",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "77923967",
                origin: "52140124",
                previousNode: "10142596"
            }
            , {
                group: 2,
                id: "74237727",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "71990455",
                origin: "74237727",
                previousNode: "72572531"
            }
            , {
                group: 1,
                id: "67629031",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "109716560",
                origin: "67629031",
                previousNode: "63227146"
            }
            , {
                group: 2,
                id: "121222949",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "34725671",
                origin: "121222949",
                previousNode: "118476896"
            }
            , {
                group: 1,
                id: "113422925",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "87116278",
                origin: "113422925",
                previousNode: "75169264"
            }
            , {
                group: 2,
                id: "15296586",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "93025698",
                origin: "15296586",
                previousNode: "114571113"
            }
            , {
                group: 3,
                id: "18748824",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "74251971",
                origin: "18748824",
                previousNode: "60584294"
            }
            , {
                group: 3,
                id: "11443929",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "63714664",
                origin: "11443929",
                previousNode: "75780095"
            }
            , {
                group: 3,
                id: "86991279",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "1753588",
                origin: "86991279",
                previousNode: "62585983"
            }
            , {
                group: 3,
                id: "44300268",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "15802653",
                origin: "44300268",
                previousNode: "88649339"
            }
            , {
                group: 3,
                id: "21032899",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "50825426",
                origin: "21032899",
                previousNode: "96129617"
            }
            , {
                group: 1,
                id: "111119139",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "112261265",
                origin: "111119139",
                previousNode: "42010084"
            }
            , {
                group: 3,
                id: "52878962",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "62300804",
                origin: "52878962",
                previousNode: "110123702"
            }
            , {
                group: 1,
                id: "102181608",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "79574294",
                origin: "102181608",
                previousNode: "98951009"
            }
            , {
                group: 3,
                id: "46096779",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "84905717",
                origin: "46096779",
                previousNode: "81218438"
            }
            , {
                group: 1,
                id: "6851922",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "79633423",
                origin: "6851922",
                previousNode: "112550995"
            }
            , {
                group: 3,
                id: "5862060",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "52575465",
                origin: "5862060",
                previousNode: "74969274"
            }
            , {
                group: 3,
                id: "113119926",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "8595652",
                origin: "113119926",
                previousNode: "56619397"
            }
            , {
                group: 1,
                id: "8858566",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "54018565",
                origin: "8858566",
                previousNode: "35613774"
            }
            , {
                group: 3,
                id: "64086751",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "17044427",
                origin: "64086751",
                previousNode: "105729958"
            }
            , {
                group: 1,
                id: "66161877",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "23056472",
                origin: "66161877",
                previousNode: "5095386"
            }
            , {
                group: 2,
                id: "19000930",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "112295231",
                origin: "19000930",
                previousNode: "75472746"
            }
            , {
                group: 2,
                id: "116305994",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "84131026",
                origin: "116305994",
                previousNode: "101049650"
            }
            , {
                group: 1,
                id: "65174888",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "95336961",
                origin: "65174888",
                previousNode: "94039104"
            }
            , {
                group: 3,
                id: "110711359",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "47748489",
                origin: "110711359",
                previousNode: "70987221"
            }
            , {
                group: 2,
                id: "5701091",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "41566919",
                origin: "5701091",
                previousNode: "73954246"
            }
            , {
                group: 3,
                id: "47556063",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "17302102",
                origin: "47556063",
                previousNode: "55732326"
            }
            , {
                group: 1,
                id: "66583036",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "73326972",
                origin: "66583036",
                previousNode: "44336329"
            }
            , {
                group: 2,
                id: "102190554",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "95749118",
                origin: "102190554",
                previousNode: "66913850"
            }
            , {
                group: 1,
                id: "75078374",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "54108124",
                origin: "75078374",
                previousNode: "115177322"
            }
            , {
                group: 3,
                id: "56709857",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "28337290",
                origin: "56709857",
                previousNode: "94197734"
            }
            , {
                group: 1,
                id: "27501875",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "20038168",
                origin: "27501875",
                previousNode: "6012285"
            }
            , {
                group: 3,
                id: "58799851",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "88216085",
                origin: "58799851",
                previousNode: "91523916"
            }
            , {
                group: 3,
                id: "101027060",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "25414286",
                origin: "101027060",
                previousNode: "98897710"
            }
            , {
                group: 2,
                id: "9584587",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "95128462",
                origin: "9584587",
                previousNode: "62564369"
            }
            , {
                group: 2,
                id: "104041648",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "90383087",
                origin: "104041648",
                previousNode: "102091648"
            }
            , {
                group: 3,
                id: "92477012",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "76448784",
                origin: "92477012",
                previousNode: "87620993"
            }
            , {
                group: 3,
                id: "93174681",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "63770485",
                origin: "93174681",
                previousNode: "84265279"
            }
            , {
                group: 3,
                id: "117436341",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "75575398",
                origin: "117436341",
                previousNode: "48147508"
            }
            , {
                group: 1,
                id: "72693154",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "48788833",
                origin: "72693154",
                previousNode: "102732021"
            }
            , {
                group: 3,
                id: "51881835",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "120861438",
                origin: "51881835",
                previousNode: "98249196"
            }
            , {
                group: 2,
                id: "108411053",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "89403598",
                origin: "108411053",
                previousNode: "50244954"
            }
            , {
                group: 3,
                id: "85269926",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "6202932",
                origin: "85269926",
                previousNode: "60976660"
            }
            , {
                group: 1,
                id: "32511828",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "23876448",
                origin: "32511828",
                previousNode: "111253012"
            }
            , {
                group: 1,
                id: "57793100",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "108908592",
                origin: "57793100",
                previousNode: "34239263"
            }
            , {
                group: 2,
                id: "104045767",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "29368447",
                origin: "104045767",
                previousNode: "66310531"
            }
            , {
                group: 3,
                id: "3320725",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "7030232",
                origin: "3320725",
                previousNode: "51783416"
            }
            , {
                group: 2,
                id: "32287042",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "565913",
                origin: "32287042",
                previousNode: "44066630"
            }
            , {
                group: 1,
                id: "93707640",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "59185626",
                origin: "93707640",
                previousNode: "76893968"
            }
            , {
                group: 1,
                id: "96115485",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "123096845",
                origin: "96115485",
                previousNode: "109905441"
            }
            , {
                group: 2,
                id: "2086618",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "14505392",
                origin: "2086618",
                previousNode: "7175727"
            }
            , {
                group: 1,
                id: "23199755",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "26119662",
                origin: "23199755",
                previousNode: "51295817"
            }
            , {
                group: 1,
                id: "67349543",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "106430442",
                origin: "67349543",
                previousNode: "21188641"
            }
            , {
                group: 1,
                id: "361701",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "114281919",
                origin: "361701",
                previousNode: "109910490"
            }
            , {
                group: 3,
                id: "97692383",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "61104938",
                origin: "97692383",
                previousNode: "97107551"
            }
            , {
                group: 3,
                id: "20843146",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "4656777",
                origin: "20843146",
                previousNode: "37014285"
            }
            , {
                group: 2,
                id: "70331187",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "40031143",
                origin: "70331187",
                previousNode: "36668545"
            }
            , {
                group: 3,
                id: "31457598",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "110515490",
                origin: "31457598",
                previousNode: "54125351"
            }
            , {
                group: 2,
                id: "65009990",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "54131040",
                origin: "65009990",
                previousNode: "46937787"
            }
            , {
                group: 2,
                id: "70802224",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "108466960",
                origin: "70802224",
                previousNode: "32493611"
            }
            , {
                group: 1,
                id: "117469143",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "122139604",
                origin: "117469143",
                previousNode: "2270200"
            }
            , {
                group: 2,
                id: "16582697",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "271238",
                origin: "16582697",
                previousNode: "51926941"
            }
            , {
                group: 1,
                id: "119240899",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "37369409",
                origin: "119240899",
                previousNode: "96139437"
            }
            , {
                group: 1,
                id: "56766733",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "100866689",
                origin: "56766733",
                previousNode: "54654800"
            }
            , {
                group: 3,
                id: "2885406",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "49514326",
                origin: "2885406",
                previousNode: "46753921"
            }
            , {
                group: 2,
                id: "52717444",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "21442139",
                origin: "52717444",
                previousNode: "104383801"
            }
            , {
                group: 2,
                id: "44565121",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "66843758",
                origin: "44565121",
                previousNode: "46430831"
            }
            , {
                group: 2,
                id: "120955360",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "76116625",
                origin: "120955360",
                previousNode: "41563958"
            }
            , {
                group: 3,
                id: "88854499",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "4936375",
                origin: "88854499",
                previousNode: "76971767"
            }
            , {
                group: 2,
                id: "23015531",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "119395380",
                origin: "23015531",
                previousNode: "13409439"
            }
            , {
                group: 3,
                id: "4269738",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "62962753",
                origin: "4269738",
                previousNode: "69485876"
            }
            , {
                group: 2,
                id: "35509889",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "72949560",
                origin: "35509889",
                previousNode: "94688290"
            }
            , {
                group: 2,
                id: "82008630",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "14049162",
                origin: "82008630",
                previousNode: "26182912"
            }
            , {
                group: 1,
                id: "39310332",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "118735912",
                origin: "39310332",
                previousNode: "56628928"
            }
            , {
                group: 1,
                id: "12032434",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "56438575",
                origin: "12032434",
                previousNode: "10578422"
            }
            , {
                group: 2,
                id: "18663706",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "76887053",
                origin: "18663706",
                previousNode: "36632320"
            }
            , {
                group: 3,
                id: "104894735",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "14243406",
                origin: "104894735",
                previousNode: "87424548"
            }
            , {
                group: 3,
                id: "66012259",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "99278248",
                origin: "66012259",
                previousNode: "121008866"
            }
            , {
                group: 3,
                id: "92166506",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "8723134",
                origin: "92166506",
                previousNode: "54707746"
            }
            , {
                group: 3,
                id: "120053633",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "57116955",
                origin: "120053633",
                previousNode: "116885143"
            }
            , {
                group: 3,
                id: "70258682",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "69192262",
                origin: "70258682",
                previousNode: "43758236"
            }
            , {
                group: 3,
                id: "51475727",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "23799838",
                origin: "51475727",
                previousNode: "11355154"
            }
            , {
                group: 3,
                id: "32609897",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "41404186",
                origin: "32609897",
                previousNode: "4148992"
            }
            , {
                group: 1,
                id: "116612184",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "16843921",
                origin: "116612184",
                previousNode: "112786550"
            }
            , {
                group: 1,
                id: "10711635",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "45905828",
                origin: "10711635",
                previousNode: "5701807"
            }
            , {
                group: 2,
                id: "37481917",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "68508719",
                origin: "37481917",
                previousNode: "78281587"
            }
            , {
                group: 3,
                id: "76646430",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "8147233",
                origin: "76646430",
                previousNode: "45895504"
            }
            , {
                group: 3,
                id: "114720724",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "82005739",
                origin: "114720724",
                previousNode: "91487092"
            }
            , {
                group: 1,
                id: "30027757",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "68127370",
                origin: "30027757",
                previousNode: "24107242"
            }
            , {
                group: 2,
                id: "91119391",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "45189454",
                origin: "91119391",
                previousNode: "81136136"
            }
            , {
                group: 3,
                id: "61875293",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "39425009",
                origin: "61875293",
                previousNode: "12040857"
            }
            , {
                group: 1,
                id: "11138755",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "27610864",
                origin: "11138755",
                previousNode: "102349928"
            }
            , {
                group: 2,
                id: "105400841",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "39515703",
                origin: "105400841",
                previousNode: "21863711"
            }
            , {
                group: 2,
                id: "69291630",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "14305655",
                origin: "69291630",
                previousNode: "80653818"
            }
            , {
                group: 2,
                id: "30061029",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "26785994",
                origin: "30061029",
                previousNode: "81239201"
            }
            , {
                group: 2,
                id: "19147424",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "75243301",
                origin: "19147424",
                previousNode: "70885341"
            }
            , {
                group: 3,
                id: "47355087",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "72858382",
                origin: "47355087",
                previousNode: "89357573"
            }
            , {
                group: 1,
                id: "112915112",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "47689828",
                origin: "112915112",
                previousNode: "66263535"
            }
            , {
                group: 3,
                id: "96394556",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "65080439",
                origin: "96394556",
                previousNode: "95235327"
            }
            , {
                group: 3,
                id: "49691071",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "86361754",
                origin: "49691071",
                previousNode: "76289095"
            }
            , {
                group: 3,
                id: "59518971",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "111288810",
                origin: "59518971",
                previousNode: "108367531"
            }
            , {
                group: 3,
                id: "56364793",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "111560685",
                origin: "56364793",
                previousNode: "103378245"
            }
            , {
                group: 3,
                id: "23815048",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "114490662",
                origin: "23815048",
                previousNode: "35168512"
            }
            , {
                group: 3,
                id: "59759190",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "64089455",
                origin: "59759190",
                previousNode: "115576829"
            }
            , {
                group: 1,
                id: "80592394",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "17119833",
                origin: "80592394",
                previousNode: "31053667"
            }
            , {
                group: 2,
                id: "45822686",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "36528002",
                origin: "45822686",
                previousNode: "75472963"
            }
            , {
                group: 1,
                id: "120910184",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "61335431",
                origin: "120910184",
                previousNode: "45745031"
            }
            , {
                group: 1,
                id: "82523433",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "31621059",
                origin: "82523433",
                previousNode: "46990372"
            }
            , {
                group: 1,
                id: "73467063",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "38872762",
                origin: "73467063",
                previousNode: "90220771"
            }
            , {
                group: 2,
                id: "8713881",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "87053537",
                origin: "8713881",
                previousNode: "18646481"
            }
            , {
                group: 3,
                id: "92873613",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "61555038",
                origin: "92873613",
                previousNode: "101517336"
            }
            , {
                group: 1,
                id: "119667768",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "8068678",
                origin: "119667768",
                previousNode: "122381192"
            }
            , {
                group: 3,
                id: "20145026",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "41268219",
                origin: "20145026",
                previousNode: "36595560"
            }
            , {
                group: 2,
                id: "36293863",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "59990453",
                origin: "36293863",
                previousNode: "69065241"
            }
            , {
                group: 3,
                id: "92046512",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "10921611",
                origin: "92046512",
                previousNode: "87311953"
            }
            , {
                group: 2,
                id: "78321137",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "95289688",
                origin: "78321137",
                previousNode: "61966056"
            }
            , {
                group: 3,
                id: "50077610",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "111920789",
                origin: "50077610",
                previousNode: "78669537"
            }
            , {
                group: 2,
                id: "48916925",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "21414979",
                origin: "48916925",
                previousNode: "83914059"
            }
            , {
                group: 3,
                id: "106475875",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "94105502",
                origin: "106475875",
                previousNode: "115949893"
            }
            , {
                group: 2,
                id: "112948444",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "74166959",
                origin: "112948444",
                previousNode: "21532577"
            }
            , {
                group: 2,
                id: "42259304",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "92818048",
                origin: "42259304",
                previousNode: "83884763"
            }
            , {
                group: 1,
                id: "105103539",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "105012327",
                origin: "105103539",
                previousNode: "38707018"
            }
            , {
                group: 3,
                id: "60135726",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "107463229",
                origin: "60135726",
                previousNode: "13546501"
            }
            , {
                group: 3,
                id: "72488958",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "9886366",
                origin: "72488958",
                previousNode: "47231456"
            }
            , {
                group: 1,
                id: "120953000",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "71670107",
                origin: "120953000",
                previousNode: "122494675"
            }
            , {
                group: 3,
                id: "78958269",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "300767",
                origin: "78958269",
                previousNode: "4837740"
            }
            , {
                group: 2,
                id: "13718432",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "63229513",
                origin: "13718432",
                previousNode: "68987306"
            }
            , {
                group: 2,
                id: "74920933",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "67522899",
                origin: "74920933",
                previousNode: "84959462"
            }
            , {
                group: 3,
                id: "13727008",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "73337515",
                origin: "13727008",
                previousNode: "89304086"
            }
            , {
                group: 1,
                id: "7567262",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "52174739",
                origin: "7567262",
                previousNode: "41947861"
            }
            , {
                group: 2,
                id: "58400328",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "15547611",
                origin: "58400328",
                previousNode: "88545013"
            }
            , {
                group: 1,
                id: "93099686",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "40866104",
                origin: "93099686",
                previousNode: "98696109"
            }
            , {
                group: 2,
                id: "43003406",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "23890767",
                origin: "43003406",
                previousNode: "77796658"
            }
            , {
                group: 1,
                id: "90910353",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "71485805",
                origin: "90910353",
                previousNode: "105724700"
            }
            , {
                group: 1,
                id: "74439739",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "25657274",
                origin: "74439739",
                previousNode: "83046928"
            }
            , {
                group: 1,
                id: "98797003",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "51680779",
                origin: "98797003",
                previousNode: "13299411"
            }
            , {
                group: 3,
                id: "82652054",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "48938324",
                origin: "82652054",
                previousNode: "48165591"
            }
            , {
                group: 3,
                id: "120454492",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "80254689",
                origin: "120454492",
                previousNode: "109909157"
            }
            , {
                group: 1,
                id: "120540710",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "1871451",
                origin: "120540710",
                previousNode: "93003377"
            }
            , {
                group: 1,
                id: "58434389",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "36049113",
                origin: "58434389",
                previousNode: "86995520"
            }
            , {
                group: 3,
                id: "101304717",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "44972196",
                origin: "101304717",
                previousNode: "95485193"
            }
            , {
                group: 2,
                id: "78381442",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "31278534",
                origin: "78381442",
                previousNode: "107940310"
            }
            , {
                group: 3,
                id: "44974994",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "74155107",
                origin: "44974994",
                previousNode: "65355186"
            }
            , {
                group: 2,
                id: "105734563",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "20897312",
                origin: "105734563",
                previousNode: "103769994"
            }
            , {
                group: 3,
                id: "93862196",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "32693122",
                origin: "93862196",
                previousNode: "6085078"
            }
            , {
                group: 1,
                id: "72163690",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "23351794",
                origin: "72163690",
                previousNode: "78202686"
            }
            , {
                group: 3,
                id: "49960411",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "106645471",
                origin: "49960411",
                previousNode: "7660420"
            }
            , {
                group: 3,
                id: "24359999",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "42278982",
                origin: "24359999",
                previousNode: "45949391"
            }
            , {
                group: 1,
                id: "79902103",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "29460350",
                origin: "79902103",
                previousNode: "112921325"
            }
            , {
                group: 2,
                id: "113091209",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "69082558",
                origin: "113091209",
                previousNode: "41957577"
            }
            , {
                group: 3,
                id: "944465",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "63687602",
                origin: "944465",
                previousNode: "3230053"
            }
            , {
                group: 1,
                id: "29923432",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "12802825",
                origin: "29923432",
                previousNode: "70002426"
            }
            , {
                group: 3,
                id: "50934974",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "18874898",
                origin: "50934974",
                previousNode: "34529171"
            }
            , {
                group: 3,
                id: "15129949",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "99425240",
                origin: "15129949",
                previousNode: "36985655"
            }
            , {
                group: 2,
                id: "10762921",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "105898966",
                origin: "10762921",
                previousNode: "29461504"
            }
            , {
                group: 1,
                id: "26223039",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "26331033",
                origin: "26223039",
                previousNode: "59581180"
            }
            , {
                group: 2,
                id: "121425431",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "112554482",
                origin: "121425431",
                previousNode: "45121014"
            }
            , {
                group: 3,
                id: "68124026",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "96295564",
                origin: "68124026",
                previousNode: "69478816"
            }
            , {
                group: 3,
                id: "11948630",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "116439267",
                origin: "11948630",
                previousNode: "72505693"
            }
            , {
                group: 2,
                id: "82601293",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "10172516",
                origin: "82601293",
                previousNode: "65265830"
            }
            , {
                group: 1,
                id: "8421051",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "24037134",
                origin: "8421051",
                previousNode: "32721902"
            }
            , {
                group: 3,
                id: "17296740",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "89073798",
                origin: "17296740",
                previousNode: "90214582"
            }
            , {
                group: 3,
                id: "28866679",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "8582113",
                origin: "28866679",
                previousNode: "86049773"
            }
            , {
                group: 1,
                id: "7230532",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "114850261",
                origin: "7230532",
                previousNode: "89593969"
            }
            , {
                group: 3,
                id: "53203523",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "87327454",
                origin: "53203523",
                previousNode: "114969197"
            }
            , {
                group: 1,
                id: "97488343",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "74230016",
                origin: "97488343",
                previousNode: "66690259"
            }
            , {
                group: 2,
                id: "37530709",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "87645632",
                origin: "37530709",
                previousNode: "72888483"
            }
            , {
                group: 3,
                id: "67936524",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "58632007",
                origin: "67936524",
                previousNode: "117229119"
            }
            , {
                group: 2,
                id: "104994269",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "107714062",
                origin: "104994269",
                previousNode: "104550771"
            }
            , {
                group: 1,
                id: "67664955",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "121275551",
                origin: "67664955",
                previousNode: "15650467"
            }
            , {
                group: 2,
                id: "15317570",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "110285474",
                origin: "15317570",
                previousNode: "56731680"
            }
            , {
                group: 2,
                id: "3770437",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "85612171",
                origin: "3770437",
                previousNode: "102398885"
            }
            , {
                group: 3,
                id: "84527527",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "117038939",
                origin: "84527527",
                previousNode: "39839932"
            }
            , {
                group: 1,
                id: "59191307",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "108771485",
                origin: "59191307",
                previousNode: "15593903"
            }
            , {
                group: 2,
                id: "81640751",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "82849537",
                origin: "81640751",
                previousNode: "19133287"
            }
            , {
                group: 1,
                id: "97794233",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "76796299",
                origin: "97794233",
                previousNode: "113768269"
            }
            , {
                group: 2,
                id: "106688292",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "14909924",
                origin: "106688292",
                previousNode: "12530144"
            }
            , {
                group: 2,
                id: "122971954",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "113366094",
                origin: "122971954",
                previousNode: "89947409"
            }
            , {
                group: 2,
                id: "42383863",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "61128276",
                origin: "42383863",
                previousNode: "37266814"
            }
            , {
                group: 3,
                id: "100756010",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "8312808",
                origin: "100756010",
                previousNode: "67533130"
            }
            , {
                group: 3,
                id: "48951577",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "105040858",
                origin: "48951577",
                previousNode: "45817114"
            }
            , {
                group: 2,
                id: "11500240",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "48525373",
                origin: "11500240",
                previousNode: "83204265"
            }
            , {
                group: 1,
                id: "86332676",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "26858934",
                origin: "86332676",
                previousNode: "107350119"
            }
            , {
                group: 2,
                id: "62591834",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "25619887",
                origin: "62591834",
                previousNode: "118135626"
            }
            , {
                group: 3,
                id: "10946353",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "18352638",
                origin: "10946353",
                previousNode: "20365636"
            }
            , {
                group: 2,
                id: "58184351",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "68954560",
                origin: "58184351",
                previousNode: "99449895"
            }
            , {
                group: 2,
                id: "9163446",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "73664560",
                origin: "9163446",
                previousNode: "52125510"
            }
            , {
                group: 1,
                id: "60781381",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "83093604",
                origin: "60781381",
                previousNode: "26820343"
            }
            , {
                group: 1,
                id: "57818160",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "2682662",
                origin: "57818160",
                previousNode: "87906943"
            }
            , {
                group: 2,
                id: "48726009",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "58019143",
                origin: "48726009",
                previousNode: "49744173"
            }
            , {
                group: 3,
                id: "109876697",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "47708772",
                origin: "109876697",
                previousNode: "62044140"
            }
            , {
                group: 1,
                id: "21035406",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "71567043",
                origin: "21035406",
                previousNode: "26824697"
            }
            , {
                group: 1,
                id: "36361934",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "13810862",
                origin: "36361934",
                previousNode: "113731255"
            }
            , {
                group: 3,
                id: "107247634",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "70293438",
                origin: "107247634",
                previousNode: "57990299"
            }
            , {
                group: 1,
                id: "13709610",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "64582011",
                origin: "13709610",
                previousNode: "3836749"
            }
            , {
                group: 3,
                id: "93587809",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "120639360",
                origin: "93587809",
                previousNode: "8358243"
            }
            , {
                group: 3,
                id: "58424938",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "2572784",
                origin: "58424938",
                previousNode: "105606740"
            }
            , {
                group: 2,
                id: "91166323",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "53197339",
                origin: "91166323",
                previousNode: "5470052"
            }
            , {
                group: 3,
                id: "94164374",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "76979783",
                origin: "94164374",
                previousNode: "117546925"
            }
            , {
                group: 1,
                id: "73548431",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "70604125",
                origin: "73548431",
                previousNode: "5881000"
            }
            , {
                group: 2,
                id: "108753784",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "37578167",
                origin: "108753784",
                previousNode: "45838665"
            }
            , {
                group: 2,
                id: "18227359",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "55707765",
                origin: "18227359",
                previousNode: "34547319"
            }
            , {
                group: 3,
                id: "53343996",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "51242391",
                origin: "53343996",
                previousNode: "18514194"
            }
            , {
                group: 1,
                id: "40482774",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "101684327",
                origin: "40482774",
                previousNode: "10707551"
            }
            , {
                group: 2,
                id: "38203821",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "65639816",
                origin: "38203821",
                previousNode: "84714202"
            }
            , {
                group: 3,
                id: "60038282",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "74278252",
                origin: "60038282",
                previousNode: "122667987"
            }
            , {
                group: 2,
                id: "80241092",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "20441155",
                origin: "80241092",
                previousNode: "80337345"
            }
            , {
                group: 2,
                id: "58123336",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "9468914",
                origin: "58123336",
                previousNode: "47355607"
            }
            , {
                group: 3,
                id: "97947821",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "73706918",
                origin: "97947821",
                previousNode: "87332112"
            }
            , {
                group: 1,
                id: "62121887",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "22967886",
                origin: "62121887",
                previousNode: "15491737"
            }
            , {
                group: 1,
                id: "121277945",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "122500152",
                origin: "121277945",
                previousNode: "42439740"
            }
            , {
                group: 1,
                id: "92464867",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "100390338",
                origin: "92464867",
                previousNode: "101401764"
            }
            , {
                group: 3,
                id: "91245734",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "10024705",
                origin: "91245734",
                previousNode: "67884024"
            }
            , {
                group: 1,
                id: "54069990",
                name: "Apple Iphone",
                description: "iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software.",
                image: "https://cdn1.spiegel.de/images/image-1454728-860_poster_16x9-kznf-1454728.jpg",
                url: "https://www.apple.com",
                owner: "10988340",
                origin: "54069990",
                previousNode: "39570090"
            }
            , {
                group: 1,
                id: "113068654",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "16054880",
                origin: "113068654",
                previousNode: "16804908"
            }
            , {
                group: 2,
                id: "7856378",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "121806459",
                origin: "7856378",
                previousNode: "634599"
            }
            , {
                group: 2,
                id: "34427259",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "64519580",
                origin: "34427259",
                previousNode: "11089995"
            }
            , {
                group: 3,
                id: "82212452",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "98912808",
                origin: "82212452",
                previousNode: "95676700"
            }
            , {
                group: 3,
                id: "74189788",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "53074658",
                origin: "74189788",
                previousNode: "11605773"
            }
            , {
                group: 1,
                id: "15048775",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "3015034",
                origin: "15048775",
                previousNode: "23245890"
            }
            , {
                group: 2,
                id: "11669886",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "67049506",
                origin: "11669886",
                previousNode: "29820513"
            }
            , {
                group: 1,
                id: "16844078",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "54608161",
                origin: "16844078",
                previousNode: "23736099"
            }
            , {
                group: 3,
                id: "5884633",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "29754542",
                origin: "5884633",
                previousNode: "83578424"
            }
            , {
                group: 2,
                id: "70943600",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "84974107",
                origin: "70943600",
                previousNode: "21210664"
            }
            , {
                group: 3,
                id: "88799844",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "60218464",
                origin: "88799844",
                previousNode: "102951199"
            }
            , {
                group: 1,
                id: "57249379",
                name: "Ideas Born in the BSV Hackathon with Carl Jackett",
                description: "Fresh from CoinGeek Toronto Conference 2019, nChain software development manager Carl Jackett gives a recap of some of the entries from the BSV hackathon, providing inspiration for developers.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=ZmuqWyxjhfI",
                owner: "12911306",
                origin: "57249379",
                previousNode: "62861085"
            }
            , {
                group: 1,
                id: "112746623",
                name: "SV Meetups",
                description: "Collect content of all Bitcoin related meetups here",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://bitcoinsv.io/",
                owner: "21482926",
                origin: "112746623",
                previousNode: "68715752"
            }
            , {
                group: 1,
                id: "55428531",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "45659059",
                origin: "55428531",
                previousNode: "42196520"
            }
            , {
                group: 3,
                id: "62802297",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "81322520",
                origin: "62802297",
                previousNode: "31809817"
            }
            , {
                group: 1,
                id: "55824161",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "53539420",
                origin: "55824161",
                previousNode: "94676620"
            }
            , {
                group: 1,
                id: "45709864",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "29679590",
                origin: "45709864",
                previousNode: "18852858"
            }
            , {
                group: 2,
                id: "32729545",
                name: "Elon Musk",
                description: "All content related to Elon Musk, founder of SpaceX, Tesla and Solarworld",
                image: "https://cdn1.spiegel.de/images/image-1434866-860_poster_16x9-hntw-1434866.jpg",
                url: "https://en.wikipedia.org/wiki/Elon_Musk",
                owner: "8991482",
                origin: "32729545",
                previousNode: "46263544"
            }
            , {
                group: 3,
                id: "64795749",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "25614542",
                origin: "64795749",
                previousNode: "111532239"
            }
            , {
                group: 3,
                id: "86403614",
                name: "Falcon Heavy",
                description: "The Falcon Heavy is a partially reusable heavy-lift launch vehicle designed and manufactured by SpaceX.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/1920px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
                url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
                owner: "26577422",
                origin: "86403614",
                previousNode: "7151358"
            }
            , {
                group: 2,
                id: "87510706",
                name: "Smartphones",
                description: "Smartphones are a class of mobile phones and of multi-purpose mobile computing devices.",
                image: "https://images.firstpost.com/wp-content/uploads/2019/08/Xiaomi_Redmi_7_Review_720_19.jpg",
                url: "https://en.wikipedia.org/wiki/Smartphone",
                owner: "109850613",
                origin: "87510706",
                previousNode: "23320980"
            }
            , {
                group: 1,
                id: "40268433",
                name: "The Nakamoto Case",
                description: "A Hive to explore the evidence regarding the long debated Satoshi Nakamoto case.",
                image: "https://media.indiatimes.in/media/facebook/2019/Aug/satoshi_nakamoto_bitcoin_creator_identity_reveal_1566028416_800x420.jpg",
                url: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
                owner: "13646665",
                origin: "40268433",
                previousNode: "39196579"
            }
            , {
                group: 1,
                id: "16741611",
                name: "Hive",
                description: "Content is scattered across the web without connections. Inspired by nature, we envisioned a decentralized platform to combine efforts to interrelate the many lost dots again. With Hive, we find, share, and connect what actually matters to us.",
                image: "http://hive.kohze.com/images/header-image-dark.png",
                url: "http://hive.kohze.com/",
                owner: "83948969",
                origin: "16741611",
                previousNode: "81846666"
            }
            , {
                group: 2,
                id: "46743272",
                name: "Tether",
                description: "Tether is a controversial cryptocurrency with tokens issued by Tether Limited. It formerly claimed that each token was backed by one United States dollar, but on March 14, 2019 changed the backing to include loans to affiliate companies.",
                image: "https://news.coinsquare.com/wp-content/uploads/2017/11/tether.jpg",
                url: "https://tether.to/",
                owner: "15374082",
                origin: "46743272",
                previousNode: "85187754"
            }
            , {
                group: 3,
                id: "96739428",
                name: "London Meetup",
                description: "Add here all content related to the London BSV meetups",
                image: "https://secure.meetupstatic.com/photos/event/6/d/9/f/highres_482788063.jpeg",
                url: "https://www.meetup.com/de-DE/LondonBitcoin/events/259238987/",
                owner: "30968831",
                origin: "96739428",
                previousNode: "69254148"
            }
            , {
                group: 1,
                id: "120644173",
                name: "SpaceX",
                description: "A hive collecting interesting articles regarding Space Exploration Technologies Corp.",
                image: "https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/6/24/9fc02fb7600b4889aecbfe9ea854757f_18.jpg",
                url: "https://www.spacex.com/",
                owner: "47412897",
                origin: "120644173",
                previousNode: "61786885"
            }
            , {
                group: 1,
                id: "100194860",
                name: "BSV Alias",
                description: "Andy from nChain presents Paymail and the problems that it solve during the 'Rise and Build: Teachings from Toronto' event held in London recently.",
                image: "https://bitcoinexchangeguide.com/wp-content/uploads/2017/07/nchain.jpg",
                url: "https://www.youtube.com/watch?v=UhQ_OevMHK4",
                owner: "110351518",
                origin: "100194860",
                previousNode: "115459821"
            }
            , {
                group: 2,
                id: "1075908",
                name: "The Power of Simple with Wei Zhang",
                description: "nChain senior researcher Wei Zhang talks about Elliptic Curve Digital Service Algorithm (ECDSA) and R-Puzzle in this code-along session with the nChain's team.",
                image: "https://svpool.com/wp-content/uploads/2019/07/bitcoin-bch-to-increase-limits-on-op_codes.jpg",
                url: "https://www.youtube.com/watch?v=zQCPglNzf3U",
                owner: "64543417",
                origin: "1075908",
                previousNode: "115181565"
            }]

        , links: [
            {source: "82228538", target: "1980127", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "91494596", target: "50934974", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "69587702", target: "85193212", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "119270240", target: "74237727", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "10399903", target: "6890263", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "93441041", target: "72693154", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "80462298", target: "117469143", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "69754454", target: "103201636", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "32131369", target: "9584587", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "102709487", target: "33440315", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "23450977", target: "85193212", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "43885038", target: "109876697", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "39519950", target: "57793100", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "15547426", target: "16741611", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "69589373", target: "79902103", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "51294450", target: "46502913", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "105554236", target: "104041648", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "76850062", target: "102998094", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "16419212", target: "34427259", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "6890263", target: "6851922", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "79464247", target: "92166506", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "49234009", target: "12032434", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "16380237", target: "11669886", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "121974795", target: "9584587", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "19099457", target: "15129949", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "78395687", target: "93707640", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "6202942", target: "91494596", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "97922124", target: "107846065", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "106102417", target: "67936524", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "7507539", target: "3770437", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "37356739", target: "64086751", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "55092195", target: "9163446", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "67414387", target: "108551186", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "53844782", target: "101027060", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "88194561", target: "108411053", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "59351745", target: "80462298", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "33440315", target: "19099457", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "51919628", target: "26223039", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "110007129", target: "57722416", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "93700252", target: "91119391", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "76336654", target: "8713881", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "12852685", target: "121277945", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "114974178", target: "7230532", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "44170675", target: "19099457", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "4506828", target: "112948444", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "25338737", target: "9584587", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "23549782", target: "93700252", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "65673350", target: "80592394", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "73335589", target: "58434389", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "85193212", target: "117436341", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "102998094", target: "40482774", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "86334669", target: "7230532", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "8749724", target: "69957554", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "38459894", target: "78395687", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "26199250", target: "105960299", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "89634003", target: "12032434", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "64555012", target: "104894735", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "47033299", target: "27751425", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "69957554", target: "75330415", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "49011486", target: "76336654", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "3678586", target: "16380237", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "63174059", target: "8749724", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "7683436", target: "1075908", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "78920708", target: "119667768", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "105960299", target: "97488343", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "108551186", target: "44300268", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "6779711", target: "47556063", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "50204913", target: "18663706", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "11192281", target: "59518971", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "1980127", target: "51919628", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "82199210", target: "28866679", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "82100305", target: "30027757", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "92934680", target: "32729545", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "50765600", target: "113075619", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "90409920", target: "11235080", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "66394528", target: "26199250", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "87262538", target: "37356739", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "75384915", target: "106102417", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "37395451", target: "45709864", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "13551111", target: "74189788", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "103201636", target: "5862060", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "77607244", target: "75078374", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "47986394", target: "120053633", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "23037762", target: "8421051", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "2251321", target: "62754219", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "6620220", target: "11669886", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "57722416", target: "105554236", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "10194222", target: "79097363", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "92093461", target: "105299466", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "4240857", target: "112915112", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "115592846", target: "26223039", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "62832517", target: "18663706", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "75330415", target: "101027060", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "48916490", target: "120953000", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "115391071", target: "13727008", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "12132072", target: "120953000", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "28804906", target: "26223039", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "96580612", target: "27501875", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "111677142", target: "93587809", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "96212107", target: "12852685", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "28803477", target: "60781381", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "41117644", target: "102190554", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "440455", target: "57793100", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "5001764", target: "3320725", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "86124537", target: "62832517", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "27751425", target: "77607244", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "92134052", target: "13551111", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "79528057", target: "55092195", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "65450143", target: "7567262", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "73660776", target: "29923432", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "120298307", target: "78920708", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "102354818", target: "23532385", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "13468125", target: "93862196", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "11235080", target: "32131369", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "22680773", target: "8749724", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "96394071", target: "55092195", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "120553480", target: "50934974", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "117562744", target: "69587702", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "94628289", target: "58799851", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "98814307", target: "61604588", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "69821314", target: "85269926", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "21272579", target: "59518971", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "90896372", target: "25338737", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "18092992", target: "86124537", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "28091700", target: "111677142", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "116088886", target: "35509889", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "58552330", target: "70258682", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "24309979", target: "120955360", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "46502913", target: "102998094", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "18516404", target: "3320725", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "120230798", target: "18227359", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "100980529", target: "13551111", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "74337664", target: "8421051", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "117099802", target: "57818160", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "42871279", target: "106102417", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "62970956", target: "58424938", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "55844997", target: "34427259", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "95925582", target: "82100305", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "65048791", target: "105734563", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "105299466", target: "70490466", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "83916964", target: "55428531", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "23532385", target: "57818160", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "67223952", target: "63174059", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "89425818", target: "62754219", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "113075619", target: "100194860", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "62754219", target: "63174059", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "359607", target: "18516404", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "61604588", target: "10946353", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "115705383", target: "101304717", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "87651381", target: "102998094", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "79097363", target: "59759190", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "107846065", target: "70802224", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "113868347", target: "23815048", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "30016737", target: "105960299", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "44467556", target: "62754219", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "116581922", target: "63174059", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "16922556", target: "19147424", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "70490466", target: "113422925", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "76956090", target: "88799844", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "52140124", target: "112948444", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "74237727", target: "34427259", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "67629031", target: "68124026", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "121222949", target: "53844782", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "113422925", target: "42871279", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "15296586", target: "8421051", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "18748824", target: "67936524", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "11443929", target: "2885406", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "86991279", target: "37356739", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "44300268", target: "82199210", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "21032899", target: "82212452", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "111119139", target: "23532385", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "52878962", target: "88799844", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "102181608", target: "102709487", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "46096779", target: "58799851", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "6851922", target: "59351745", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "5862060", target: "62970956", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "113119926", target: "50077610", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "8858566", target: "26223039", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "64086751", target: "82652054", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "66161877", target: "93099686", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "19000930", target: "74337664", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "116305994", target: "16380237", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "65174888", target: "10194222", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "110711359", target: "58799851", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "5701091", target: "6620220", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "47556063", target: "120955360", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "66583036", target: "48951577", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "102190554", target: "26199250", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "75078374", target: "49960411", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "56709857", target: "79902103", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "27501875", target: "100980529", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "58799851", target: "115391071", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "101027060", target: "83916964", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "9584587", target: "100194860", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "104041648", target: "78381442", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "92477012", target: "70802224", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "93174681", target: "59191307", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "117436341", target: "13727008", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "72693154", target: "107846065", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "51881835", target: "42259304", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "108411053", target: "67629031", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "85269926", target: "102354818", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "32511828", target: "6202942", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "57793100", target: "37356739", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "104045767", target: "90409920", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "3320725", target: "101304717", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "32287042", target: "60781381", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "93707640", target: "49691071", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "96115485", target: "7683436", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "2086618", target: "944465", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "23199755", target: "1980127", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "67349543", target: "57793100", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "361701", target: "121277945", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "97692383", target: "10194222", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "20843146", target: "62970956", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "70331187", target: "108411053", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "31457598", target: "57249379", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "65009990", target: "92464867", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "70802224", target: "120553480", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "117469143", target: "60781381", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "16582697", target: "28866679", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "119240899", target: "80241092", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "56766733", target: "11443929", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "2885406", target: "65450143", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "52717444", target: "6202942", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "44565121", target: "2086618", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "120955360", target: "8713881", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "88854499", target: "79097363", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "23015531", target: "110007129", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "4269738", target: "62754219", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "35509889", target: "91494596", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "82008630", target: "72163690", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "39310332", target: "114720724", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "12032434", target: "11669886", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "18663706", target: "73660776", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "104894735", target: "120910184", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "66012259", target: "101027060", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "92166506", target: "70258682", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "120053633", target: "67349543", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "70258682", target: "6620220", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "51475727", target: "41117644", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "32609897", target: "75384915", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "116612184", target: "8713881", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "10711635", target: "24359999", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "37481917", target: "75330415", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "76646430", target: "7567262", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "114720724", target: "91245734", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "30027757", target: "112746623", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "91119391", target: "11443929", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "61875293", target: "106475875", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "11138755", target: "10946353", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "105400841", target: "28091700", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "69291630", target: "93099686", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "30061029", target: "89634003", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "19147424", target: "6890263", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "47355087", target: "69821314", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "112915112", target: "69957554", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "96394556", target: "52717444", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "49691071", target: "56364793", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "59518971", target: "97922124", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "56364793", target: "37481917", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "23815048", target: "944465", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "59759190", target: "45822686", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "80592394", target: "53203523", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "45822686", target: "11138755", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "120910184", target: "51294450", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "82523433", target: "116305994", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "73467063", target: "45709864", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "8713881", target: "58552330", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "92873613", target: "11235080", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "119667768", target: "69589373", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "20145026", target: "105554236", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "36293863", target: "79097363", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "92046512", target: "82652054", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "78321137", target: "101027060", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "50077610", target: "9163446", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "48916925", target: "21032899", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "106475875", target: "15317570", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "112948444", target: "56709857", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "42259304", target: "78321137", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "105103539", target: "3320725", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "60135726", target: "90409920", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "72488958", target: "8713881", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "120953000", target: "93700252", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "78958269", target: "73548431", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "13718432", target: "23199755", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "74920933", target: "82523433", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "13727008", target: "44300268", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "7567262", target: "89425818", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "58400328", target: "57793100", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "93099686", target: "3320725", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "43003406", target: "61604588", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "90910353", target: "67664955", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "74439739", target: "57818160", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "98797003", target: "86124537", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "82652054", target: "65009990", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "120454492", target: "110007129", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "120540710", target: "39310332", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "58434389", target: "40482774", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "101304717", target: "5884633", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "78381442", target: "19000930", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "44974994", target: "105400841", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "105734563", target: "62832517", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "93862196", target: "45709864", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "72163690", target: "42383863", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "49960411", target: "113422925", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "24359999", target: "12852685", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "79902103", target: "113091209", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "113091209", target: "3770437", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "944465", target: "38203821", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "29923432", target: "113422925", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "50934974", target: "10762921", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "15129949", target: "30027757", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "10762921", target: "60781381", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "26223039", target: "96580612", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "121425431", target: "55092195", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "68124026", target: "32609897", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "11948630", target: "39519950", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "82601293", target: "100980529", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "8421051", target: "3320725", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "17296740", target: "46096779", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "28866679", target: "50077610", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "7230532", target: "17296740", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "53203523", target: "78920708", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "97488343", target: "113068654", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "37530709", target: "2251321", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "67936524", target: "1980127", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "104994269", target: "42383863", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "67664955", target: "83916964", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "15317570", target: "119240899", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "3770437", target: "49691071", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "84527527", target: "92166506", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "59191307", target: "120644173", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "81640751", target: "11500240", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "97794233", target: "74439739", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "106688292", target: "90896372", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "122971954", target: "10946353", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "42383863", target: "112746623", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "100756010", target: "100756010", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "48951577", target: "73548431", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "11500240", target: "64555012", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "86332676", target: "27751425", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "62591834", target: "5884633", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "10946353", target: "120540710", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "58184351", target: "359607", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "9163446", target: "23532385", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "60781381", target: "44467556", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "57818160", target: "82212452", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "48726009", target: "60781381", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "109876697", target: "45709864", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "21035406", target: "120540710", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "36361934", target: "62591834", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "107247634", target: "122971954", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "13709610", target: "26223039", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "93587809", target: "96212107", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "58424938", target: "8421051", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "91166323", target: "78920708", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "94164374", target: "92134052", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "73548431", target: "16582697", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "108753784", target: "25338737", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "18227359", target: "15317570", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "53343996", target: "76850062", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "40482774", target: "82008630", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "38203821", target: "83916964", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "60038282", target: "105103539", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "80241092", target: "51881835", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "58123336", target: "98814307", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "97947821", target: "73660776", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "62121887", target: "67629031", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "121277945", target: "13718432", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "92464867", target: "117469143", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "91245734", target: "119270240", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "54069990", target: "61875293", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "113068654", target: "39519950", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "7856378", target: "116305994", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "34427259", target: "44170675", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "82212452", target: "106102417", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "74189788", target: "49234009", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "15048775", target: "23015531", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "11669886", target: "7683436", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "16844078", target: "112746623", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "5884633", target: "45822686", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "70943600", target: "33440315", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "88799844", target: "4269738", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "57249379", target: "61604588", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "112746623", target: "12032434", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "55428531", target: "121277945", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "62802297", target: "107846065", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "55824161", target: "359607", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "45709864", target: "7567262", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "32729545", target: "7567262", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "64795749", target: "11500240", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "86403614", target: "51294450", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "87510706", target: "68124026", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "40268433", target: "96115485", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "16741611", target: "96739428", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "46743272", target: "13718432", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "96739428", target: "114720724", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "120644173", target: "96115485", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "100194860", target: "90910353", curvature: 0.8, rotation: Math.PI * 1 / 6},
            {source: "1075908", target: "19000930", curvature: 0.8, rotation: Math.PI * 1 / 6}
        ]
    });

    function makeId() {
        let result = '';
        const characters = 'abcdef0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 160; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function _handleClick(node) {

        // Aim at node from outside it
        const distance = 250;
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

        const newId = makeId();
        const newOwner = makeId();

        setNewNodeGroup(node.group);
        setNewNodeId(newId);
        setNewNodeOwner(newOwner);
        setNewNodeHiveOrigin(newId);
        setNewNodePreviousNode(node.origin);
    }

    function _handleNodeHover(node) {
        document.body.style.cursor = node ? 'pointer' : null
    }

    const _handleSubmit = (evt) => {
        evt.preventDefault();
        setShowAlert(true);
    };

    const _handleAlertClose = () => {
        let addNode = {
            group: 1,
            id: newNodeId,
            name: newNodeName,
            description: newNodeDescription,
            image: newNodeImage,
            url: newNodeUrl,
            owner: newNodeOwner,
            origin: newNodeHiveOrigin,
            previousNode: newNodePreviousNode
        };
        setHiveData({
            nodes: [...hiveData.nodes, addNode],
            links: [...hiveData.links, {
                source: newNodeId,
                target: newNodePreviousNode,
                curvature: 0.8,
                rotation: Math.PI * 1 / 6
            }]
        });

        setNodeGroup(addNode.group);
        setNodeId(addNode.id);
        setNodeName(addNode.name);
        setNodeDescription(addNode.description);
        setNodeOwner(addNode.owner);
        setNodeUrl(addNode.url);
        setNodeImage(addNode.image);
        setNodeHiveOrigin(addNode.origin);
        setNodePreviousNode(addNode.previousNode);

        setShowAlert(false)
        setNewNodeImage("");
        setNewNodeUrl("");
        setNewNodeDescription("");
        setNewNodeName("");
        setValue(0);
    };

    const [value, setValue] = React.useState(0);

    function handleChange(evt, newValue) {
        evt.preventDefault();
        setValue(newValue);
    }

    return (
        <div >
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
                    onNodeHover={_handleNodeHover}
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
                            <Tab label="View Hive Node"/>
                            <Tab label="Add Hive Node"/>
                        </Tabs>
                        <TabPanel value={value} index={0}>

                            <Typography variant="h5" component="h2" gutterBottom>
                                {nodeName}
                            </Typography>
                            {nodeDescription}
                            <Typography variant="h5" component="h2" gutterBottom>
                                <Link href={nodeUrl} target={"_blank"} variant="body2" className={classes.link}>
                                    Go to page
                                </Link>
                            </Typography>
                            <Link href={nodeUrl} target={"_blank"} variant="body2" className={classes.link}>
                                <img className={classes.image} src={nodeImage}/>
                            </Link>

                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <h3>Details</h3>
                            <form onSubmit={_handleSubmit}>
                                <TextField
                                    label="Name"
                                    required={true}
                                    value={newNodeName}
                                    onChange={e => setNewNodeName(e.target.value)}
                                    fullWidth
                                />
                                <br/>
                                <TextField
                                    label="description"
                                    required={true}
                                    value={newNodeDescription}
                                    onChange={e => setNewNodeDescription(e.target.value)}
                                    fullWidth
                                />
                                <br/>
                                <TextField
                                    label="URL"
                                    required={true}
                                    value={newNodeUrl}
                                    onChange={e => setNewNodeUrl(e.target.value)}
                                    fullWidth
                                />
                                <br/>
                                <TextField
                                    label="Image"
                                    required={true}
                                    value={newNodeImage}
                                    onChange={e => setNewNodeImage(e.target.value)}
                                    fullWidth
                                />
                                <br/>
                                <TextField
                                    label="Previous Node"
                                    required={true}
                                    disabled={true}
                                    value={newNodePreviousNode}
                                    onChange={e => setNewNodePreviousNode(e.target.value)}
                                    fullWidth
                                />
                                <br/>
                                <br/>
                                <Button
                                    disabled={!(newNodePreviousNode && newNodeImage && newNodeUrl && newNodeDescription && newNodeName)}
                                    type="submit"
                                    variant="outlined"
                                    color="primary"
                                    onClick={_handleSubmit}
                                >Add Hive Node</Button>
                                <SweetAlert
                                    show={showAlert}
                                    title="Add Hive Node"
                                    text={"\"" + newNodeName + "\" added successfully!"}
                                    onConfirm={_handleAlertClose}
                                />
                                <br/>
                                <br/>
                            </form>
                        </TabPanel>
                    </Paper>
                </Drawer>

        </div>
    );
}
