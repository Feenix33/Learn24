// some various palettes 

// from color-hex.com
const palMITCHIE = [ '#d4e4ff', '#c8f2ff', '#d1fee', '#ffdcfc', '#e0c5ff'];
const palAW19 = [ '#8C1F28', '#591C21', '#044040', '#D92525', '#F2F2F2'];
const palDEEP_AUTUMN_1 = [ '#3e2723', '#5e6f64', '#800000', '#cc5500', '#aa7d17' ];
//CRAYONS = palMITCHIE.slice(0);
//CRAYONS = palDEEP_AUTUMN_1.slice(0);

// format from coolors.co
// {"Marian blue":"3d3b8e","Glaucous":"6883ba","Seasalt":"f9f9f9","Thulian pink":"e072a4","Celadon":"b0e298"}


// from Canva.com
// All have the name of the palette and four colors
// https://www.canva.com/colors/color-palettes/<NAME>/
const cmeCanva = {
    'Salmon Sushi': { 'Baby Blue': '#E7F2F8', 'Aquamarine': '#74BDCB', 'Salmon': '#FFA384', 'Freesia': '#EFE7BC' }
    ,'Warm Sunset':{ 'Orange': '#FD7F20', 'Red Orange': '#FC2E20', 'Amber': '#FDB750', 'Black': '#010100' }
    ,'Pastel Blonde': { 'Yellow': '#FFF4BD', 'Rose Quartz': '#F4B9B8', 'Spearmint': '#85D2D0', 'Purple': '#887BB0' }
    ,'Shopping Spree': { 'Gold': '#F9D030', 'Hot Pink': '#F62AA0', 'Neon Green': '#B8EE30', 'Aqua': '#26DFD0', }
    ,'Backdoor Casual' : { 'Salmon': '#E98973', 'Khaki': '#E7D4C0', 'Mint Blue': '#88B2CC', 'Blue Gray': '#658EA9' }
    ,'Towering Over' : { 'Blue': '#0000A3', 'Blue Grotto': '#0067B3', 'Aquamarine': '#40B0DF', 'Yellow': '#FFD53D' }
    ,'One Fine Day' : { 'Brown': '#533440', 'Mauve': '#A47786', 'Dusty Rose': '#E4D4C8', 'Blue Gray': '#9DB6CC' }
    ,'Sunset Waters' : { 'Brown' : '#533440' , 'Mauve' : '#A47786' , 'Dusty Rose' : '#E4D4C8' , 'Blue Gray' : '#9DB6CC' }
    ,'Rainbow Doughnuts' : { 'Coral': '#FF5765', 'Yellow': '#FFDB15', 'Violet': '#8A6FDF', 'Kelly Green': '#A8E10C' }
    ,'Piece of Cake' : { 'Scallop Seashell': '#F7E3D9', 'Pink': '#F9C7E4', 'Celadon': '#C6D8D5', 'Cream': '#FEEDCF' }
    ,'Pulp Slices' : { 'Navy Blue': '#0A4158', 'Teal Green': '#4B8378', 'Orange': '#FF9636', 'Scallop Seashell': '#E4D7D0', }
    ,'Tea and Romance' : { 'Ivory': '#F9F1F0', 'Marsala': '#663635', 'Rosewater': '#E1999F', 'Dusty Rose': '#DEB3AD', }
    ,'Apple Shine' : { 'Coral': '#FF8370', 'Blue Green': '#00B1B0', 'Freesia': '#FEC84D', 'Fuchsia': '#E42256'}
    ,'Middle Eastern Empire' : { 'Rose Red': '#922C40', 'Desert Sun': '#DC9750', 'Champagne': '#F3EAC0', 'Dark Blue': '#1E2640'}
    ,'Inner Glow' : {'Amber': '#FBB80F', 'Yellow': '#FBEE0F', 'Mauve': '#C598AF', 'Purple': '#7F4AA4'}
};

function cmeGetRandomCanva() {
    var ndex = floor(random(Object.values(cmeCanva).length));
    var strName = Object.keys(cmeCanva)[ndex];
    var rayCrayons = Object.values(Object.values(cmeCanva)[ndex]);
    return {
        name: strName, 
        crayons: rayCrayons};
}

//from Paul Tol at personal.sron.nl/~pault/
// these were created for maps and diagrams
/*******
const cmePaulTol = {
    'Salmon Sushi': { 'Baby Blue': '#E7F2F8', 'Aquamarine': '#74BDCB', 'Salmon': '#FFA384', 'Freesia': '#EFE7BC' }
    'Bright' : {'blue':4477aa cyan 66ccee green 228833 yellow ccbb44 red ee6677 purple aa3377 grey bbbb
        
        High-contrast white ffffff yellow ddaaee red bb5566 blue 004488 black 000000

        Vibrant blue 0077bb cyran 33bbee teal 009988 orange ee7733 red cc3311 magenta ee3377 grey bbbb
        Muted indigo #332288cyan 88ccee teal 44aa99 green 117733 olive 999933 sand ddcc77 rose cc6677 wine 882255 purple aa4499 pale grey dddddd
        Medium-contrast white ffffff light yellow eecc66 light red ee99aa light blue 6699cc dark yellow 997700 dark red 994455 darkblue 004488 black 000000
        Pale pale blue #BBCCEE', pale cyan '#CCEEFF', pale green '#CCDDAA', pale yellow '#EEEEBB', pale red '#FFCCCC', pale grey '#DDDDDD'
        Dark dark blue : '#222255', dark cyan '#225555', dark green '#225522', dark yellow '#666633', dark red '#663333', dark grey '#555555'.

        Light  light blue '#77AADD',  orange '#EE8866', light yellow '#EEDD88', pink '#FFAABB', light cyan '#99DDFF', mint '#44BB99', pear '#BBCC33', olive '#AAAA00', pale grey '#DDDDDD'.
        Sunset #364B9A', '#4A7BB7', '#6EA6CD', '#98CAE1', '#C2E4EF', '#EAECCC', '#FEDA8B', '#FDB366', '#F67E4B', '#DD3D2D', '#A50026'. Bad data: '#FFFFFF'.
        Nightfall '#125A56', '#00767B', '#238F9D', '#42A7C6', '#60BCE9', '#9DCCEF', '#C6DBED', '#DEE6E7', '#ECEADA', '#F0E6B2', '#F9D576', '#FFB954', '#FD9A44', '#F57634', '#E94C1F', '#D11807', '#A01813'. Bad data: '#FFFFFF'.
        BuRd '#2166AC', '#4393C3', '#92C5DE', '#D1E5F0', '#F7F7F7', '#FDDBC7', '#F4A582', '#D6604D', '#B2182B'. Bad data: '#FFEE9
        PRGn '#762A83', '#9970AB', '#C2A5CF', '#E7D4E8', '#F7F7F7', '#D9F0D3', '#ACD39E', '#5AAE61', '#1B7837'. Bad data: '#FFEE99'.
*******/
/*******
look at chroma.js 
interpolate w/the LCH hue chroma lightness model
see alanzuccoi.com

also leonardo tools to generate palettes
*******/
