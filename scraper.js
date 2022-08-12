const express = require( "express" );
const axios = require( "axios" );
const cheerio = require( "cheerio" );

const app = express();

app.use( express.static( "public" ) );

async function ufoScraper() {

    const url = "https://nuforc.org/webreports/ndxlID.html";
    const ufoInfo = [];

    await axios( url ).then( ( response ) => {
        const html_data = response.data;
        const $ = cheerio.load( html_data );


        const selectedElem = 'body > font:nth-child(3) > p > font > table > tbody > tr'
        // const selectedElem = '<tr valign="TOP"><td><a href="reports/168/S168521.html">5/31/22 21:59</a></td><td>Boise</td><td>ID</td><td>USA</td><td>Sphere</td><td>I watched for about 20 mi</td><td>I have 3 pictures I took</td><td>6/22/22</td><td>Yes</td></tr>'

        const keys = [
            "Date",
            "City",
            "State",
            "Country",
            "Shape",
            "Duration",
            "Summary",
            "Posted",
            "Images"
        ]

        $( selectedElem ).each( ( parentIndex, parentElem ) => {
            let keyIndex = 0;
            const ufoSightings = {};
            if ( parentIndex <= 1000 ) {
                $( parentElem ).children().each( ( childId, childElem ) => {
                    const value = $( childElem ).text();
                    if ( value ) {
                        ufoSightings[ keys[ keyIndex ] ] = value;

                        keyIndex++;
                    }
                } );
                ufoInfo.push( ufoSightings );
            }
        } );
    } )

    return ufoInfo;

}

app.get( "/api/ufo", async ( req, res ) => {

    // try{
    let ufo = await ufoScraper();

    // }catch(err){
    //     return res.status(500).json({
    //         err: err.toString(),
    //     });
    // }


    let reqQuery = req.query;

    for ( let i = 0; i < Object.keys( reqQuery ).length; i++ ) {
        let searchTerm = Object.keys( reqQuery )[ i ];
        let searchArg = reqQuery[ searchTerm ];
        ufo = getInfo( searchTerm, searchArg, ufo );

        console.log( ufo );
    }

    res.render( "printdata.ejs", {
        results: ufo
    } );
} );

const getInfo = ( keyArg, pairObj, searchDB ) => {

    const infoArray = [ {} ];

    for ( let i = 0; i < searchDB.length; i++ ) {
        if ( searchDB[ i ][ keyArg ] == pairObj ) {
            infoArray.push( searchDB[ i ] )
        }
    }
    return infoArray;
}


app.listen( process.env.PORT || 3000, () => {
    console.log( "running" )
} )

