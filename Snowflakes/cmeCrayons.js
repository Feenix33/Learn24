// some various palettes 

// from color-hex.com
const palMITCHIE = [ '#d4e4ff', '#c8f2ff', '#d1fee', '#ffdcfc', '#e0c5ff'];
const palAW19 = [ '#8C1F28', '#591C21', '#044040', '#D92525', '#F2F2F2'];
const palDEEP_AUTUMN_1 = [ '#3e2723', '#5e6f64', '#800000', '#cc5500', '#aa7d17' ];

// format from coolors.co
// {"Marian blue":"3d3b8e","Glaucous":"6883ba","Seasalt":"f9f9f9","Thulian pink":"e072a4","Celadon":"b0e298"}


// from Canva.com
// All have the name of the palette and four colors
// https://www.canva.com/colors/color-palettes/<NAME>/
const cmeCanva = {
    'Salmon Sushi': {
        'Baby Blue': '#E7F2F8',
        'Aquamarine': '#74BDCB',
        'Salmon': '#FFA384',
        'Freesia': '#EFE7BC' },
    'Warm Sunset':{
        'Orange': '#FD7F20',
        'Red Orange': '#FC2E20',
        'Amber': '#FDB750',
        'Black': '#010100' },
    'Pastel Blonde': {
        'Yellow': '#FFF4BD',
        'Rose Quartz': '#F4B9B8',
        'Spearmint': '#85D2D0',
        'Purple': '#887BB0'
        },
    'Shopping Spree': {
        'Gold': '#F9D030',
        'Hot Pink': '#F62AA0',
        'Neon Green': '#B8EE30',
        'Aqua': '#26DFD0',
    },
    'Backdoor Casual' : {
        'Salmon': '#E98973',
        'Khaki': '#E7D4C0',
        'Mint Blue': '#88B2CC',
        'Blue Gray': '#658EA9'
    },
    'Towering Over' : {
        'Blue': '#0000A3',
        'Blue Grotto': '#0067B3',
        'Aquamarine': '#40B0DF',
        'Yellow': '#FFD53D'
    },
    'One Fine Day' : {
        'Brown': '#533440',
        'Mauve': '#A47786',
        'Dusty Rose': '#E4D4C8',
        'Blue Gray': '#9DB6CC'
    },
    'Sunset Waters' : {
        'Brown' : '#533440' ,
        'Mauve' : '#A47786' ,
        'Dusty Rose' : '#E4D4C8' ,
        'Blue Gray' : '#9DB6CC'
    },
    'Rainbow Doughnuts' : {
        'Coral': '#FF5765',
        'Yellow': '#FFDB15',
        'Violet': '#8A6FDF',
        'Kelly Green': '#A8E10C'
    },
    'Piece of Cake' : {
        'Scallop Seashell': '#F7E3D9',
        'Pink': '#F9C7E4',
        'Celadon': '#C6D8D5',
        'Cream': '#FEEDCF'
    }
};

function cmeGetRandomCanva() {
    var ndex = floor(random(Object.values(cmeCanva).length));
    var strName = Object.keys(cmeCanva)[ndex];
    var rayCrayons = Object.values(Object.values(cmeCanva)[ndex]);
    return {
        name: strName, 
        crayons: rayCrayons};
}
